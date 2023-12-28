import React, { useState } from "react";
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

interface CreateBaseProductProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: BaseProduct) => any; // Función para crear un nuevo producto
}

const CreateBaseProductDialog: React.FC<CreateBaseProductProps> = ({
  open,
  onClose,
  onSave,
}) => {
  // Estado para el nuevo producto
  const store = useProductStore();
  const [error, setError] = useState("");

  const [newProduct, setNewProduct] = useState<any>({
    sku: "",
    name: "",
    brand: "",
    distributor: "",
    category: "",
    region: "",
    format: "",
  });

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value as string,
    });
  };

  const handleSubmit = async () => {
    try {
      const createdProduct = await onSave(newProduct);
      store.addBaseProduct(createdProduct);
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
        <DialogTitle>Crear Nuevo Producto</DialogTitle>
        <DialogContent>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <TextField
            label="URL"
            name="sku"
            value={newProduct.sku}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Nombre"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Marca"
            name="brand"
            value={newProduct.brand}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Distribuidor</InputLabel>
            <Select
              name="distributor"
              value={newProduct.distributor}
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
            value={newProduct.category}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Región"
            name="region"
            value={newProduct.region}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Formato"
            name="format"
            value={newProduct.format}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Crear</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateBaseProductDialog;
