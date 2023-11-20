import React, { useState, useEffect } from "react";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import Plot from "react-plotly.js";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import { fetchProducts } from "../../api/api";

const PlotlyRenderers = createPlotlyRenderers(Plot);

interface Product {
  _id: string;
  name: string;
  brand: string;
  distributor: string;
  sku: string;
  price: number;
  date: string;
}

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

  const transformedData = originalData.map((product) => [
    product.date,
    product.distributor,
    product.brand,
    product.name,
    product.price?.toString(),
  ]);

  transformedData.unshift([
    "Fecha",
    "Distribuidor",
    "Marca",
    "Producto",
    "Precio",
  ]);

  return (
    <>
      <PivotTableUI
        data={transformedData}
        onChange={(s) => setState(s)}
        renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
        {...state}
      />
    </>
  );
};

export default PivotTable;
