import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { saveAs } from "file-saver";
import { downloadExcel, fetchProducts, runScript } from "../../api/api";
import { createLineChart } from "../Chart/chartUtils";

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
  const [skuInput, setSkuInput] = useState<string>("");

  const [originalData, setOriginalData] = useState<Product[] | undefined>(
    undefined
  );
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  const handleRunScript = async () => {
    runScript();
  };

  const handleSkuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSkuInput(event.target.value);
  };

  const handleDownloadExcel = async () => {
    try {
      const blob = await downloadExcel();

      // Usa FileSaver.js para guardar el blob como un archivo
      saveAs(blob, "scrap-data.xlsx");

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

  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const handleFilterBySku = () => {
    // Filtra los productos por SKU

    const filteredProducts = (originalData ?? []).filter((product) =>
      product.sku.toLowerCase().includes(skuInput.toLowerCase())
    );

    console.log("entre");

    // Actualiza el estado de los productos filtrados
    setFilteredData(filteredProducts);
  };

  useEffect(() => {
    if (filteredData.length > 0) {
      // Extracting labels and data for the chart
      const labels = filteredData.map((item) => item.date);
      const prices = filteredData.map((item) => item.price);

      const chartData = {
        title: `${filteredData[0].name} | ${filteredData[0].brand} | ${filteredData[0].distributor}`,
        labels: labels,
        data: prices,
      };

      // Create the chart using the utility function
      createLineChart("myChart", chartData);
    }
  }, [filteredData, skuInput]);

  return (
    <div>
      <h1>Dashboard</h1>
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
      <div>
        <label>Ingrese SKU:</label>
        <input type="text" value={skuInput} onChange={handleSkuChange} />
        <button onClick={handleFilterBySku}>Filtrar</button>
      </div>
      <canvas
        id="myChart"
        ref={chartRef}
        style={{ width: "100px", height: "100px" }}
      ></canvas>
    </div>
  );
};

export default Dashboard;
