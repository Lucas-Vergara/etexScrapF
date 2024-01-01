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
import GenericDialog from "../GenericDialog/GenericDialog";
import productValidations from "../../helpers/productValidations";
import { getErrorMessage } from "../../helpers/formErrors";

interface CreateBaseProductProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: BaseProduct) => any; // Función para crear un nuevo producto
  setLoading: (loading: boolean) => void;
}

const CreateBaseProductDialog: React.FC<CreateBaseProductProps> = ({
  open,
  onClose,
  onSave,
  setLoading,
}) => {
  const store = useProductStore();
  const [error, setError] = useState("");
  const [openGenericDialog, setOpenGenericDialog] = useState(false);
  const handleOpenLoading = () => {
    setLoading(true);
  };
  const handleCloseLoading = () => {
    setLoading(false);
  };
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

  const regionOptions = ["RM", "Los Lagos", "Valparaiso"];

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    let newRegion = newProduct.region;

    if (name === "distributor") {
      if (value === "Toso") {
        newRegion = "Valparaiso";
      } else if (value === "Weitzler") {
        newRegion = "Los Lagos";
      } else {
        newRegion = "RM";
      }
    }

    setNewProduct({
      ...newProduct,
      [name]: value,
      ...(name === "distributor" && { region: newRegion }),
    });
  };

  const handleSubmit = async () => {
    const emptyField = productValidations(newProduct);
    if (emptyField) {
      setError(`El campo '${emptyField}' no puede estar vacío`);
      return;
    }
    try {
      handleOpenLoading();
      const createdProduct = await onSave(newProduct);
      store.addBaseProduct(createdProduct);
      setOpenGenericDialog(true);
      onClose();
    } catch (error: any) {
      if (error instanceof Error) {
        setError(getErrorMessage(error));
      }
    } finally {
      handleCloseLoading();
    }
  };

  const handleCloseGenericDialog = () => {
    setOpenGenericDialog(false);
  };

  useEffect(() => {
    setError("");
  }, [open]);

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
          <FormControl fullWidth margin="normal">
            <InputLabel>Región</InputLabel>
            <Select
              name="region"
              value={newProduct.region}
              onChange={handleSelectChange}
              label="Región"
            >
              {regionOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
      <GenericDialog
        onClose={handleCloseGenericDialog}
        open={openGenericDialog}
        text={"¡Producto Creado Exitosamente!"}
        text2={null}
        width={null}
        closeOption={null}
      />
    </>
  );
};

export default CreateBaseProductDialog;
