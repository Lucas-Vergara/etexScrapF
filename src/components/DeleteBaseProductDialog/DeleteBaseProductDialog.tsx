import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { BaseProduct } from "../../types/types";
import { useProductStore } from "../../store/ProductStore";

interface DeleteBaseProductProps {
  open: boolean;
  onClose: () => void;
  product: BaseProduct;
  onConfirm: (productId: string) => void;
}

const DeleteBaseProductDialog: React.FC<DeleteBaseProductProps> = ({
  open,
  onClose,
  product,
  onConfirm,
}) => {
  const [editedProduct, setEditedProduct] = useState<BaseProduct>(product);
  const store = useProductStore();

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleConfirm = () => {
    onConfirm(editedProduct._id);
    store.deleteBaseProduct(editedProduct._id);
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
