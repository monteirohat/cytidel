// src/layout/NavBar.js

//Componentes
import React, { useMemo } from "react";
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

//Icones
import { getIconComponent } from "../utils/IconMapper";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import UserIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Key";

//Imagens
import userImage from "../assets/user.png";
import specterImage from "../assets/specter.svg";

//Services
import { logout } from "../services/AuthService";

//Contextos
import { useNotification } from "../contexts/NotificationContext";

const pages = ["Clientes", "Task", "Plugins"];
//const settings = ["Meus dados", "Account"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const notification = useNotification();

  const mainMenuItems = [];
  const userMenu = [];

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
    <AppBar position="static" sx={{ bgcolor: "#253141" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <a href="/">
            <img
              src={specterImage}
              style={{ width: "150px", marginTop: "10px" }}
              alt="SPECTER"
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
              key="DASHBOARD"
              onClick={() => handleNavigate("/app")}
              sx={{ my: 2, color: "white", display: "flex", marginRight: 3 }}
              startIcon={<DashboardIcon />}
            >
              Dashboard
            </Button>

            {/* {mainMenuItems.map((item, idx) => {
              // Você pode vincular o ícone dinamicamente se quiser,
              // mas aqui para simplificar:
              const IconComp = getIconComponent(item.icon);

              return (
                <Button
                  key={idx}
                  onClick={() =>
                    handleNavigate("/app/" + item.name.toLowerCase())
                  }
                  sx={{
                    my: 2,
                    color: "white",
                    display: "flex",
                    marginRight: 3,
                  }}
                  startIcon={<IconComp />}
                >
                  {item.label}
                </Button>
              );
            })} */}
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
                  "USER NAME"
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
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
                <Chip
                  sx={{ fontSize: "16px" }}
                  label={`email@email.com`}
                />
              </MenuItem>

              <Divider />
              <MenuItem onClick={() => handleNavigate("/app/meusdados")}>
                <IconButton sx={{ p: 0, mr: 2 }}>
                  <UserIcon />
                </IconButton>
                Meus dados
              </MenuItem>
              <MenuItem>
                <IconButton sx={{ p: 0, mr: 2 }}>
                  <PasswordIcon />
                </IconButton>
                Alterar senha
              </MenuItem>

              {userMenu?.menuItems?.length > 0 && <Divider />}
              {userMenu?.menuItems?.map((item) => {
                const IconComp = getIconComponent(item.icon);
                return (
                  <MenuItem
                    key={item.id}
                    onClick={() =>
                      handleNavigate("/app/" + item.name.toLowerCase())
                    }
                  >
                    <IconButton sx={{ p: 0, mr: 2 }}>{<IconComp />}</IconButton>
                    {item.label}
                  </MenuItem>
                );
              })}

              <Divider />
              <MenuItem onClick={() => handleLogout()}>
                <IconButton sx={{ p: 0, mr: 2 }}>
                  <ExitIcon />
                </IconButton>
                Sair
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
