import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { BaseProduct } from "../../types/types";
import { useProductStore } from "../../store/ProductStore";

const BaseProductDialog: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { baseProducts } = useProductStore();

  // Función para obtener distribuidores únicos
  const getUniqueDistributors = () => {
    const distributorsSet = new Set(
      baseProducts.map((product) => product.distributor)
    );
    return Array.from(distributorsSet);
  };

  // Función para filtrar productos por distribuidor
  const filterProductsByDistributor = (distributor: string) => {
    return baseProducts.filter(
      (product) => product.distributor === distributor
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"lg"}>
      <DialogTitle>Links externos de Productos</DialogTitle>
      <DialogContent>
        {getUniqueDistributors().map((distributor) => (
          <div key={distributor}>
            <h3>{distributor}</h3>
            <ul>
              {filterProductsByDistributor(distributor).map(
                (product: BaseProduct) => (
                  <li key={product._id}>
                    <a
                      href={product.sku}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`${product.name}-${product.brand}`}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BaseProductDialog;
