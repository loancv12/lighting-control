import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { selectAreaId } from "../../redux/area/areaSlice";

const SidebarLayout = () => {
  const selectedAreaId = useSelector(selectAreaId);
  return (
    <Container maxWidth="lg">
      <Stack width={"100%"} direction={"column"} spacing={2}>
        <Box width={"100%"}>
          <Sidebar />
        </Box>
        <Box width={"100%"}>
          {selectedAreaId ? (
            <Outlet />
          ) : (
            <Typography>Đầu tiên, bạn phải chọn khu vực đã</Typography>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default SidebarLayout;
