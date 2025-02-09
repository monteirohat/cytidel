// src/pages/TaskPage.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  Button,
  
} from "@mui/material";

//Icons
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

//Components
import PageNavbar from "../../components/PageNavbar";
import GridSkeleton from "../../components/GridSkeleton";
import { TaskModal } from "./TaskModal";

//Services
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  changeStatusTask,
} from "../../services/TaskService";
import {
  getPriorityColor,
  getStatusIcon,
  formatDate,
} from "../../utils/Global";

//Contexts
import { useNotification } from "../../contexts/NotificationContext";

function TaskPage() {
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const notification = useNotification();

  //Tasks
  const [tasks, setTasks] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalTitleIcon, setModalTitleIcon] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const [editingStatusId, setEditingStatusId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await getTasks();
        setTasks(response);
      } catch (error) {
        notification.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [notification]);

  const handleNewClick = () => {
    setModalTitle("Add Task");
    setModalTitleIcon(AddIcon);
    setEditMode(false);
    setCurrentTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditClick = async (id) => {
    const taskToEdit = await getTaskById(id);
    if (taskToEdit) {
      setCurrentTask(taskToEdit);
      setModalTitle(`Edit Task - ${taskToEdit.title}`);
      setModalTitleIcon(EditIcon);
      setEditMode(true);
      setIsTaskModalOpen(true);
    } 
  };

  const handleSaveClick = async (task) => {
    try {
      let message = "";
      if (editMode) {
        await updateTask(task);
        message = "edited";
      } else {
        await createTask(task);
        message = "added";
      }

      const updatedTasks = await getTasks();
      setTasks(updatedTasks);

      notification.success(`Task ${message} successfully!`);
    } catch (error) {
      notification.error(error.message);
    } finally {
      setIsTaskModalOpen(false);
    }
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteTask(id);
      notification.success(`Task deleted successfully!`);
    } catch (error) {
      notification.error(error.message);
    }
  };

  const handleStatusClick = async (id, idStatus) => {
    try {
      // Call the API to change the status using a PATCH request
      await changeStatusTask(id, idStatus);
      // Optionally, refresh your tasks list or update the current item
      // For example: setTasks(await getTasks());
      notification.success("Status updated successfully!");
    } catch (error) {
      notification.error(error.message);
    } finally {
      // Exit edit mode for the status cell
      setEditingStatusId(null);
    }
  };

  let pageButtons = [];

  //Action buttons
  pageButtons.push({
    label: "Add Task",
    icon: AddIcon,
    onClick: handleNewClick,
  });

  return (
    <div>
      <Box>
        <PageNavbar
          title="Tasks"
          icon={ChecklistRtlIcon}
          buttons={pageButtons}
        />
        <Box mt={2} mx={3}>
          {loading ? (
            <GridSkeleton />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ textAlign: "center", width: 150 }}>
                      Status
                    </TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell sx={{ textAlign: "center", width: 90 }}>
                      Priority
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center", width: 200 }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ textAlign: "center" }}>
                        {editingStatusId === item.id ? (
                         
                            <Select
                             open={selectOpen}
                             onOpen={() => setSelectOpen(true)}
                             onClose={() => {
                               setSelectOpen(false);
                               setEditingStatusId(null);
                             }}
                              size="small"
                              value={selectedStatus}
                              onChange={async (e) => {
                                const newStatus = e.target.value;
                                setSelectedStatus(newStatus);
                                await handleStatusClick(item.id, newStatus);
                                setSelectOpen(false);
                                setEditingStatusId(null);
                              }}
                        
                            >
                              <MenuItem value={1}>Pending</MenuItem>
                              <MenuItem value={2}>In Progress</MenuItem>
                              <MenuItem value={3}>Completed</MenuItem>
                              <MenuItem value={4}>Archived</MenuItem>
                            </Select>
                          
                        ) : (
                          <span
                            onClick={() => {
                              setEditingStatusId(item.id);
                              setSelectedStatus(item.idStatus);
                              setSelectOpen(true);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {getStatusIcon(item.idStatus, item.nameStatus)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{formatDate(item.dueDate)}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Chip
                          label={item.namePriority}
                          color={getPriorityColor(item.idPriority)}
                          sx={{ width: 80 }}
                        />
                      </TableCell>

                      <TableCell sx={{ textAlign: "center" }}>
                        <Tooltip title="Edit task">
                          <IconButton onClick={() => handleEditClick(item.id)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete task">
                          <IconButton
                            onClick={() => handleDeleteClick(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Button
                          variant="contained"
                          size="small"
                          color="success"
                          disabled={item.idStatus === 3}
                          onClick={() => handleStatusClick(item.id, 3)}
                        >
                          Done
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>

      <TaskModal
        key={editMode ? "edit" : "new"}
        title={modalTitle}
        titleIcon={modalTitleIcon}
        open={isTaskModalOpen}
        handleClose={handleCloseTaskModal}
        handleSave={handleSaveClick}
        editMode={editMode}
        task={currentTask}
      />
    </div>
  );
}

export default TaskPage;
