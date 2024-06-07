import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import cover from "../../assets/background.png";
const CenterLayout = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${cover})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Container maxWidth={"sm"}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default CenterLayout;
