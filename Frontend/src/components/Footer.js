import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function Footer() {
    const year = new Date().getFullYear(); 
    const version = "1.0.0"; 

    return (
        <Box component="footer" sx={{ color: 'gray', py: 2, mt: 'auto', zIndex: 10 }}>
            <Container maxWidth="sm">
                <Typography variant="body2" align="center">
                    © {year} CYTIDEL
                </Typography>
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    Version: {version}
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;
