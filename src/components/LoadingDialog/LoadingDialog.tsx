import { Box, CircularProgress, Dialog, DialogContent } from "@mui/material";
import React from "react";

interface LoadingDialogProps {
  open: boolean;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({ open }) => {
  return (
    <Dialog open={open}>
      <DialogContent sx={{ height: "160px", width: "250px" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress
              sx={{ color: "#f57c00" }}
              disableShrink
              size={120}
            />
          </Box>
          <Box mt={2}>Verificando presencia del producto</Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
