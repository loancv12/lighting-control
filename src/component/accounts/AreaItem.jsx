import { Grid, IconButton, Stack, Tooltip } from "@mui/material";
import React from "react";
import RHFTextField from "../hookForm/RHFTextField";
import { Gear, MinusCircle } from "phosphor-react";
import RHFMultiSelect from "../hookForm/RHFMultiSelect";
import { SENSORS } from "../../config/sensors";

export default function AreaItem({ field, index, name, control, remove }) {
  const sensorOptions = Object.keys(SENSORS).map((key) => {
    return {
      title: key,
      value: SENSORS[key],
    };
  });
  return (
    <Grid item xs={6} md={4} sx={{ position: "relative" }}>
      <Stack spacing={1}>
        <RHFTextField name={`areas.${index}.name`} label="Tên khu vực" />
        <RHFMultiSelect
          multiple={true}
          name={`areas.${index}.sensors`}
          options={sensorOptions}
          label="Cảm biến"
        />
        <IconButton
          sx={{ position: "absolute", top: "-2px", right: "-10px" }}
          onClick={() => remove(index)}
        >
          <MinusCircle size={20} />
        </IconButton>
      </Stack>
    </Grid>
  );
}
