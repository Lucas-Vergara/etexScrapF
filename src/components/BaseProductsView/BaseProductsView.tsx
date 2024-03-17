import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import BaseProductDataTable from '../BaseProductsTable/BaseProductTable';
import NavBar from '../NavBar/NavBar';
import EditBaseProductDialog from '../EditBaseProductDialog/EditBaseProductDialog';
import DeleteBaseProductDialog from '../DeleteBaseProductDialog/DeleteBaseProductDialog';
import {
  createBaseProduct,
  deleteBaseProduct,
  downloadBaseProductsExcel,
  updateBaseProduct,
} from '../../api/api';
import { BaseProduct } from '../../types/types';
import CreateBaseProductDialog from '../CreateBaseProductDialog/CreateBaseProductDialog';
import LoadingDialog from '../LoadingDialog/LoadingDialog';
import { saveAs } from 'file-saver';

const BaseProductsView: React.FC = () => {
  const handleCloseDialogs = () => {
    setCreateDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsDeleteDialogOpen(false);
  };
  const [currentProduct, setCurrentProduct] = useState<BaseProduct>({
    _id: '658b6f151166e47c8ef3ee52',
    sku: 'SKU12345',
    name: 'Nuevo Nombre del Producto',
    brand: 'Nueva Marca',
    distributor: 'Distribuidor',
    category: 'Categoría',
    region: 'Región',
    format: '2,97 m2',
  });

  const [loading, setLoading] = useState(false);
  //CREATE
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const handleCreateProductSave = async (newProduct: BaseProduct) => {
    const product = await createBaseProduct(newProduct);
    setCreateDialogOpen(false);
    return product;
  };

  const handleCreateProductOpen = () => {
    setCreateDialogOpen(true);
  };

  //EDIT
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const handleEdit = (product: BaseProduct) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleSaveEditedProduct = async (editedProduct: any) => {
    const updatedProduct = await updateBaseProduct(editedProduct);
    handleCloseDialogs();
    return updatedProduct;
  };

  //DELETE
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const handleDelete = (product: BaseProduct) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async (productId: string) => {
    await deleteBaseProduct(productId);
    handleCloseDialogs();
  };

  const handleDownloadExcel = async () => {
    try {
      const blob = await downloadBaseProductsExcel();
      saveAs(blob, 'Productos Base Matconstpvp.xlsx');
      console.log('Descarga exitosa de BaseProducts');
    } catch (error) {
      console.error('Error al descargar BaseProducts:', error);
    }
  };

  return (
    <>
      <NavBar />
      <LoadingDialog open={loading} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" mt={2}>
          Productos Base
        </Typography>
        <Button
          variant="text"
          disableElevation={true}
          onClick={handleDownloadExcel}
          sx={{
            color: '#FFA07A',
          }}
        >
          Descargar Excel
        </Button>
        <div>
          <BaseProductDataTable
            onEdit={handleEdit}
            onDelete={handleDelete}
            handleCreateProductOpen={handleCreateProductOpen}
          />
          <CreateBaseProductDialog
            open={createDialogOpen}
            onClose={handleCloseDialogs}
            onSave={handleCreateProductSave}
            setLoading={setLoading}
          />
          <EditBaseProductDialog
            product={currentProduct}
            open={isEditDialogOpen}
            onClose={handleCloseDialogs}
            onSave={handleSaveEditedProduct}
            setLoading={setLoading}
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
