import React, { useState } from "react";
import "./dashboard.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import PivotTable from "../PivotTable/PivotTable";
import formatCells from "../PivotTable/formatCells";
import Disclaimer from "../Disclaimer/Disclaimer";

const Dashboard: React.FC = () => {
  const [resetKey, setResetKey] = useState(0);

  const resetTable = () => {
    setResetKey((prevKey) => prevKey + 1);
  };

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
      <Disclaimer />
      <button
        onClick={resetTable}
        style={{
          backgroundColor: "#FFA07A", // Un naranja pastel
          color: "white",
          padding: "5px 5px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          margin: "0px 10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        Restablecer Filtros
      </button>
      <PivotTable
        key={resetKey}
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
      <Footer />
    </>
  );
};

export default Dashboard;
