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
          <Chip label="Pending" color="default" size="small" />
        </Tooltip>
      );
    case 2:
      return (
        <Tooltip title={nameStatus}>
          <Chip label="In Progress" color="warning" size="small" />
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
          <Chip label="Archived" color="primary" size="small" />
        </Tooltip>
      );
    default:
      return (
        <Tooltip title={nameStatus}>
          <Chip label="Unknown" size="small" />
        </Tooltip>
      );
  }
}
