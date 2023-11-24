import React from "react";
import Button from "@mui/material/Button";

interface DashboardProps {
  onClick: any;
  text: string;
}

const EtexButton: React.FC<DashboardProps> = (props) => {
  return (
    <Button
      variant="contained"
      onClick={props.onClick}
      size="small"
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        backgroundColor: "#f57c00",
        color: "whitesmoke",
        margin: "10px",
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: "rgba(222, 97, 6, 1)",
        },
      }}
    >
      {props.text}
    </Button>
  );
};

export default EtexButton;
