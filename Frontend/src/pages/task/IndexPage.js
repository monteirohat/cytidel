// src/pages/TaskPage.js
import React, { useState, useEffect, useRef, useCallback } from "react";
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

// Icons
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

// Components
import PageNavbar from "../../components/PageNavbar";
import GridSkeleton from "../../components/GridSkeleton";
import { TaskModal } from "./TaskModal";

// Services
import {
  getTasksPage,
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

// Contexts
import { useNotification } from "../../contexts/NotificationContext";

function TaskPage() {
  const notification = useNotification();

  // States for loading and pagination
  const [tasks, setTasks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(true);

  const offsetRef = useRef(0);
  const hasMoreRef = useRef(true);
  const isFetchingRef = useRef(false);

  // States for the Task Modal
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalTitleIcon, setModalTitleIcon] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // States for inline status editing
  const [editingStatusId, setEditingStatusId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);

  // Ref for the scrollable container of the table
  const containerRef = useRef(null);

  const fetchMoreTasks = useCallback(async () => {
    if (!hasMoreRef.current || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsFetching(true);
    try {
      // Fetch the next page with a limit of 10 records
      const newTasks = await getTasksPage(offsetRef.current, 10);

      // If fewer than 10 records are returned, it means there are no more
      if (newTasks.length < 10) {
        hasMoreRef.current = false;
        setHasMore(false);
      }

      setTasks((prevTasks) => [...prevTasks, ...newTasks]);

      // Update the offset stored in the ref
      offsetRef.current += 10;
    } catch (error) {
      notification.error("Failed to load tasks");
    } finally {
      setLoading(false);
      setIsFetching(false);
      isFetchingRef.current = false;
    }
  }, [isFetching, notification]);


  useEffect(() => {
    fetchMoreTasks();
  }, []);


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
          container.scrollHeight - 20 &&
        hasMore &&
        !isFetching
      ) {
        fetchMoreTasks();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [fetchMoreTasks, hasMore, isFetching]);

  // Actions for the Task Modal
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
      if (editMode) {
        await updateTask(task);
        notification.success("Task edited successfully!");
      } else {
        await createTask(task);
        notification.success("Task added successfully!");
      }
      // Reset the list to reload the updated tasks
      setTasks([]);
      offsetRef.current = 0;
      hasMoreRef.current = true;
      setHasMore(true);
      fetchMoreTasks();
      handleCloseTaskModal();
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
      notification.success("Task deleted successfully!");
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      notification.error(error.message);
    }
  };

  const handleStatusClick = async (id, newStatus) => {
    try {
      await changeStatusTask(id, newStatus);
      notification.success("Status updated successfully!");
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, idStatus: newStatus } : task
        )
      );
    } catch (error) {
      notification.error(error.message);
    } finally {
      setEditingStatusId(null);
    }
  };

  const pageButtons = [
    {
      label: "Add Task",
      icon: AddIcon,
      onClick: handleNewClick,
    },
  ];

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
          ) : (
            <>
              <TableContainer
                component={Paper}
                ref={containerRef} // Attach the ref to monitor scrolling
                sx={{ maxHeight: "500px", overflow: "auto" }}
              >
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
                      <TableCell sx={{ textAlign: "center", width: 200 }} />
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
                            <IconButton
                              onClick={() => handleEditClick(item.id)}
                            >
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
                    {isFetching && (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          sx={{ textAlign: "center", padding: "20px" }}
                        >
                          <Typography>Loading more tasks...</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="body2" align="right" sx={{ mt: 2 }}>
                Total: {tasks.length}
              </Typography>
            </>
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
