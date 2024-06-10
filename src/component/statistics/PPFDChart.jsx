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
import { onlyTime } from "../../utils/formatDate";

const PPFDChart = ({ ppfds, refetch }) => {
  const [page, setPage] = useState(0);
  const [period, setPeriod] = useState(16);

  const startI = page * period;
  const chunk = ppfds?.ids?.slice(startI, startI + period);
  const numberOfData = ppfds?.ids?.length;

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
          type={"PPFD"}
          labels={labels}
          naturals={naturals}
          afterSLs={afterSLs}
        />
      </Box>
    </Stack>
  );
};

export default PPFDChart;
