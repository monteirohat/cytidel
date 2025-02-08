import React from "react";
import { Typography, Box, AppBar, Toolbar, Button } from "@mui/material";

function PageNavbar({ title, icon: IconComponent, buttons = [] }) {
  return (
    <Box>
      <AppBar
        position="relative"
        sx={{ boxShadow: "none", backgroundColor: "rgb(236 242 255)" }}
      >
        <Toolbar>
          <Box display="flex" alignItems="center" gap={1} sx={{ flexGrow: 1 }}>
            {IconComponent && <IconComponent sx={{ color: "rgb(42, 53, 71)" }} />}
            <Typography variant="h6" component="div" sx={{ color: "rgb(42, 53, 71)" }}>
              {title}
            </Typography>
          </Box>

          <Box>
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant="contained"
                sx={{ ml: 1 }}
                onClick={button.onClick} 
                color="primary"
                startIcon={button.icon ? <button.icon /> : null} 
              >
                {button.label} 
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default PageNavbar;
