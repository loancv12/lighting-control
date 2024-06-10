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
import PPFDChart from "./PPFDChart";
import SelectDate from "./SelectDate";
import SelectDates from "./SelectDates";
import { useGetDlisQuery } from "../../redux/dli/dliApiSlice";
import DLIChart from "./DLIChart";

export const maxPeriod = 24; // 24 point in a day in ppfd chart
export const datePeriod = 4; // 4 day in dli chart
const Statistics = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = today.toISOString();

  const [selectDates, setSelectDates] = useState({
    startDate: date,
    endDate: date,
  });
  const [selectDate, setSelectDate] = useState(date);

  const {
    data: ppfds,
    isLoading: isLdPpfd,
    isError: isErrorPpfd,
    refetch: refetchPpfd,
  } = useGetPpfdsQuery(selectDate, {
    pollingInterval: 15 * 60 * 1000, //15m
    refetchOnFocus: true,
  });

  const {
    data: dlis,
    isLoading: isLdDli,
    isError: isErrorDli,
    refetch: refetchDli,
  } = useGetDlisQuery(selectDates);
  console.log(dlis);

  const onSubmitPpfd = (data) => {
    console.log(data);
    setSelectDate(data.selectDate.toISOString());
  };

  const onSubmitDli = (data) => {
    setSelectDates({
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
    });
  };

  let content;
  if (isLdDli || isLdDli) {
    content = <LoadingScreen />;
  } else if (isErrorPpfd || isErrorDli) {
    content = <Typography variant="body2">Some thing wrong.</Typography>;
  } else {
    content = (
      <>
        <Stack spacing={1}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <SelectDate onSubmit={onSubmitPpfd} />
            <SelectDates onSubmit={onSubmitDli} />
          </Stack>
          <PPFDChart ppfds={ppfds} refetch={refetchPpfd} />
          <DLIChart dlis={dlis} refetch={refetchDli} />
        </Stack>
      </>
    );
  }
  return content;
};

export default Statistics;
