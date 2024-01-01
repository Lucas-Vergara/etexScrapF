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

interface EditBaseProductProps {
  product: BaseProduct;
  open: boolean;
  onClose: () => void;
  onSave: (product: BaseProduct) => any;
  setLoading: (loading: boolean) => void;
}

const EditBaseProductDialog: React.FC<EditBaseProductProps> = ({
  product,
  open,
  onClose,
  onSave,
  setLoading,
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
  const [openGenericDialog, setOpenGenericDialog] = useState(false);
  const handleOpenLoading = () => {
    setLoading(true);
  };
  const handleCloseLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProduct({
      ...editedProduct,
      [event.target.name]: event.target.value,
    });
  };

  const regionOptions = ["RM", "Los Lagos", "Valparaiso"];

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    let newRegion = editedProduct.region;

    if (name === "distributor") {
      if (value === "Toso") {
        newRegion = "Valparaiso";
      } else if (value === "Weitzler") {
        newRegion = "Los Lagos";
      } else {
        newRegion = "RM";
      }
    }

    setEditedProduct({
      ...editedProduct,
      [name]: value,
      ...(name === "distributor" && { region: newRegion }),
    });
  };

  const handleSubmit = async () => {
    const emptyField = productValidations(editedProduct);
    if (emptyField) {
      setError(`El campo '${emptyField}' no puede estar vacío`);
      return;
    }
    try {
      handleOpenLoading();
      const savedProduct = await onSave(editedProduct);
      handleCloseLoading();
      store.editBaseProduct(savedProduct);
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Región</InputLabel>
            <Select
              name="region"
              value={editedProduct.region}
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
      <GenericDialog
        onClose={handleCloseGenericDialog}
        open={openGenericDialog}
        text={"¡Producto Actualizado Exitosamente!"}
        text2={null}
        width={null}
        closeOption={null}
      />
    </>
  );
};

export default EditBaseProductDialog;
