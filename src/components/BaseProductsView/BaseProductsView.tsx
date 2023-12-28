import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import BaseProductDataTable from "../BaseProductsTable/BaseProductTable";
import NavBar from "../NavBar/NavBar";
import EditBaseProductDialog from "../EditBaseProductDialog/EditBaseProductDialog";
import DeleteBaseProductDialog from "../DeleteBaseProductDialog/DeleteBaseProductDialog";
import { deleteBaseProduct, updateBaseProduct } from "../../api/api";
import { BaseProduct } from "../../types/types";
// Importa los componentes de edición y eliminación

const BaseProductsView: React.FC = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [currentProduct, setCurrentProduct] = useState<BaseProduct>({
    _id: "658b6f151166e47c8ef3ee52",
    sku: "SKU12345",
    name: "Nuevo Nombre del Producto",
    brand: "Nueva Marca",
    distributor: "Distribuidor",
    category: "Categoría",
    region: "Región",
    format: "2,97 m2",
  });

  const handleEdit = (product: BaseProduct) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (product: BaseProduct) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setIsEditDialogOpen(false);
    setIsDeleteDialogOpen(false);
  };

  const handleSaveEditedProduct = async (editedProduct: any) => {
    const updatedProduct = await updateBaseProduct(editedProduct);
    handleCloseDialogs();
    return updatedProduct;
  };

  const handleConfirmDelete = async (productId: string) => {
    await deleteBaseProduct(productId);
    handleCloseDialogs();
  };

  return (
    <>
      <NavBar />
      <div>
        <Button onClick={handleOpen}>Show backdrop</Button>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" m={4}>
          Productos Base
        </Typography>
        <div>
          <BaseProductDataTable onEdit={handleEdit} onDelete={handleDelete} />
          <EditBaseProductDialog
            product={currentProduct}
            open={isEditDialogOpen}
            onClose={handleCloseDialogs}
            onSave={handleSaveEditedProduct}
          />
          <DeleteBaseProductDialog
            product={currentProduct}
            open={isDeleteDialogOpen}
            onClose={handleCloseDialogs}
            onConfirm={handleConfirmDelete}
          />
        </div>
      </Box>
    </>
  );
};

export default BaseProductsView;
