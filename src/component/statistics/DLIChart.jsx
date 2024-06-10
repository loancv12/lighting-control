import { Box, IconButton, Stack } from "@mui/material";
import { ArrowClockwise } from "phosphor-react";
import Charts from "./Charts";
import { onlyDate } from "../../utils/formatDate";

const DLIChart = ({ dlis, refetch }) => {
  const labels = dlis?.ids?.map((id) => {
    const record = dlis?.entities[id];
    return onlyDate(record.createdAt);
  });

  const naturals = dlis?.ids?.map((id) => {
    const record = dlis?.entities[id];
    return record.oldDli;
  });

  const afterSLs = dlis?.ids?.map((id) => {
    const record = dlis?.entities[id];
    return record.newDli;
  });

  const handleRefetch = () => {
    refetch();
  };
  return (
    <Stack direction="row">
      <Stack justifyContent={"center"}>
        <IconButton onClick={handleRefetch}>
          <ArrowClockwise size={32} />
        </IconButton>
      </Stack>
      <Box sx={{ height: "300px", width: "100%" }}>
        <Charts
          type={"DLI"}
          labels={labels}
          naturals={naturals}
          afterSLs={afterSLs}
        />
      </Box>
    </Stack>
  );
};

export default DLIChart;
