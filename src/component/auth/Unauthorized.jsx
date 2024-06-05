import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <div>Bạn không có quyền truy cập vào trang này</div>

      <Button onClick={handleBack}>Quay lai</Button>
    </Stack>
  );
};

export default Unauthorized;
