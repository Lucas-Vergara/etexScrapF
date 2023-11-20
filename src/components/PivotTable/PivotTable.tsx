import React, { useState, useEffect } from "react";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import Plot from "react-plotly.js";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import { fetchProducts } from "../../api/api";
import { Product } from "../../types/types";
import { getMonthName } from "./getMonthName";
import html2canvas from "html2canvas";

const PlotlyRenderers = createPlotlyRenderers(Plot);

const handleDownload = () => {
  const element = document.getElementById("pivottable") as HTMLDivElement;
  if (element) {
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "tablaPVP.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
};

const PivotTable = (props: any) => {
  const [state, setState] = useState(props);
  const [originalData, setOriginalData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setOriginalData(data);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false); // Marca la carga como completa, independientemente de si fue exitosa o no
      }
    };

    fetchData();
  }, []);

  if (loading) {
    // Muestra un indicador de carga mientras se obtienen los datos
    return <div>Cargando Tabla Dinámica...</div>;
  }

  console.log(originalData);

  const transformedData = originalData.map((product) => [
    product.date,
    product.day,
    getMonthName(parseInt(product.month)),
    product.year,
    product.distributor,
    product.brand,
    product.name,
    product.price?.toString(),
    product.region,
  ]);

  transformedData.unshift([
    "Fecha",
    "Día",
    "Mes",
    "Año",
    "Distribuidor",
    "Marca",
    "Producto",
    "Precio",
    "Región",
  ]);

  return (
    <>
      <button onClick={handleDownload}>Descargar Imagen</button>
      <div id="pivottable">
        <PivotTableUI
          data={transformedData}
          onChange={(s) => setState(s)}
          renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
          {...state}
        />
      </div>
    </>
  );
};

export default PivotTable;
