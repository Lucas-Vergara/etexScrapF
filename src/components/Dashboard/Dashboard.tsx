import React from "react";
import "./dashboard.css";
import { Alert } from "@mui/material";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import PivotTable from "../PivotTable/PivotTable";

const Dashboard: React.FC = () => {
  return (
    <>
      <NavBar />
      <PivotTable
        title="prueba"
        cols={["Mes", "Día"]}
        rows={["Categoría", "Producto", "Distribuidor", "Marca"]}
        vals={["Precio"]}
        aggregatorName="Median"
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="disclaimer">
        <Alert severity="info">
          *Disclaimer: Esta herramienta es de uso exclusivo de colaboradores
          designados de Etex Chile para visualizar el levantamiento de precios a
          la venta al público (PVP). Toda la información recogida en esta
          plataforma es de acceso público a través de las distintas páginas web
          disponibles de nuestros distribuidores.
        </Alert>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
