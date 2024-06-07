import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import {
  ArrowCircleDown,
  ArrowCircleLeft,
  ArrowCircleRight,
  ArrowCircleUp,
  ArrowClockwise,
} from "phosphor-react";
import React, { useState } from "react";
import Charts from "./Charts";
import { maxPeriod } from "./Statistics";

const SingleChart = ({
  labels,
  naturals,
  afterSLs,
  refetch,
  setPage,
  setPeriod,
  numberOfData,
}) => {
  const handleRefetch = () => {
    refetch();
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPeriod = () => {
    setPeriod((prevPeriod) => {
      console.log(prevPeriod);
      if (numberOfData < maxPeriod) {
        return prevPeriod < numberOfData ? prevPeriod + 1 : numberOfData;
      } else {
        return prevPeriod < maxPeriod ? prevPeriod + 1 : maxPeriod;
      }
    });
  };

  const handlePrevPeriod = () => {
    setPeriod((prevPeriod) => (prevPeriod > 1 ? prevPeriod - 1 : 1));
  };

  return (
    <Stack direction="row">
      <Stack justifyContent={"center"}>
        <IconButton onClick={handleRefetch}>
          <ArrowClockwise size={32} />
        </IconButton>

        <IconButton onClick={handlePrevPage}>
          <ArrowCircleLeft size={32} />
        </IconButton>
        <IconButton onClick={handleNextPage}>
          <ArrowCircleRight size={32} />
        </IconButton>

        <Tooltip title="Tăng độ rộng thời gian" placement="left">
          <IconButton onClick={handleNextPeriod}>
            <ArrowCircleUp size={32} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Giảm độ rộng thời gian" placement="left">
          <IconButton onClick={handlePrevPeriod}>
            <ArrowCircleDown size={32} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Box sx={{ height: "300px", width: "100%" }}>
        <Charts
          title={"Bieu do PPFD"}
          labels={labels}
          naturals={naturals}
          afterSLs={afterSLs}
        />
      </Box>
    </Stack>
  );
};

export default SingleChart;
