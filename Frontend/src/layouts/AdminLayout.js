
//layouts/AdminLayout.js
import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from "react-router-dom";

import NavBar from '../components/Navbar';
import Footer from '../components/Footer'

function AdminLayout({ children }) {
    console.log("AdminLayout rendering", { children });
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavBar />
            <Box component="main" sx={{ mt: 0, mb: 0,flexGrow: 1 }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );

}

export default AdminLayout;