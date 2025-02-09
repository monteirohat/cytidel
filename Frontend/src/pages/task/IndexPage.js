// src/pages/TaskPage.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  Switch,
  CircularProgress,
  Tooltip,
} from "@mui/material";

//Icons
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import DeleteIcon from "@mui/icons-material/Delete";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

//Components
import PageNavbar from "../../components/PageNavbar";
import GridSkeleton from "../../components/GridSkeleton";
import { TaskModal } from "./TaskModal";

//Services
import { getTasks, createTask } from "../../services/TaskService";
import { getPriorityColor, getStatusIcon } from "../../utils/Global";

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
    setIsTaskModalOpen(true);
  };

  const handleSaveClick = async (newTask) => {
    try {
      await createTask(newTask);

      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
      notification.success("Task added successfully!");
    } catch (error) {
      notification.error(error.message);
    } finally {
      setIsTaskModalOpen(false);
    }
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  const handleDeleteClick = (id) => {};

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
                    <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>Priority</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ textAlign: "center" }}>
                      {getStatusIcon(item.idStatus, item.nameStatus)}
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Chip
                          label={item.namePriority}
                          color={getPriorityColor(item.idPriority)}
                          sx={{width:80}}
                        />
                      </TableCell>

                      <TableCell>{item.dueDate}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Tooltip title="Edit task">
                          <IconButton
                            onClick={() => handleDeleteClick(item.id)}
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
        title={modalTitle}
        titleIcon={modalTitleIcon}
        open={isTaskModalOpen}
        handleClose={handleCloseTaskModal}
        handleSave={handleSaveClick}
      />
    </div>
  );
}

export default TaskPage;
