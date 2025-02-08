
//layouts/SingleLayout.js
import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from "react-router-dom";

function SingleLayout({ children }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box component="main" sx={{ mt: 0, mb: 0,flexGrow: 1 }}>
                <Outlet />
            </Box>
        </Box>
    );

}

export default SingleLayout;