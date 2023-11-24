import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import EtexButton from "../Button/EtexButton";
import { downloadExcel } from "../../api/api";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

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

  const handleServiceInfoClick = () => {
    navigate("/serviceInfo");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1, pb: 2 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 0px 10px 0px lightgray",
        }}
      >
        <Toolbar>
          <div
            style={{ flexGrow: 1, cursor: "pointer" }}
            onClick={handleLogoClick}
          >
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
              text="Servicio de Scraping"
              onClick={handleServiceInfoClick}
            />
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
