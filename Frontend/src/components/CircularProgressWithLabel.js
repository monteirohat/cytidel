// CircularProgressWithLabel.js
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const CircularProgressWithLabel = ({ value, progressColor, textColor, ...other }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={80}
        sx={{ color: progressColor }}
        {...other}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" sx={{color: textColor, fontSize: "20px"}}>
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
