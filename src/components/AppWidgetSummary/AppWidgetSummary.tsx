import PropTypes from "prop-types";

import { Card, Grow, Stack, Typography } from "@mui/material";
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
        {icon === "inventory" && (
          <Inventory2Icon
            sx={{ color: "teal", paddingTop: "15px" }}
            fontSize="large"
          />
        )}

        {icon === "error" && (
          <ErrorOutlineIcon
            sx={{ color: "red", paddingTop: "15px" }}
            fontSize="large"
          />
        )}

        {icon === "success" && (
          <CheckCircleOutlineIcon
            sx={{ color: "teal", paddingTop: "15px" }}
            fontSize="large"
          />
        )}

        {icon === "robot" && (
          <SmartToyIcon
            sx={{ color: "teal", paddingTop: "15px" }}
            fontSize="large"
          />
        )}

        <Stack spacing={0.5}>
          <Typography variant="h4">{total}</Typography>

          <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
            {title}
          </Typography>
        </Stack>
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
