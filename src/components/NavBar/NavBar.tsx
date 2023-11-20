import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import EtexButton from "../Button/EtexButton";
import { downloadExcel, runScript } from "../../api/api";
import { saveAs } from "file-saver";

export default function NavBar() {
  const handleRunScript = async () => {
    runScript();
  };

  const handleDownloadExcel = async () => {
    try {
      const blob = await downloadExcel();

      // Usa FileSaver.js para guardar el blob como un archivo
      saveAs(blob, "productos_etex.xlsx");

      console.log("Descarga exitosa");
    } catch (error) {
      console.error("Error al llamar al servidor:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, pb: 2 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 0px 10px 0px #0474BA",
        }}
      >
        <Toolbar>
          <div style={{ flexGrow: 1 }}>
            <img src="/favicon.ico" alt="" style={{ height: "35px" }} />
          </div>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#36454F" }}
          >
            Herramienta levantamiento de PVP
          </Typography>
          <Box sx={{ display: "flex" }}>
            <EtexButton
              onClick={handleRunScript}
              text="Ejecutar Script"
            ></EtexButton>
            <EtexButton
              onClick={handleDownloadExcel}
              text="Descargar Documento"
            ></EtexButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
