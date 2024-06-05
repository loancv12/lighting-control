import React from "react";
import RegisterForm from "./RegisterForm";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Register() {
  return (
    <Stack
      spacing={2}
      sx={{
        pt: 8,
        position: "relative",
      }}
    >
      <Typography variant="h4">Đăng Kí</Typography>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">Đã có tài khoản?</Typography>
        <Link to="/register" variant="subtitle" sx={{ cursor: "Pointer" }}>
          Đăng nhập
        </Link>
      </Stack>
      {/* Form */}
      <RegisterForm />
    </Stack>
  );
}

export default Register;
