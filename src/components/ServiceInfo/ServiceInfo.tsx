import { Box, Container } from "@mui/material";
import React from "react";
import AppWidgetSummary from "../AppWidgetSummary/AppWidgetSummary";
import NavBar from "../NavBar/NavBar";

function ServiceInfo() {
  return (
    <body style={{ backgroundColor: "#f9fafb" }}>
      <NavBar />
      <Container maxWidth="xl" sx={{ pt: 4 }}>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <AppWidgetSummary
            title="New Users"
            total={1352831}
            color="info"
            icon={
              <img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />
            }
          />
          <AppWidgetSummary
            title="Item Orders"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
          <AppWidgetSummary
            title="Bug Reports"
            total={234}
            color="error"
            icon={
              <img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />
            }
          />
        </Box>
        <AppWidgetSummary
          title="Bug Reports"
          total={234}
          color="error"
          icon={
            <img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />
          }
        />
      </Container>
    </body>
  );
}

export default ServiceInfo;
