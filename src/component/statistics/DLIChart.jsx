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
import { onlyTime } from "../../utils/formatDate";
import { memo } from "react";
import ControlChart from "./ControlChart";
import { defaultNumOfPoint } from "../../config/app";

const DLIChart = memo(({ dlis, refetch }) => {
  const numberOfData = dlis?.ids?.length;

  const [page, setPage] = useState(0);
  const [period, setPeriod] = useState(defaultNumOfPoint);

  const startI = page * period;
  const chunk = dlis?.ids?.slice(startI, startI + period);

  const labels = chunk?.map((id) => {
    const record = dlis?.entities[id];
    return onlyTime(record.createdAt);
  });

  const naturals = chunk?.map((id) => {
    const record = dlis?.entities[id];
    return record.oldDli;
  });

  const afterSLs = chunk?.map((id) => {
    const record = dlis?.entities[id];
    return record.newDli;
  });

  return (
    <ControlChart
      numberOfData={numberOfData}
      page={page}
      setPage={setPage}
      period={period}
      setPeriod={setPeriod}
      labels={labels}
      naturals={naturals}
      afterSLs={afterSLs}
      refetch={refetch}
    />
  );
});

export default DLIChart;
