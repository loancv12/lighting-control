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
import { onlyTime, onlyDate } from "../../utils/formatDate";
import { memo } from "react";
import ControlChart from "./ControlChart";
import { defaultNumOfPoint } from "../../config/app";
import { exportExcel } from "../../utils/exportExcel";
import { SnackbarContext } from "../../context/SnackbarProvider";

const RecordProcessChart = memo(({ type, records, refetch }) => {
  const { handleOpenSnackbar } = useContext(SnackbarContext);

  const numberOfData = records?.ids?.length;

  const [page, setPage] = useState(0);
  const [period, setPeriod] = useState(defaultNumOfPoint);

  const startI = page * period;
  const chunk = records?.ids?.slice(startI, startI + period);

  const labels = chunk?.map((id) => {
    const record = records?.entities[id];
    return type === "PPFD"
      ? onlyTime(record.createdAt)
      : onlyDate(record.createdAt);
  });

  const naturals = chunk?.map((id) => {
    const record = records?.entities[id];
    return record.oldRecord;
  });

  const afterSLs = chunk?.map((id) => {
    const record = records?.entities[id];
    return record.newRecord;
  });

  const exportDataToExcel = () => {
    if (labels.length === 0) {
      handleOpenSnackbar({
        message: "Không có dữ liệu trong thời gian được chọn",
      });
    } else {
      const transformData = records.ids.map((id) => {
        const { oldRecord, newRecord, createdAt } = records.entities[id];
        const time = new Date(createdAt);
        const timeVN = time.toLocaleTimeString("VN-vi");
        return {
          "Thời gian": timeVN,
          [`${type} tự nhiên`]: oldRecord,
          [`${type} sau khi bổ sung`]: newRecord,
        };
      });
      exportExcel(
        `${type}-${labels[0]}-${labels[labels.length - 1]}`,
        transformData
      );
    }
  };

  useEffect(() => {
    setPage(0);
  }, [records]);

  return (
    <ControlChart
      {...{
        type,
        numberOfData,
        page,
        setPage,
        period,
        setPeriod,
        labels,
        naturals,
        afterSLs,
        refetch,
        exportDataToExcel,
      }}
    />
  );
});

export default RecordProcessChart;
