import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridDeleteIcon,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  esES,
} from "@mui/x-data-grid";
import { useProductStore } from "../../store/ProductStore";
import { Button, IconButton, ThemeProvider, createTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { BaseProduct } from "../../types/types";
import CreateBaseProductDialog from "../CreateBaseProductDialog/CreateBaseProductDialog";
import { createBaseProduct } from "../../api/api";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f57c00", // Tu color naranja
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: "#FFA07A", // Aplica el color naranja también aquí
        },
      },
    },
  },
});

interface BaseProductsDataTableProps {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
}

const BaseProductsDataTable: React.FC<BaseProductsDataTableProps> = ({
  onEdit,
  onDelete,
}) => {
  const { baseProducts } = useProductStore();
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

  const handleCreateProductSave = async (newProduct: BaseProduct) => {
    const product = await createBaseProduct(newProduct);
    setCreateDialogOpen(false);
    return product;
  };

  const handleCreateProductOpen = () => {
    setCreateDialogOpen(true);
  };

  const handleCreateProductClose = () => {
    setCreateDialogOpen(false);
  };
  const rows = baseProducts.map((product) => ({
    id: product._id,
    ...product,
  }));

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        {/* <GridToolbarColumnsButton /> */}
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "brand", headerName: "Marca", width: 120 },
    { field: "category", headerName: "Categoría", width: 120 },
    { field: "distributor", headerName: "Distribuidor", width: 120 },
    { field: "sku", headerName: "URL", width: 330 },
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
      <ThemeProvider theme={theme}>
        <DataGrid
          sx={{
            p: 2,
          }}
          rows={rows}
          slots={{
            toolbar: () => (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <CustomToolbar />
                <Button
                  variant="contained"
                  onClick={handleCreateProductOpen}
                  size={"small"}
                  disableElevation={true}
                  sx={{
                    backgroundColor: "#FFA07A",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    ":hover": {
                      bgcolor: "#f57c00",
                      color: "white",
                    },
                  }}
                >
                  Crear Producto
                </Button>
              </div>
            ),
          }}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 50, 100]}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </ThemeProvider>
      <CreateBaseProductDialog
        open={createDialogOpen}
        onClose={handleCreateProductClose}
        onSave={handleCreateProductSave}
      />
    </div>
  );
};

export default BaseProductsDataTable;
