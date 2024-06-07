import { Box, CircularProgress, Stack } from "@mui/material";
import React from "react";

function LoadingScreen() {
  return (
    <Stack
      sx={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CircularProgress />
    </Stack>
  );
}

export default LoadingScreen;
