import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useGetPpfdsQuery } from "../../redux/ppfd/ppfdApiSlice";
import LoadingScreen from "../LoadingScreen";
import { formatDate } from "../../utils/formatDate";

import SingleChart from "./SingleChart";
import SelectDate from "./SelectDate";
import SelectDates from "./SelectDates";

export const maxPeriod = 24; // 24 point in a day in ppfd chart
export const datePeriod = 4; // 4 day in dli chart
const Statistics = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = today.toISOString();

  const [selectDate, setSelectDate] = useState(date);
  const [selectDates, setSelectDates] = useState({
    startDate: "",
    endDate: date,
  });
  const [page, setPage] = useState(0);
  const [period, setPeriod] = useState(16);
  const {
    data: ppfds,
    isLoading,
    isError,
    refetch,
    error,
  } = useGetPpfdsQuery(selectDate);

  const startI = page * period;
  const chunk = ppfds?.ids?.slice(startI, startI + period);
  const numberOfData = ppfds?.ids?.length;

  const labels = chunk?.map((id) => {
    const record = ppfds?.entities[id];
    return formatDate(record.createdAt);
  });

  const naturalPpfds = chunk?.map((id) => {
    const record = ppfds?.entities[id];
    return record.oldPpfd;
  });

  const slPpfds = chunk?.map((id) => {
    const record = ppfds?.entities[id];
    return record.newPpfd;
  });

  const onSubmit = (data) => {
    console.log(data);
    setSelectDate(data.selectDate.toISOString());
  };

  const onSubmitDli = (data) => {
    console.log(data);
  };

  let content;
  if (isLoading) {
    content = <LoadingScreen />;
  } else if (isError) {
    content = <Typography variant="body2">Some thing wrong.</Typography>;
  } else {
    content = (
      <>
        <Stack spacing={2}>
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <SelectDate onSubmit={onSubmit} />
            <SelectDates onSubmit={onSubmitDli} />
          </Stack>
          <SingleChart
            labels={labels}
            naturals={naturalPpfds}
            afterSLs={slPpfds}
            refetch={refetch}
            setPage={setPage}
            setPeriod={setPeriod}
            numberOfData={numberOfData}
          />
          <SingleChart
            labels={labels}
            naturals={naturalPpfds}
            afterSLs={slPpfds}
            refetch={refetch}
            setPage={setPage}
            setPeriod={setPeriod}
            numberOfData={numberOfData}
          />
        </Stack>
      </>
    );
  }
  return content;
};

export default Statistics;
