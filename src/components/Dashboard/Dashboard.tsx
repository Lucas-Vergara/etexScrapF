import React, { useState } from "react";
import { saveAs } from "file-saver";
import { downloadExcel, runScript } from "../../api/api";
import "./dashboard.css";
import { Alert, Container } from "@mui/material";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

interface Product {
  _id: string;
  name: string;
  brand: string;
  distributor: string;
  sku: string;
  price: number;
  date: string;
}

const Dashboard: React.FC = () => {
  const [originalData, setOriginalData] = useState<Product[] | undefined>(
    undefined
  );

  const handleRunScript = async () => {
    runScript();
  };

  const handleDownloadExcel = async () => {
    try {
      const blob = await downloadExcel();

      // Usa FileSaver.js para guardar el blob como un archivo
      saveAs(blob, "productos_etex.xlsx");

      console.log("Descarga exitosa");
    } catch (error) {
      console.error("Error al llamar al servidor:", error);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchProducts();
  //       setOriginalData(data);
  //     } catch (error) {
  //       throw error;
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <NavBar />
      <Container maxWidth="sm" style={{ textAlign: "center" }}></Container>
      {/* 
      <Box sx={{ display: "flex" }}>
        <EtexButton
          onClick={handleRunScript}
          text="Ejecutar Script"
        ></EtexButton>
        <EtexButton
          onClick={handleDownloadExcel}
          text="Descargar Documento"
        ></EtexButton>
      </Box> */}

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
      <img src="Etex_Logo.png" alt="Etex Logo" className="etex-logo" />
    </>
  );
};

export default Dashboard;
