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

  const customMonthOrder = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

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
        sorters={{
          Mes: (a: string, b: string) => {
            return customMonthOrder.indexOf(a) - customMonthOrder.indexOf(b);
          },
        }}
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
          Esta herramienta de uso exclusivo de colaboradores designados de Etex
          Chile para visualizar levantamiento de precios a venta público (PVP).
          Toda la información obtenida proviene de fuentes públicas. Para
          obtener más detalles sobre las fuentes, haga click&nbsp;
          <a
            href="https://github.com/Lucas-Vergara/etexScrap"
            target="_blank"
            rel="noreferrer"
          >
            aquí
          </a>
          .
        </Alert>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
