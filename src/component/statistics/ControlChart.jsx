import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import {
  ArrowCircleDown,
  ArrowCircleLeft,
  ArrowCircleRight,
  ArrowCircleUp,
  ArrowClockwise,
  DownloadSimple,
} from "phosphor-react";
import React, { useContext, useEffect, useState } from "react";
import Charts from "./Charts";
import { defaultNumOfPoint } from "../../config/app";
import { exportExcel } from "../../utils/exportExcel";
import { SnackbarContext } from "../../context/SnackbarProvider";

const ControlChart = ({
  type,
  page,
  setPage,
  period,
  setPeriod,
  numberOfData,
  labels,
  naturals,
  afterSLs,
  refetch,
  exportDataToExcel,
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

  const handleDownload = () => {
    exportDataToExcel();
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
      <Box sx={{ height: "300px", width: "calc(100% - 48px)" }}>
        <Charts
          type={type}
          labels={labels}
          naturals={naturals}
          afterSLs={afterSLs}
        />
      </Box>
      <Stack justifyContent={"center"}>
        <IconButton onClick={handleRefetch}>
          <ArrowClockwise size={20} />
        </IconButton>

        <IconButton onClick={handlePrevPage} disabled={!canPrevPage}>
          <ArrowCircleLeft size={20} />
        </IconButton>
        <IconButton onClick={handleNextPage} disabled={!canNextPage}>
          <ArrowCircleRight size={20} />
        </IconButton>

        {/* <Tooltip title="Tăng độ rộng thời gian" placement="left">
          <span>
            <IconButton onClick={handleNextPeriod} disabled={!canNextPeriod}>
              <ArrowCircleUp size={20} />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Giảm độ rộng thời gian" placement="left">
          <span>
            <IconButton onClick={handlePrevPeriod} disabled={!canPrevPeriod}>
              <ArrowCircleDown size={20} />
            </IconButton>
          </span>
        </Tooltip> */}
        <IconButton onClick={handleDownload}>
          <DownloadSimple size={20} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ControlChart;
