// src/pages/NotFoundPage.js
import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#253141",
        color: "#FFFFFF",
        textAlign: "center",
        padding: 2,
      }}
    >
      <SearchOffIcon sx={{ fontSize: 100, marginBottom: 2 }} />
      <Typography variant="h2" component="h1" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button
        sx={{ marginTop: 2 }}
        variant="contained"
        color="primary"
        component={Link}
        to="/"
      >
        Back to Home Page
      </Button>
    </Box>
  );
};

export default NotFoundPage;
