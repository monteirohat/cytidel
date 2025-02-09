// src/utils/Global.js
import React from "react";
import { Chip, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export function getPriorityColor(idPriority) {
  switch (idPriority) {
    case 1:
      return "secondary"; // Low
    case 2:
      return "warning"; // Medium
    case 3:
      return "error"; // High
    default:
      return "default";
  }
}


export function getStatusIcon(idStatus, nameStatus) {
  switch (idStatus) {
    case 1:
      return (
        <Tooltip title={nameStatus}>
          <Chip label={nameStatus} color="primary" size="small" sx={{width:100}}/>
        </Tooltip>
      );
    case 2:
      return (
        <Tooltip title={nameStatus}>
          <Chip label={nameStatus} color="info" size="small" sx={{width:100}}/>
        </Tooltip>
      );
    case 3:
      return (
        <Tooltip title={nameStatus}>
          <CheckCircleIcon style={{ color: "green" }} />
        </Tooltip>
      );
    case 4:
      return (
        <Tooltip title={nameStatus}>
          <Chip label={nameStatus} color="secondary" size="small" sx={{width:100}}/>
        </Tooltip>
      );
    default:
      return (
        <Tooltip title={nameStatus}>
          <Chip label="Unknown" size="small" sx={{width:80}}/>
        </Tooltip>
      );
  }
}

export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("en-IE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

