// src/routes/Routes.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import RootRedirect from "../components/RootRedirect";

//Layouts
import AdminLayout from "../layouts/AdminLayout";
import SingleLayout from "../layouts/SingleLayout";

//Pages
import NotFoundPage from "../pages/NotFoundPage";
import NotAuthorize from "../pages/NotAuthorize";

import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import TaskPage from "../pages/task/IndexPage";
import UserPage from "../pages/user/IndexPage";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />

        <Route path="/login" element={<SingleLayout />}>
          <Route index element={<LoginPage />} />
        </Route>

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="tasks" element={<TaskPage />} />
          <Route path="users" element={<UserPage />} />
        </Route>

        
        <Route path="*" element={<NotFoundPage />} />
        <Route path="not-authorized" element={<NotAuthorize />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
