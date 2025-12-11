import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import logo from "../assets/CuraeClinic_logo2.svg";

import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { normalizeUrl } from "../utils/headerUtils";

const pages = ["Pacientes", "Médicos", "Consultas"];
const settings = ["Perfil", "Conta", "Dashboard"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  function handleOpenNavMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElNav(event.currentTarget);
  }

  function handleOpenUserMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget);
  }

  function handleExit() {
    console.log("Clicou em sair.");
  }

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Link
            component={RouterLink}
            to="/"
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          >
            <img
              src={logo}
              alt="CuraeClinic logo"
              style={{
                height: "40px",
                width: "auto",
              }}
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Tooltip title="Menu de navegação">
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
            </Tooltip>
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
              onClose={() => setAnchorElNav(null)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <Link
                  key={page}
                  component={RouterLink}
                  to={`/${normalizeUrl(page)}`}
                  underline="none"
                  color="inherit"
                  sx={{ textAlign: "center" }}
                >
                  <MenuItem onClick={() => setAnchorElNav(null)}>
                    {page}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          {/* Logo */}
          <Link
            component={RouterLink}
            to="/"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          >
            <img
              src={logo}
              alt="CuraeClinic logo"
              style={{
                height: "40px",
                width: "auto",
              }}
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
                key={page}
                component={RouterLink}
                to={`/${normalizeUrl(page)}`}
                underline="none"
                color="inherit"
              >
                <Button
                  onClick={() => setAnchorElNav(null)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Configurações da conta">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jp" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
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
              onClose={() => setAnchorElUser(null)}
            >
              {settings.map((setting) => (
                <Link
                  key={setting}
                  component={RouterLink}
                  to={`/${normalizeUrl(setting)}`}
                  underline="none"
                  color="inherit"
                  sx={{ textAlign: "center" }}
                >
                  <MenuItem onClick={() => setAnchorElUser(null)}>
                    {setting}
                  </MenuItem>
                </Link>
              ))}
              <Link
                underline="none"
                color="inherit"
                sx={{ textAlign: "center" }}
                onClick={handleExit}
              >
                <MenuItem onClick={() => setAnchorElUser(null)}>Sair</MenuItem>
              </Link>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
