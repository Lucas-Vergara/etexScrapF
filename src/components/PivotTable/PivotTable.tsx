import React, { useState, useEffect } from "react";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import { fetchProducts } from "../../api/api";

interface Product {
  _id: string;
  name: string;
  brand: string;
  distributor: string;
  sku: string;
  price: number;
  date: string;
}

interface PivotTableProps {
  // Define las propiedades que esperas en props
}

const PivotTable: React.FC<PivotTableProps> = (props) => {
  const [state, setState] = useState(props);
  const [originalData, setOriginalData] = useState<Product[]>([]);

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
    "Nombre",
    "Precio",
  ]);

  return (
    <PivotTableUI
      data={transformedData}
      onChange={(s) => setState(s)}
      {...state}
    />
  );
};

export default PivotTable;
