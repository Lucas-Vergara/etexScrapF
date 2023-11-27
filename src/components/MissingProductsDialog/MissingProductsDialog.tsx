import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
  MissingProductsDialogProps,
  DailyMissingProducts,
} from "../../types/types";

const MissingProductsDialog: React.FC<MissingProductsDialogProps> = ({
  open,
  onClose,
  data,
}) => {
  if (!data) {
    // Handle the case when data is null
    return null;
  }

  const isMonthly = Array.isArray(data) && "day" in data[0];

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true}>
      <DialogTitle>
        {isMonthly
          ? "Productos Ausentes Últimos 30 Días"
          : "Productos Austentes Hoy"}
      </DialogTitle>
      <DialogContent>
        {isMonthly ? (
          data.map((monthlyData: any) => (
            <div key={monthlyData.day}>
              <DialogContentText>{monthlyData.day}</DialogContentText>
              <ul>
                {monthlyData.missingProducts.map(
                  (dailyProduct: DailyMissingProducts) => (
                    <li key={dailyProduct.product}>
                      <a
                        href={dailyProduct.product_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {dailyProduct.product}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))
        ) : (
          <ul>
            {(data as DailyMissingProducts[]).map((dailyProduct) => (
              <li key={dailyProduct.product}>
                <a
                  href={dailyProduct.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dailyProduct.product}
                </a>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MissingProductsDialog;
