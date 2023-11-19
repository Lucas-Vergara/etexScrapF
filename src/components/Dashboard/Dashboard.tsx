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
