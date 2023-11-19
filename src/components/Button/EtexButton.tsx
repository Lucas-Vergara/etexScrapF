import React from "react";
import Button from "@mui/material/Button";

interface DashboardProps {
  onClick: () => void;
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
        backgroundColor: " rgba(220, 97, 6, 1)",
        color: "whitesmoke",
        margin: "10px",
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: "rgba(242, 121, 53)",
        },
      }}
    >
      {props.text}
    </Button>
  );
};

export default EtexButton;
