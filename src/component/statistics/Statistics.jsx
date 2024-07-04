import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Divider,
  Typography,
} from "@mui/material";
import LoadingScreen from "../LoadingScreen";
import SelectDate from "./SelectDate";
import SelectDates from "./SelectDates";
import { getDateNow, getDateNowAnd15Ago } from "../../utils/formatDate";
import RecordProcessChart from "./RecordProcessChart";
import { selectAreaId } from "../../redux/area/areaSlice";
import { useSelector } from "react-redux";
import {
  useGetRecordsInDayQuery,
  useGetRecordsInPeriodQuery,
} from "../../redux/sensorRecord/sensorRecSliceApi";

const Statistics = () => {
  const selectedAreaId = useSelector(selectAreaId);

  const [selectDates, setSelectDates] = useState(getDateNowAnd15Ago);
  const [selectDate, setSelectDate] = useState(getDateNow);

  const paramPpfds = {
    areaId: selectedAreaId,
    typeOfParameter: "ppfd",
    selectDate,
  };
  const {
    data: ppfds,
    isLoading: isLdPpfd,
    isError: isErrorPpfd,
    refetch: refetchPpfd,
  } = useGetRecordsInDayQuery(paramPpfds, {
    pollingInterval: 15 * 60 * 1000, //15m

    // skip: true,
  });

  const paramDlis = {
    areaId: selectedAreaId,
    typeOfParameter: "dli",
    ...selectDates,
  };
  const {
    data: dlis,
    isLoading: isLdDli,
    isError: isErrorDli,
    refetch: refetchDli,
  } = useGetRecordsInPeriodQuery(paramDlis);

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
        <Stack spacing={2}>
          <SelectDate onSubmit={onSubmitPpfd} />
          <RecordProcessChart
            type={"PPFD"}
            records={ppfds}
            refetch={refetchPpfd}
          />
          <Divider sx={{ borderColor: "red", mb: "16px" }} />
          <SelectDates onSubmit={onSubmitDli} />
          <RecordProcessChart
            type={"DLI"}
            records={dlis}
            refetch={refetchDli}
          />
        </Stack>
      </>
    );
  }
  return content;
};

export default Statistics;
