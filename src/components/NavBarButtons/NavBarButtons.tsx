import React, { useState } from 'react';
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EtexButton from '../Button/EtexButton';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/UserStore';

interface NavbarButtonsProps {
  onLegalClick: () => void;
  onDownloadExcel: (startDate: string, endDate: string) => void;
}

const NavbarButtons: React.FC<NavbarButtonsProps> = ({
  onLegalClick,
  onDownloadExcel,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useUserStore();
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const adminUsers = [
    'paola.salcedo@etexgroup.com',
    'tomas.meyer@etexgroup.com',
    'carolina.sepulveda@etexgroup.com',
    'jose.fuenzalida@etexgroup.com',
    'admin',
  ];
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const handleUserClick = () => {
    navigate('/profile');
    setDrawerOpen(false);
  };

  const handleUsersClick = () => {
    navigate('/users');
    setDrawerOpen(false);
  };

  const handleServiceInfoClick = () => {
    navigate('/serviceInfo');
    setDrawerOpen(false);
  };

  const handleEditBaseProductClick = () => {
    navigate('/base-products');
    setDrawerOpen(false);
  };

  const handleDownloadWithDates = () => {
    onDownloadExcel(startDate, endDate);
    setDateDialogOpen(false); // Cierra el diálogo tras la descarga
  };

  const list = () => (
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={handleUserClick}>
          <ListItemText primary="Cambiar Contraseña" />
        </ListItemButton>
      </ListItem>
      {adminUsers.some((x) => x === currentUser.username) && (
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
      {adminUsers.some((x) => x === currentUser.username) && (
        <ListItem disablePadding>
          <ListItemButton onClick={handleEditBaseProductClick}>
            <ListItemText primary="Productos Base" />
          </ListItemButton>
        </ListItem>
      )}

      <ListItem disablePadding>
        <ListItemButton onClick={() => setDateDialogOpen(true)}>
          <ListItemText
            primary="Descargar Documento"
            sx={{ color: '#f57c00' }}
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
    <>
      <div style={{ display: 'flex' }}>
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
          sx={{ mr: 2, ml: 2, color: 'black' }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </div>
      <Dialog open={dateDialogOpen} onClose={() => setDateDialogOpen(false)}>
        <DialogTitle>Seleccione el rango de fechas</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Fecha de inicio"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Fecha de fin"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDateDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleDownloadWithDates}>Descargar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NavbarButtons;
