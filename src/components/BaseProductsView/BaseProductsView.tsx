import React, { useState } from "react";
import { Container } from "@mui/material";
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
  // Suponiendo que tienes un estado para el producto seleccionado
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
    console.log(currentProduct);

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
    try {
      await updateBaseProduct(editedProduct);
      // Aquí podrías también llamar a una función para recargar los productos o actualizar el estado
      handleCloseDialogs();
    } catch (error) {
      // Manejar errores, como mostrar un mensaje al usuario
      console.error(error);
    }
  };

  const handleConfirmDelete = async (productId: string) => {
    await deleteBaseProduct(productId); // Asegúrate de que tienes el ID del producto a eliminar
    handleCloseDialogs();
  };

  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <NavBar />
      <Container>
        <BaseProductDataTable onEdit={handleEdit} onDelete={handleDelete} />
        <EditBaseProductDialog
          product={currentProduct}
          open={isEditDialogOpen}
          onClose={handleCloseDialogs}
          onSave={handleSaveEditedProduct}
        />
        <DeleteBaseProductDialog
          productId={currentProduct._id}
          open={isDeleteDialogOpen}
          onClose={handleCloseDialogs}
          onConfirm={handleConfirmDelete}
        />
      </Container>
    </div>
  );
};

export default BaseProductsView;
