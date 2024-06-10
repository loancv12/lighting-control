import React from "react";
import LoginForm from "./LoginForm";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Login() {
  console.log("login compo");
  return (
    <Stack
      spacing={2}
      sx={{
        pt: 8,
        position: "relative",
      }}
    >
      <Typography variant="h4">Đăng nhập</Typography>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">Chưa có tài khoản?</Typography>
        <Link to="/register" variant="subtitle" sx={{ cursor: "Pointer" }}>
          Tạo tài khoản
        </Link>
      </Stack>
      {/* Form */}
      <LoginForm />
    </Stack>
  );
}

export default Login;
