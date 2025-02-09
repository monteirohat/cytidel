import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
  createTheme,
  ThemeProvider,
  Container,
} from "@mui/material";

import { login, isAuthenticated } from "../services/AuthService";
import { useNotification } from "../contexts/NotificationContext";

// Imagens
import logoImage from "../assets/logo.avif";

const theme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          "&::before": {
            borderBottomColor: "white",
          },
          "&:hover::before": {
            borderBottomColor: "white !important",
          },
          "&::after": {
            borderBottomColor: "rgba(25, 118, 210, 1)",
          },
          "& .MuiInputBase-input": {
            color: "white",
            textAlign: "center",
            height: "2.5em",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "white",
            textAlign: "center",
          },
        },
      },
    },
  },
});

function LoginPage() {
  const navigate = useNavigate();
  const notification = useNotification();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/app");
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username.trim()) {
      usernameRef.current.focus();
      return;
    }
    if (!password.trim()) {
      passwordRef.current.focus();
      return;
    }

    setLoading(true);

    try {
      
      await login(username, password, keepLoggedIn);
      navigate("/app");
    } catch (error) {
      notification.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const year = new Date().getFullYear();

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleLogin}>
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: "rgb(0, 13, 48)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
          }}
        >
          <img
            src={logoImage}
            style={{ width: "250px", marginTop: "10px", marginBottom: "60px" }}
            alt="SPECTER"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 300,
              width: "100%",
              gap: 2,
            }}
          >
           
            <TextField
                  label="Email"
                  type="email"
                  variant="standard"
                  fullWidth
                  InputLabelProps={{
                    style: {
                      color: "white",
                      textAlign: "center",
                      fontSize: "1.2rem",
                    },
                    shrink: true,
                  }}
                  sx={{ mb: 3 }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
            <TextField
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              inputRef={passwordRef}
              InputLabelProps={{
                style: {
                  color: "white",
                  textAlign: "center",
                  fontSize: "1.2rem",
                },
                shrink: true,
              }}
              sx={{ mb: 3 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                />
              }
              label="Remember me"
              sx={{ color: "white", justifyContent: "left" }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2, display: "flex", alignItems: "center" }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Log In"
              )}
            </Button>

            <Box
              component="footer"
              sx={{ color: "gray", pt: 6, mt: "auto", zIndex: 10 }}
            >
              <Container maxWidth="sm">
                <Typography variant="body2" align="center">
                  © {year} CYTIDEL
                </Typography>
              </Container>
            </Box>
          </Box>
        </Box>
      </form>
    </ThemeProvider>
  );
}

export default LoginPage;
