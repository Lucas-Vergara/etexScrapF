import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { BaseProduct } from "../../types/types";
import { useProductStore } from "../../store/ProductStore";

interface EditBaseProductProps {
  product: BaseProduct;
  open: boolean;
  onClose: () => void;
  onSave: (product: BaseProduct) => any; // Función para actualizar el producto
}

const EditBaseProductDialog: React.FC<EditBaseProductProps> = ({
  product,
  open,
  onClose,
  onSave,
}) => {
  const [editedProduct, setEditedProduct] = useState<BaseProduct>(product);
  const distributorOptions = [
    "Construmart",
    "Construplaza",
    "Easy",
    "Ferrobal",
    "Imperial",
    "Prodalam",
    "Sodimac",
    "Toso",
    "Weitzler",
    "Yolito",
  ];
  const store = useProductStore();
  const [error, setError] = useState("");

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProduct({
      ...editedProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setEditedProduct({
      ...editedProduct,
      [event.target.name]: event.target.value as string,
    });
  };

  const handleSubmit = async () => {
    try {
      const savedProduct = await onSave(editedProduct);
      store.editBaseProduct(savedProduct);
      onClose();
    } catch (error: any) {
      if (
        error.message ===
        "Error durante el scraping: Protocol error (Page.navigate): Cannot navigate to invalid URL"
      ) {
        setError("Url no encontrada");
      } else if (
        error.message.startsWith(
          "Error durante el scraping: Waiting for selector"
        )
      ) {
        setError("Precio o Título del producto no encontrado");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <TextField
            label="URL"
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Distribuidor</InputLabel>
            <Select
              name="distributor"
              value={editedProduct.distributor}
              onChange={handleSelectChange}
              label="Distribuidor"
            >
              {distributorOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
    </>
  );
};

export default EditBaseProductDialog;
