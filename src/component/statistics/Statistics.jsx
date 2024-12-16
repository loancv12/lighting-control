import { Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAreaId } from "../../redux/area/areaSlice";
import {
  useGetRecordsInDayQuery,
  useGetRecordsInPeriodQuery,
} from "../../redux/sensorRecord/sensorRecSliceApi";
import {
  getDateNow,
  getDateNowAnd15Ago,
  makeLowerRangeAndToISO,
  makeUpperRangeAndToISO,
} from "../../utils/formatDate";
import LoadingScreen from "../LoadingScreen";
import RecordProcessChart from "./RecordProcessChart";
import SelectDate from "./SelectDate";
import SelectDates from "./SelectDates";

const Statistics = () => {
  const selectedAreaId = useSelector(selectAreaId);

  const [selectInPeriod, setSelectInPeriod] = useState(getDateNowAnd15Ago);
  const [selectInDay, setSelectInDay] = useState(getDateNow);

  const paramPpfds = {
    areaId: selectedAreaId,
    typeOfParameter: "ppfd",
    ...selectInDay,
  };
  const {
    data: ppfds = [],

    isFetching: isLdPpfd,
    isError: isErrorPpfd,
    refetch: refetchPpfd,
  } = useGetRecordsInDayQuery(paramPpfds, {
    pollingInterval: 15 * 60 * 1000, //15m
  });

  const paramDlis = {
    areaId: selectedAreaId,
    typeOfParameter: "dli",
    ...selectInPeriod,
  };
  const {
    data: dlis = [],
    isFetching: isLdDli,
    isError: isErrorDli,
    refetch: refetchDli,
  } = useGetRecordsInPeriodQuery(paramDlis);

  const onSubmitPpfd = (data) => {
    console.log(data);
    setSelectInDay({
      startOfDay: makeLowerRangeAndToISO(data.selectDate),
      endOfDay: makeUpperRangeAndToISO(data.selectDate),
    });
  };

  const onSubmitDli = (data) => {
    setSelectInPeriod({
      startDate: makeLowerRangeAndToISO(data.startDate),
      endDate: makeUpperRangeAndToISO(data.endDate),
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
