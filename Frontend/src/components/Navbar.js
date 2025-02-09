// src/layout/NavBar.js

//Componentes
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

import { useNavigate } from "react-router-dom";

//Icons
import PeopleIcon from "@mui/icons-material/People";
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import DescriptionIcon from '@mui/icons-material/Description';
import ExitIcon from "@mui/icons-material/Logout";
import UserIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Key";

//Images
import userImage from "../assets/user.png";
import logoImage from "../assets/logo.avif";

//Services
import { logout, getUserData } from "../services/AuthService";

//Contexts
import { useNotification } from "../contexts/NotificationContext";

const pages = ["Clientes", "Task", "Plugins"];


function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const notification = useNotification();

  const userData = getUserData();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //Logout
  const handleLogout = async () => {
    try {
      await logout();
     
    } catch (error) {
      notification.error(error.message);
    }
    finally{
      navigate("/");
    }
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "rgb(0, 13, 48)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <a href="/">
            <img
              src={logoImage}
              style={{ width: "150px", marginTop: "10px" }}
              alt="CYTIDEL"
            />
          </a>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              marginRight: 4,
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <Button
              key="TASKS"
              onClick={() => handleNavigate("/app/tasks")}
              sx={{ my: 2, color: "white", display: "flex", marginRight: 3 }}
              startIcon={<ChecklistRtlIcon />}
            >
              Tasks
            </Button>

            <Button
              key="USERS"
              onClick={() => handleNavigate("/app")}
              sx={{ my: 2, color: "white", display: "flex", marginRight: 3 }}
              startIcon={<PeopleIcon />}
            >
              Users
            </Button>

            <Button
              key="LOGS"
              onClick={() => handleNavigate("/app")}
              sx={{ my: 2, color: "white", display: "flex", marginRight: 3 }}
              startIcon={<DescriptionIcon />}
            >
              Logs
            </Button>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="">
              <Box
                onClick={handleOpenUserMenu}
                sx={{ display: "flex", alignItems: "center", p: 0 }}
              >
                <IconButton sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={userImage}
                    sx={{ width: 30, height: 30 }}
                  />
                </IconButton>
                <Typography
                  variant="body1"
                  sx={{ marginLeft: 1, color: "white" }}
                >
                  {userData.name}
                </Typography>
              </Box>
            </Tooltip>
            <Menu
              sx={{
                mt: "45px",
                "& .MuiMenuItem-root": {
                  width: "230px",
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             
              <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
                <Chip
                  sx={{ fontSize: "16px" }}
                  label={userData.email}
                />
              </MenuItem>

              <Divider />
              <MenuItem onClick={() => handleNavigate("/app/meusdados")}>
                <IconButton sx={{ p: 0, mr: 2 }}>
                  <UserIcon />
                </IconButton>
                Profile
              </MenuItem>
              <MenuItem>
                <IconButton sx={{ p: 0, mr: 2 }}>
                  <PasswordIcon />
                </IconButton>
                Change Password
              </MenuItem>

            
              <Divider />
              <MenuItem onClick={() => handleLogout()}>
                <IconButton sx={{ p: 0, mr: 2 }}>
                  <ExitIcon />
                </IconButton>
                Exit
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
