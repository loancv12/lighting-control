import { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";

function App() {
  return (
    <Container maxWidth="sm">
      <Header />
      <Outlet />
    </Container>
  );
}

export default App;
