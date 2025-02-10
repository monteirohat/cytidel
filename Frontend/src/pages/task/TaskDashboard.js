// pages/task/TaskStatusDashboard.js
import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import CircularProgressWithLabel from "../../components/CircularProgressWithLabel";

const TaskStatusDashboard = ({ tasks }) => {
  const totalTasks = tasks.length;


  const getPercentage = (statusId) => {
    if (totalTasks === 0) return 0;
    const count = tasks.filter((task) => Number(task.idStatus) === statusId).length;
    return (count / totalTasks) * 100;
  };

  const statuses = [
    {
      id: 1,
      label: "Pending",
      cardColor: "#047ad6",     
      progressColor: "#ffffff", 
      textColor: "#ffffff",
    },
    {
      id: 2,
      label: "In progress",
      cardColor: "#019cef",     
      progressColor: "#ffffff", 
      textColor: "#ffffff",
    },
    {
      id: 3,
      label: "Completed",
      cardColor: "#008001",     
      progressColor: "#ffffff", 
      textColor: "#ffffff",
    },
    {
      id: 4,
      label: "Archived",
      cardColor: "#5a5a5a",     
      progressColor: "#ffffff", 
      textColor: "#ffffff",
    },
  ];

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
      {statuses.map((status) => (
        <Paper
          key={status.id}
          elevation={3}
          sx={{
            flex: "1 1 220px",
            p: 1,
            textAlign: "center",
            backgroundColor: status.cardColor,
            color:"#ffffff"
          }}
        >
          <Typography variant="h6" gutterBottom sx={{color: status.textColor, fontWeight:600}}> 
            {status.label}
          </Typography>
          <CircularProgressWithLabel value={getPercentage(status.id)}  progressColor={status.progressColor}/>
        </Paper>
      ))}
    </Box>
  );
};

export default TaskStatusDashboard;
