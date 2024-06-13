import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import {
  ArrowCircleDown,
  ArrowCircleLeft,
  ArrowCircleRight,
  ArrowCircleUp,
  ArrowClockwise,
} from "phosphor-react";
import React, { useEffect, useState } from "react";
import Charts from "./Charts";
import { defaultNumOfPoint } from "../../config/app";

const ControlChart = ({
  page,
  setPage,
  period,
  setPeriod,
  numberOfData,
  labels,
  naturals,
  afterSLs,
  refetch,
}) => {
  const canNextPeriod = period < numberOfData;
  const canPrevPeriod = period > 1;
  // a page contain period point
  const canNextPage = Math.ceil(numberOfData / period) > page + 1; //page start with 0
  const canPrevPage = page > 0;

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
    setPeriod((prevPeriod) => prevPeriod + 1);
  };

  const handlePrevPeriod = () => {
    setPeriod((prevPeriod) => prevPeriod - 1);
  };

  useEffect(() => {
    if (numberOfData < defaultNumOfPoint) {
      setPeriod(numberOfData);
    } else {
      setPeriod(defaultNumOfPoint);
    }
  }, [numberOfData]);

  return (
    <Stack direction="row">
      <Stack justifyContent={"center"}>
        <IconButton onClick={handleRefetch}>
          <ArrowClockwise size={32} />
        </IconButton>

        <IconButton onClick={handlePrevPage} disabled={!canPrevPage}>
          <ArrowCircleLeft size={32} />
        </IconButton>
        <IconButton onClick={handleNextPage} disabled={!canNextPage}>
          <ArrowCircleRight size={32} />
        </IconButton>

        <Tooltip title="Tăng độ rộng thời gian" placement="left">
          <span>
            <IconButton onClick={handleNextPeriod} disabled={!canNextPeriod}>
              <ArrowCircleUp size={32} />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Giảm độ rộng thời gian" placement="left">
          <span>
            <IconButton onClick={handlePrevPeriod} disabled={!canPrevPeriod}>
              <ArrowCircleDown size={32} />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
      <Box sx={{ height: "300px", width: "100%" }}>
        <Charts
          type={"PPFD"}
          labels={labels}
          naturals={naturals}
          afterSLs={afterSLs}
        />
      </Box>
    </Stack>
  );
};

export default ControlChart;
