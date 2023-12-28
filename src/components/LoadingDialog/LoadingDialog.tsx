import React, { useState } from "react";
import { Dialog, CircularProgress } from "@mui/material";

interface LoadingDialogProps {
  opened: boolean;
  message?: string; // Mensaje como prop opcional
}

function LoadingDialog({ opened, message }: LoadingDialogProps) {
  const content = message ? "message" : "loading";
  const [open, setOpen] = useState(opened);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      {content === "loading" ? <CircularProgress /> : message}
    </Dialog>
  );
}

export default LoadingDialog;
