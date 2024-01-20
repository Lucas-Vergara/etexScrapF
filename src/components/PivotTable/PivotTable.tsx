import { useState, useEffect, useRef } from "react";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import Plot from "react-plotly.js";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import { Product } from "../../types/types";
import { getMonthName } from "./getMonthName";
import formatCells from "./formatCells";
import { fetchProducts } from "../../api/api";

const PlotlyRenderers = createPlotlyRenderers(Plot);

const PivotTable = (props: any) => {
  const [state, setState] = useState(props);
  const [originalData, setOriginalData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const tableRef = useRef(null); // Crear un ref

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setOriginalData(data);
        setIsLoading(false);
        setTimeout(() => {
          formatCells();
        }, 500); //  medio segundo
      } catch (error) {
        throw error;
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      formatCells();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, tableRef.current]);

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

  return (
    <>
      <div id="pivottable" ref={tableRef}>
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
