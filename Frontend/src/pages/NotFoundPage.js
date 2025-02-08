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
        Página Não Encontrada
      </Typography>
      <Typography variant="body1" gutterBottom>
        Desculpe, a página que você está procurando não existe.
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

export default NotFoundPage;
