import React from "react";
import "./dashboard.css";
import { Alert } from "@mui/material";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import PivotTable from "../PivotTable/PivotTable";
import formatCells from "../PivotTable/formatCells";

const Dashboard: React.FC = () => {
  setTimeout(() => {
    formatCells();
  }, 100);

  const months: { [key: string]: boolean } = {
    Enero: true,
    Febrero: true,
    Marzo: true,
    Abril: true,
    Mayo: true,
    Junio: true,
    Julio: true,
    Agosto: true,
    Septiembre: true,
    Octubre: true,
    Noviembre: true,
    Diciembre: true,
  };

  const date = new Date();
  const currentMonth = date.getMonth();
  delete months[Object.keys(months)[currentMonth]];

  return (
    <>
      <NavBar />
      <PivotTable
        cols={["Mes", "Día"]}
        rows={["Categoría", "Producto", "Distribuidor", "Marca"]}
        vals={["Precio"]}
        aggregatorName="Average"
        filename="Herramienta levantamiento de PVP"
        valueFilter={{
          Mes: months,
        }}
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
