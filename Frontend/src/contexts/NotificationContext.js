import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

const NotificationContext = createContext();

let notificationCounter = 0;

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, severity = "info", duration = 4000) => {
    const id = `${Date.now()}-${notificationCounter++}`;
    setNotifications((prev) => [...prev, { id, message, severity, duration }]);
  }, []);

  const success = (message, duration) => showNotification(message, "success", duration);
  const error = (message, duration) => showNotification(message, "error", duration);
  const warning = (message, duration) => showNotification(message, "warning", duration);
  const info = (message, duration) => showNotification(message, "info", duration);

  const handleClose = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ success, error, warning, info }}>
      {children}
      {notifications.map(({ id, message, severity, duration }, index) => (
        <Snackbar
          key={id}
          open
          autoHideDuration={duration}
          onClose={(event, reason) => {
            if (reason !== "clickaway") {
              handleClose(id);
            }
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          sx={{
            bottom: `${index * 70 + 10}px !important`, // Calcula a posição de cada notificação
            zIndex: 1400 + index, // Incrementa o zIndex para garantir a ordem
          }}
        >
          <Alert
            variant="filled"
            onClose={() => handleClose(id)}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
