import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface GenericDialogProps {
  open: boolean;
  onClose: () => void;
  text: string | null;
  text2: string | null;
  closeOption: string | null;
  width: string | null;
}

const GenericDialog: React.FC<GenericDialogProps> = ({
  open,
  text,
  text2,
  closeOption,
  width,
  onClose,
}) => {
  const navigate = useNavigate();
  const handleClose = () => {
    closeOption === "home" && navigate("/");
    closeOption === "refresh" && window.location.reload();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          width: width ? width : "340px",
          mt: 1,
        }}
      >
        <DialogContentText>
          <h3>{text}</h3>
        </DialogContentText>
        <DialogContentText>{text2}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          autoFocus
          disableFocusRipple
          sx={{
            textTransform: "none",
            mb: 2,
            mr: 2,
            height: "30px",
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
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericDialog;
