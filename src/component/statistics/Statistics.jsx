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
import { getDateNow, getDateNowAnd15Ago } from "../../utils/formatDate";

const Statistics = () => {
  const [selectDates, setSelectDates] = useState(getDateNowAnd15Ago);
  const [selectDate, setSelectDate] = useState(getDateNow);

  const {
    data: ppfds,
    isLoading: isLdPpfd,
    isError: isErrorPpfd,
    refetch: refetchPpfd,
  } = useGetPpfdsQuery(selectDate, {
    pollingInterval: 15 * 60 * 1000, //15m
  });

  const {
    data: dlis,
    isLoading: isLdDli,
    isError: isErrorDli,
    refetch: refetchDli,
  } = useGetDlisQuery(selectDates);

  const onSubmitPpfd = (data) => {
    setSelectDate(data.selectDate.toISOString());
  };

  const onSubmitDli = (data) => {
    setSelectDates({
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
    });
  };

  let content;
  if (isLdPpfd || isLdDli) {
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
