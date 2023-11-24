import {
  Box,
  Container,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AppWidgetSummary from "../AppWidgetSummary/AppWidgetSummary";
import NavBar from "../NavBar/NavBar";
import EtexButton from "../Button/EtexButton";
import { runScript } from "../../api/api";
import { useScrapingStore } from "../../store/zustand";

function ServiceInfo() {
  const { scrapingTracker, isLoading, missingProducts } = useScrapingStore();

  const handleRunScript = async () => {
    runScript();
  };

  if (isLoading) {
    return <div>Cargando Datos...</div>;
  }

  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <NavBar />
      <Container maxWidth="xl" sx={{ pt: 4 }}>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <AppWidgetSummary
            title="Productos recolectados hoy"
            total={scrapingTracker?.productsAmount}
            icon="robot"
          />
          <AppWidgetSummary
            title="Productos ausentes hoy"
            total={scrapingTracker?.missingProducts?.length}
            icon={
              scrapingTracker?.missingProducts?.length ? "error" : "success"
            }
            timeout={1000}
          />
          <AppWidgetSummary
            title="Productos ausentes en los últimos 30 días"
            total={missingProducts?.length}
            icon={missingProducts?.length ? "error" : "success"}
            timeout={2000}
          />
        </Box>
        <Card
          component={Stack}
          spacing={3}
          sx={{
            boxShadow:
              "0 0 2px 0 rgba(145, 158, 171, 0.08), 0 12px 24px -4px rgba(145, 158, 171, 0.08)",
            margin: "50px",
            px: 3,
            py: 5,
            borderRadius: "16px",
            maxWidth: "800px",
          }}
        >
          <div>Datos del último Tracker</div>
          <TableContainer component={Paper} sx={{}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Horario
                  </TableCell>
                  <TableCell align="left">
                    Iniciado por &nbsp;
                    {scrapingTracker?.initiator}
                    &nbsp; a las &nbsp;
                    {scrapingTracker?.started}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Productos Ausentes
                  </TableCell>
                  <TableCell align="left">
                    {scrapingTracker?.missingProducts.length}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <EtexButton onClick={handleRunScript} text="Ejecutar Script" />
        </Card>
      </Container>
    </div>
  );
}

export default ServiceInfo;
