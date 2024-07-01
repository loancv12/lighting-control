import React from "react";
import LoginForm from "./LoginForm";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Login() {
  return (
    <Stack
      spacing={2}
      sx={{
        pt: 8,
        position: "relative",
      }}
    >
      <Typography variant="h4">Đăng nhập</Typography>
      <LoginForm />
    </Stack>
  );
}

export default Login;
