import { Container, Stack } from "@mui/material";
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function HeaderLayout() {
  return (
    <Container maxWidth="lg">
      <Header />
      <Outlet />
    </Container>
  );
}

export default HeaderLayout;
