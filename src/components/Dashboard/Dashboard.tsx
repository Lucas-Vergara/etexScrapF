import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { saveAs } from "file-saver";
import { downloadExcel, fetchProducts, runScript } from "../../api/api";
import "./dashboard.css";
import { Container, Link, Typography } from "@mui/material";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setOriginalData(data);
      } catch (error) {
        throw error;
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Container maxWidth="sm" style={{ textAlign: "center" }}>
        <h1>Herramienta levantamiento de PVP</h1>
      </Container>
      <Button variant="contained" onClick={handleRunScript}>
        Ejecutar Script
      </Button>
      <br />
      <Button variant="contained" onClick={handleDownloadExcel}>
        Descargar Documento
      </Button>
      <br />
      <br />
      <br />
      <div className="disclaimer">
        <div>
          *Disclaimer: Esta herramienta es de uso exclusivo de colaboradores
          designados de Etex Chile para visualizar el levantamiento de precios a
          la venta al público (PVP).
        </div>
        <div>
          Toda la información recogida en esta plataforma es de acceso público a
          través de las distintas páginas web disponibles de nuestros
          distribuidores.
        </div>
      </div>
      <footer>
        <div className="footer-container">
          <div className="footer-shape left-square"></div>
          <div className="footer-shape left-shape"></div>
          <Container maxWidth="sm" style={{ textAlign: "center" }}>
            <Typography
              variant="body2"
              style={{
                paddingTop: "18px",
                fontStyle: "italic",
                color: "#FFFFE1",
              }}
            >
              Desarrollado por{" "}
              <Link
                href="https://www.linkedin.com/in/lucas-vergara-78a8891b5/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#FFEEAF",
                  textDecoration: "none",
                }}
              >
                Lucas Vergara
              </Link>
            </Typography>
          </Container>

          <div className="footer-shape right-shape"></div>
          <div className="footer-shape right-square"></div>
        </div>
      </footer>
      <img src="Etex_Logo.png" alt="Etex Logo" className="etex-logo" />
    </div>
  );
};

export default Dashboard;
