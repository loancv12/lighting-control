import { Container, Stack } from "@mui/material";
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function HeaderLayout() {
  return (
    <Container maxWidth="sm">
      {/* <Stack justifyContent={"center"} alignItems={"center"} maxWidth={"sm"}> */}
      <Header />
      <Outlet />
      {/* </Stack> */}
    </Container>
  );
}

export default HeaderLayout;
