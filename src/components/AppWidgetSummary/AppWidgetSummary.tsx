import React, { useState } from "react";
import { Card, Grow, Stack, Typography, Box } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import MissingProductsDialog from "../MissingProductsDialog/MissingProductsDialog";

type IconType = "inventory" | "error" | "success" | "robot";
const iconComponents: Record<IconType, JSX.Element> = {
  inventory: <Inventory2Icon sx={{ color: "teal", fontSize: "3rem" }} />,
  error: <ErrorOutlineIcon sx={{ color: "red", fontSize: "3rem" }} />,
  success: <CheckCircleOutlineIcon sx={{ color: "teal", fontSize: "3rem" }} />,
  robot: <SmartToyIcon sx={{ color: "teal", fontSize: "3rem" }} />,
};

const AppWidgetSummary = React.memo((props: any) => {
  const { title, total, icon, timeout, products } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any>(null);

  const handleDialogOpen = () => {
    setSelectedProducts(products);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Grow in timeout={timeout}>
        <Card
          component={Stack}
          spacing={3}
          direction="row"
          onClick={() => icon === "error" && handleDialogOpen()}
          sx={{
            boxShadow:
              "0 0 2px 0 rgba(145, 158, 171, 0.08), 0 12px 24px -4px rgba(145, 158, 171, 0.08)",
            margin: "50px",
            px: 3,
            py: 5,
            borderRadius: "16px",
            cursor: icon === "error" ? "pointer" : "",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex" }}>
              {iconComponents[icon as IconType]}
              <Typography variant="h4" pl={5}>
                {total}
              </Typography>
            </Box>
            <Typography
              variant="subtitle2"
              pt={2}
              sx={{ color: "text.disabled" }}
            >
              {title}
            </Typography>
          </Box>
        </Card>
      </Grow>

      <MissingProductsDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        data={selectedProducts}
      />
    </>
  );
});

export default AppWidgetSummary;
