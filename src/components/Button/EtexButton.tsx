import React from "react";
import Button from "@mui/material/Button";

interface ButtonProps {
  onClick: any;
  text: string;
  color: string;
  original: boolean;
}

const EtexButton: React.FC<ButtonProps> = (props) => {
  if (!props.original) {
    return (
      <Button
        variant="text"
        onClick={props.onClick}
        sx={{
          fontSize: "16px",
          textTransform: "none",
          color: props.color,
          "&:hover": {
            backgroundColor: "rgba(251, 192, 147, 0.2)",
          },
        }}
      >
        {props.text}
      </Button>
    );
  }
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
