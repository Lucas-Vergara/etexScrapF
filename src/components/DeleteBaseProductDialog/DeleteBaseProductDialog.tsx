import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { BaseProduct } from "../../types/types";
import { useProductStore } from "../../store/ProductStore";
import GenericDialog from "../GenericDialog/GenericDialog";

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
  const [openGenericDialog, setOpenGenericDialog] = useState(false);
  const handleCloseGenericDialog = () => {
    setOpenGenericDialog(false);
  };

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleConfirm = () => {
    onConfirm(editedProduct._id);
    store.deleteBaseProduct(editedProduct._id);
    setOpenGenericDialog(true);

    onClose();
  };

  const fieldsToShow: Array<{ key: keyof BaseProduct; label: string }> = [
    { key: "sku", label: "URL" },
    { key: "name", label: "Nombre" },
    { key: "brand", label: "Marca" },
    { key: "distributor", label: "Distribuidor" },
    { key: "category", label: "Categoría" },
    { key: "region", label: "Región" },
    { key: "format", label: "Formato" },
  ];

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Eliminar Producto</DialogTitle>
        <DialogContent>
          <p>¿Estás seguro de que deseas eliminar este producto?</p>
          <List>
            {fieldsToShow.map(({ key, label }) => (
              <ListItem key={key}>
                <ListItemText primary={label} secondary={editedProduct[key]} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={handleConfirm} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <GenericDialog
        onClose={handleCloseGenericDialog}
        open={openGenericDialog}
        text={"¡Producto Eliminado Exitosamente!"}
        text2={null}
        width={null}
        closeOption={null}
      />
    </>
  );
};

export default DeleteBaseProductDialog;
