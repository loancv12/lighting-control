import React, { useContext, useEffect, useState } from "react";
import Charts from "./Charts";
import { onlyDate, onlyTime } from "../../utils/formatDate";
import { memo } from "react";
import ControlChart from "./ControlChart";
import { defaultNumOfPoint } from "../../config/app";
import { exportExcel } from "../../utils/exportExcel";
import { SnackbarContext } from "../../context/SnackbarProvider";

const DLIChart = memo(({ dlis, refetch }) => {
  const numberOfData = dlis?.ids?.length;
  const { handleOpenSnackbar } = useContext(SnackbarContext);

  const [page, setPage] = useState(0);
  const [period, setPeriod] = useState(defaultNumOfPoint);

  const startI = page * period;
  const chunk = dlis?.ids?.slice(startI, startI + period);

  const labels = chunk?.map((id) => {
    const record = dlis?.entities[id];
    return onlyDate(record.createdAt);
  });

  const naturals = chunk?.map((id) => {
    const record = dlis?.entities[id];
    return record.oldDli;
  });

  const afterSLs = chunk?.map((id) => {
    const record = dlis?.entities[id];
    return record.newDli;
  });

  const exportDataToExcel = () => {
    if (labels.length === 0) {
      handleOpenSnackbar({
        message: "Không có dữ liệu trong thời gian được chọn",
      });
    } else {
      const transformData = dlis.ids.map((id) => {
        const { oldDli, newDli, createdAt } = dlis.entities[id];
        return {
          "Thời gian": createdAt,
          "DLI tự nhiên": oldDli,
          "DLI sau khi bổ sung": newDli,
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
      type="DLI"
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

export default DLIChart;
