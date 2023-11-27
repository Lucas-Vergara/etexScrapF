import React, { useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { useUserStore } from "../../store/UserStore";
import NavBar from "../NavBar/NavBar";
import DeleteIcon from "@mui/icons-material/Delete";
import EtexButton from "../Button/EtexButton";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../api/api";

const UsersPanel = () => {
  const { users: initialUsers, removeUser } = useUserStore();
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState({
    id: "",
    email: "",
  });
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const handleCreateUserClick = () => {
    navigate("/register");
  };
  const handleDeleteUser = (userId: string) => {
    if (!users) return;
    const selectedUser = users.find((user) => user.id === userId);
    setDeleteDialogOpen(true);

    setSelectedUser(selectedUser || { id: "", email: "" });
  };

  const handleConfirmDelete = async () => {
    if (!users) return;
    const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
    const response = await deleteUser(selectedUser.id);
    if (response.ok) {
      removeUser(selectedUser.id);
      setUsers(updatedUsers);
      setDeleteDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <NavBar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Card sx={{ maxWidth: 600, width: "100%", position: "relative" }}>
          <CardContent>
            <Typography variant="h4" mb={3}>
              Usuarios
            </Typography>
            <List sx={{ width: "100%" }}>
              {users?.map((user) => (
                <ListItem
                  key={user.id}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <ListItemText primary={user.email} />
                  <IconButton
                    onClick={() => handleDeleteUser(user.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            <br />
            <EtexButton text="Crear Usuario" onClick={handleCreateUserClick} />
          </CardContent>
        </Card>
      </Container>

      {/* Diálogo de confirmación */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar al usuario {selectedUser.email}
            ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UsersPanel;
