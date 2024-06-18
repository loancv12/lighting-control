import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import {
  ArrowCircleDown,
  ArrowCircleLeft,
  ArrowCircleRight,
  ArrowCircleUp,
  ArrowClockwise,
} from "phosphor-react";
import React, { useContext, useEffect, useState } from "react";
import Charts from "./Charts";
import { onlyTime } from "../../utils/formatDate";
import { memo } from "react";
import ControlChart from "./ControlChart";
import { defaultNumOfPoint } from "../../config/app";
import { exportExcel } from "../../utils/exportExcel";
import { SnackbarContext } from "../../context/SnackbarProvider";

const PPFDChart = memo(({ ppfds, refetch }) => {
  const { handleOpenSnackbar } = useContext(SnackbarContext);

  const numberOfData = ppfds?.ids?.length;

  const [page, setPage] = useState(0);
  const [period, setPeriod] = useState(defaultNumOfPoint);

  const startI = page * period;
  const chunk = ppfds?.ids?.slice(startI, startI + period);

  const labels = chunk?.map((id) => {
    const record = ppfds?.entities[id];
    return onlyTime(record.createdAt);
  });

  const naturals = chunk?.map((id) => {
    const record = ppfds?.entities[id];
    return record.oldPpfd;
  });

  const afterSLs = chunk?.map((id) => {
    const record = ppfds?.entities[id];
    return record.newPpfd;
  });

  const exportDataToExcel = () => {
    if (labels.length === 0) {
      handleOpenSnackbar({
        message: "Không có dữ liệu trong thời gian được chọn",
      });
    } else {
      const transformData = ppfds.ids.map((id) => {
        const { oldPpfd, newPpfd, createdAt } = ppfds.entities[id];
        return {
          "Thời gian": createdAt,
          "PPFD tự nhiên": oldPpfd,
          "PPFD sau khi bổ sung": newPpfd,
        };
      });
      exportExcel(
        `DLI-${labels[0]}-${labels[labels.length - 1]}`,
        transformData
      );
    }
  };

  return (
    <ControlChart
      type="PPFD"
      numberOfData={numberOfData}
      page={page}
      setPage={setPage}
      period={period}
      setPeriod={setPeriod}
      labels={labels}
      naturals={naturals}
      afterSLs={afterSLs}
      refetch={refetch}
      exportDataToExcel={exportDataToExcel}
    />
  );
});

export default PPFDChart;
