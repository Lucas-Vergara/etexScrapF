import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface EditBaseProductProps {
  product: any;
  open: boolean;
  onClose: () => void;
  onSave: (product: any) => void; // Función para actualizar el producto
}

const EditBaseProductDialog: React.FC<EditBaseProductProps> = ({
  product,
  open,
  onClose,
  onSave,
}) => {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProduct({
      ...editedProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    onSave(editedProduct);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Producto</DialogTitle>
      <DialogContent>
        <TextField
          label="SKU"
          name="sku"
          value={editedProduct.sku}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Nombre"
          name="name"
          value={editedProduct.name}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Marca"
          name="brand"
          value={editedProduct.brand}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Distribuidor"
          name="distributor"
          value={editedProduct.distributor}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Categoría"
          name="category"
          value={editedProduct.category}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Región"
          name="region"
          value={editedProduct.region}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Formato"
          name="format"
          value={editedProduct.format}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBaseProductDialog;
