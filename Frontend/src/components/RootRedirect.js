// src/components/RootRedirect.js
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/AuthService";

function RootRedirect() {
  if (isAuthenticated()) {
    return <Navigate to="/app" replace />;
  }
  return <Navigate to="/login" replace />;
}

export default RootRedirect;
