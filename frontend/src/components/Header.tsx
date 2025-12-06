import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle as AccountCircleIcon,
  People as PeopleIcon,
  EventNote as EventNoteIcon,
  LocalHospital as LocalHospitalIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import logo from "../../public/logo curaeclinic.png";

const SearchBox = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(2),
  width: "100%",
  maxWidth: "300px",
  [theme.breakpoints.down("sm")]: {
    marginLeft: theme.spacing(1),
    maxWidth: "150px",
  },
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgba(255, 255, 255, 0.7)",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

interface HeaderProps {
  onMenuClick?: () => void;
  onSearch?: (query: string) => void;
  onPacientesClick?: () => void;
  onConsultasClick?: () => void;
  onMedicosClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  onSearch,
  onPacientesClick,
  onConsultasClick,
  onMedicosClick,
}) => {
  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountAnchorEl(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleAccountSettings = () => {
    handleAccountMenuClose();
    // Adicionar lógica para navegar para configurações
  };

  const handleLogout = () => {
    handleAccountMenuClose();
    // Adicionar lógica para logout
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#1976d2",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo e Menu Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip title="Abrir menu">
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={onMenuClick}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>

          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            <img
              src={logo}
              alt="CuraeClinic Logo"
              style={{
                height: "40px",
                width: "auto",
              }}
            />
          </Box>
        </Box>

        {/* Centro - Search Bar */}
        <SearchBox>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar pacientes, médicos..."
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </SearchBox>

        {/* Direita - Botões de Ação e Conta */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Botão Pacientes */}
          <Tooltip title="Pacientes">
            <IconButton
              color="inherit"
              onClick={onPacientesClick}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <PeopleIcon />
            </IconButton>
          </Tooltip>

          {/* Botão Consultas */}
          <Tooltip title="Consultas">
            <IconButton
              color="inherit"
              onClick={onConsultasClick}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <EventNoteIcon />
            </IconButton>
          </Tooltip>

          {/* Botão Médicos */}
          <Tooltip title="Médicos">
            <IconButton
              color="inherit"
              onClick={onMedicosClick}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <LocalHospitalIcon />
            </IconButton>
          </Tooltip>

          {/* Botão Conta */}
          <Tooltip title="Configurações da conta">
            <IconButton
              color="inherit"
              onClick={handleAccountMenuOpen}
              sx={{
                marginLeft: 1,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  cursor: "pointer",
                }}
              >
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>

      {/* Menu Conta */}
      <Menu
        anchorEl={accountAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(accountAnchorEl)}
        onClose={handleAccountMenuClose}
      >
        <MenuItem onClick={handleAccountSettings}>Configurações</MenuItem>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
