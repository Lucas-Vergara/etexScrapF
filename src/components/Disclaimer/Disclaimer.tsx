import { Alert } from "@mui/material";
import BaseProductDialog from "../BaseProductsDialog/BaseProductDialog";
import { useState } from "react";

function Disclaimer() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const handleLegalClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div
      style={{
        left: "0",
        marginTop: "-12px",
        marginBottom: "10px",
      }}
    >
      <Alert severity="info">
        Esta herramienta de uso exclusivo de colaboradores designados de Etex
        Chile para visualizar levantamiento de precios a venta público (PVP).
        Toda la información obtenida proviene de fuentes públicas. Para obtener
        más detalles sobre las fuentes, haga click&nbsp;
        <span
          style={{ color: "orange", cursor: "pointer" }}
          onClick={handleLegalClick}
        >
          aquí
        </span>
        .
      </Alert>
      <BaseProductDialog open={dialogOpen} onClose={handleDialogClose} />
    </div>
  );
}

export default Disclaimer;
