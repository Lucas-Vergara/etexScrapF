import { useState, useEffect } from "react";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import Plot from "react-plotly.js";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import { Product } from "../../types/types";
import { getMonthName } from "./getMonthName";
import formatCells from "./formatCells";
import { useProductStore } from "../../store/ProductStore";

const PlotlyRenderers = createPlotlyRenderers(Plot);

const PivotTable = (props: any) => {
  const [state, setState] = useState(props);
  const [originalData, setOriginalData] = useState<Product[]>([]);
  const { products, isLoading } = useProductStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = products;
        setOriginalData(data);
      } catch (error) {
        throw error;
      }
    };

    fetchData();
  }, [products]);

  useEffect(() => {
    formatCells();
  }, [state]);

  if (isLoading) {
    return <div>Cargando Tabla Dinámica...</div>;
  }

  const transformedData = originalData.map((product) => [
    product.date,
    product.day,
    getMonthName(parseInt(product.month)),
    product.year,
    product.category,
    product.distributor,
    product.brand,
    product.name,
    product.price?.toString(),
    product.region,
    product.format,
  ]);

  transformedData.unshift([
    "Fecha",
    "Día",
    "Mes",
    "Año",
    "Categoría",
    "Distribuidor",
    "Marca",
    "Producto",
    "Precio",
    "Región",
    "Formato",
  ]);

  formatCells();

  return (
    <>
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
