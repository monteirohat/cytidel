// src/pages/NotAuthorize.js
import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import NoEncryptionIcon from "@mui/icons-material/NoEncryption";

const NotAuthorize = () => {
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
      <NoEncryptionIcon sx={{ fontSize: 80, marginBottom: 2 }} />
      <Typography variant="h2" component="h1" gutterBottom>
        Acesso negado
      </Typography>
      <Typography variant="body1" gutterBottom>
        Desculpe, mas você não tem permissão para acessar esta página.
      </Typography>
      <Button
        sx={{ marginTop: 2 }}
        variant="contained"
        color="primary"
        component={Link}
        to="/"
      >
        Voltar para a página inicial
      </Button>
    </Box>
  );
};

export default NotAuthorize;
