import {
  Box,
  Container,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import AppWidgetSummary from "../AppWidgetSummary/AppWidgetSummary";
import NavBar from "../NavBar/NavBar";
import EtexButton from "../Button/EtexButton";
import { runScript } from "../../api/api";
import { useProductStore } from "../../store/ProductStore";

function ServiceInfo() {
  const {
    scrapingTracker,
    isLoading,
    dailyMissingProducts,
    monthlyMissingProducts,
  } = useProductStore();
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState(!scrapingTracker?.completed);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRunScript = () => {
    handleOpen();
  };

  const handleConfirm = () => {
    runScript();
    handleClose();
    setRunning(true);
  };

  if (isLoading) {
    return <div>Cargando Datos...</div>;
  }

  console.log();

  const startDate = scrapingTracker && new Date(scrapingTracker?.started);
  const endDate = scrapingTracker && new Date(scrapingTracker?.completed);
  const startTime = startDate?.toLocaleTimeString();
  const completedTime = endDate?.toLocaleTimeString();

  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <NavBar />
      <Container>
        <Box
          sx={{
            marginTop: "-20px",
            display: "flex",
          }}
        >
          <AppWidgetSummary
            title="Productos recopilados hoy"
            total={scrapingTracker?.productsAmount}
            icon="robot"
          />
          <AppWidgetSummary
            title="Productos ausentes hoy"
            total={dailyMissingProducts?.length}
            icon={dailyMissingProducts?.length ? "error" : "success"}
            timeout={1000}
            products={dailyMissingProducts}
          />
          <AppWidgetSummary
            title="Productos ausentes en los últimos 30 días"
            total={
              monthlyMissingProducts?.length
                ? monthlyMissingProducts.reduce(
                    (total, p) => total + p.missingProducts.length,
                    0
                  )
                : null
            }
            icon={monthlyMissingProducts?.length ? "error" : "success"}
            timeout={2000}
            products={monthlyMissingProducts}
          />
        </Box>

        <Card
          component={Stack}
          spacing={3}
          sx={{
            position: "relative",
            boxShadow: () =>
              scrapingTracker?.completed
                ? "0 0 2px 0 rgba(145, 158, 171, 0.08), 0 12px 24px -4px rgba(145, 158, 171, 0.08)"
                : "0 0 2px 0 rgba(145, 158, 171, 0.08)",
            margin: "50px",
            px: 8,
            py: 5,

            borderRadius: "16px",
            maxWidth: "800px",
            my: 0,
          }}
        >
          {running && (
            <>
              <CircularProgress
                disableShrink
                size={120} // Puedes ajustar el tamaño según sea necesario
                thickness={5} // Puedes ajustar el grosor del anillo
                sx={{
                  position: "absolute",
                  top: "35%",
                  left: "40%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  color: "#FFBF00",
                  cursor: "not-allowed",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: -30,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(0, 0, 0, 0.2)", // Puedes ajustar el nivel de oscurecimiento aquí
                  zIndex: 1,
                  cursor: "not-allowed",
                }}
              />
            </>
          )}

          <div>Datos del último Proceso</div>
          <TableContainer component={Paper} sx={{}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {/* <TableRow>
                  <TableCell component="th" scope="row">
                    Día
                  </TableCell>
                  <TableCell align="left">{day}</TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell component="th" scope="row">
                    Horario de Inicio
                  </TableCell>
                  <TableCell align="left">{startTime}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Horario de Termino
                  </TableCell>
                  <TableCell align="left">
                    {running ? "en ejecución" : completedTime}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Ejecutado por
                  </TableCell>
                  <TableCell align="left">
                    {scrapingTracker?.initiator}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Productos Ausentes
                  </TableCell>
                  <TableCell align="left">
                    {scrapingTracker?.missingProducts?.length}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {!running && (
            <EtexButton
              color="black"
              original={true}
              onClick={handleRunScript}
              text="Ejecutar Proceso de Scraping"
            />
          )}
        </Card>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          ¿Estás seguro de que deseas ejecutar el proceso?{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Los productos recopilados el día de hoy serán reemplazados por los
            adquiridos en este nuevo proceso.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} sx={{ color: "teal" }}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ServiceInfo;
