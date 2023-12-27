import React, { useState } from "react";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EtexButton from "../Button/EtexButton";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";

interface NavbarButtonsProps {
  onLegalClick: () => void;
  onDownloadExcel: () => void;
}

const NavbarButtons: React.FC<NavbarButtonsProps> = ({
  onLegalClick,
  onDownloadExcel,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useUserStore();
  const handleLogout = () => {
    localStorage.clear(); // Limpia el localStorage
    navigate("/login"); // Redirige a la ruta de inicio de sesión
  };
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const handleUserClick = () => {
    navigate("/profile");
    setDrawerOpen(false);
  };

  const handleUsersClick = () => {
    navigate("/users");
    setDrawerOpen(false);
  };

  const handleServiceInfoClick = () => {
    navigate("/serviceInfo");
    setDrawerOpen(false);
  };

  const list = () => (
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={handleUserClick}>
          <ListItemText primary="Cambiar Contraseña" />
        </ListItemButton>
      </ListItem>
      {currentUser.username === "admin" && (
        <ListItem disablePadding>
          <ListItemButton onClick={handleUsersClick}>
            <ListItemText primary="Usuarios" />
          </ListItemButton>
        </ListItem>
      )}
      <ListItem disablePadding>
        <ListItemButton onClick={handleServiceInfoClick}>
          <ListItemText primary="Servicio" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={onDownloadExcel}>
          <ListItemText
            primary="Descargar Documento"
            sx={{ color: "#f57c00" }}
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={handleLogout}>
          <ListItemText primary="Cerrar Sesión" />
        </ListItemButton>
      </ListItem>
    </List>
  );

  return (
    <div style={{ display: "flex" }}>
      <EtexButton
        original={false}
        color="#f57c00"
        text="Información importante"
        onClick={onLegalClick}
      />
      <IconButton
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer(true)}
        sx={{ mr: 2, ml: 2, color: "black" }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default NavbarButtons;
