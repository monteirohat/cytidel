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
        </Route>

        
        <Route path="*" element={<NotFoundPage />} />
        <Route path="not-authorized" element={<NotAuthorize />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
