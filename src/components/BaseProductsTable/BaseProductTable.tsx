import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridDeleteIcon,
  GridToolbar,
  esES,
} from "@mui/x-data-grid";
import { useProductStore } from "../../store/ProductStore";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

// Define las columnas

interface BaseProductsDataTableProps {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
}

const BaseProductsDataTable: React.FC<BaseProductsDataTableProps> = ({
  onEdit,
  onDelete,
}) => {
  const { baseProducts } = useProductStore();

  // Mapea tus productos a filas para la DataGrid
  const rows = baseProducts.map((product) => ({
    id: product._id,
    ...product,
  }));

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "category", headerName: "Categoría", width: 200 },
    { field: "distributor", headerName: "Distribuidor", width: 200 },
    { field: "sku", headerName: "SKU", width: 330 },
    {
      field: "acciones",
      headerName: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={() => onEdit(params.row)}>
            <EditIcon sx={{ color: "orange" }} />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => onDelete(params.row)}>
            <GridDeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        slots={{ toolbar: GridToolbar }}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 50, 100]}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      />
    </div>
  );
};

export default BaseProductsDataTable;
