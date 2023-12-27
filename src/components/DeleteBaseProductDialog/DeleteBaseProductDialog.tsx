import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface DeleteBaseProductProps {
  open: boolean;
  onClose: () => void;
  productId: string;
  onConfirm: (productId: string) => void;
}

const DeleteBaseProductDialog: React.FC<DeleteBaseProductProps> = ({
  open,
  onClose,
  productId,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm(productId);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Eliminar Producto</DialogTitle>
      <DialogContent>
        <p>¿Estás seguro de que deseas eliminar este producto?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleConfirm} color="secondary">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBaseProductDialog;
