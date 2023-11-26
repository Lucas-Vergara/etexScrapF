import PropTypes from "prop-types";

import { Card, Grow, Stack, Typography, Box } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SmartToyIcon from "@mui/icons-material/SmartToy";

// ----------------------------------------------------------------------

export default function AppWidgetSummary(props: any) {
  const { title, total, icon, timeout } = props;
  return (
    <Grow in timeout={timeout}>
      <Card
        component={Stack}
        spacing={3}
        direction="row"
        sx={{
          boxShadow:
            "0 0 2px 0 rgba(145, 158, 171, 0.08), 0 12px 24px -4px rgba(145, 158, 171, 0.08)",
          margin: "50px",
          px: 3,
          py: 5,
          borderRadius: "16px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex" }}>
            {icon === "inventory" && (
              <Inventory2Icon sx={{ color: "teal", fontSize: "3rem" }} />
            )}

            {icon === "error" && (
              <ErrorOutlineIcon sx={{ color: "red", fontSize: "3rem" }} />
            )}

            {icon === "success" && (
              <CheckCircleOutlineIcon
                sx={{ color: "teal", fontSize: "3rem" }}
              />
            )}

            {icon === "robot" && (
              <SmartToyIcon sx={{ color: "teal", fontSize: "3rem" }} />
            )}

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
  );
}

AppWidgetSummary.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  total: PropTypes.number,
  timeout: PropTypes.number,
};
