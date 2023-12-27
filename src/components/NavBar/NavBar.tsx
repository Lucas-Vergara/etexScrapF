import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { downloadExcel } from "../../api/api";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import LegalDialog from "../LegalDialog/LegalDialog";
import NavbarButtons from "../NavBarButtons/NavBarButtons";

export default function NavBar() {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleDownloadExcel = async () => {
    try {
      const blob = await downloadExcel();
      saveAs(blob, "productos_etex.xlsx");

      console.log("Descarga exitosa");
    } catch (error) {
      console.error("Error al llamar al servidor:", error);
    }
  };

  const handleLegalClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
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
          <div style={{ flexGrow: 1 }}>
            <img
              src="/favicon.ico"
              alt=""
              style={{ height: "35px", cursor: "pointer" }}
              onClick={handleLogoClick}
            />
          </div>
          <Typography
            variant="h6"
            component="div"
            onClick={handleLogoClick}
            sx={{ flexGrow: 1, color: "#36454F", cursor: "pointer" }}
          >
            Herramienta levantamiento de PVP
          </Typography>
          <NavbarButtons
            onLegalClick={handleLegalClick}
            onDownloadExcel={handleDownloadExcel}
          />
        </Toolbar>
      </AppBar>
      <LegalDialog open={dialogOpen} onClose={handleDialogClose} />
    </Box>
  );
}
