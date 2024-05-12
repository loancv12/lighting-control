import PropTypes from "prop-types";

// Form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
RHFSelect.prototype = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFSelect({
  name,
  label,
  options,
  helperText,
  ...other
}) {
  console.log(label);
  const { control } = useFormContext();
  return (
    <Controller
      render={({ field, fieldState: { error } }) => {
        console.log(error);
        return (
          <TextField
            id="outlined-select-currency"
            select
            fullWidth
            label={label}
            {...field}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
          // <Stack
          //   direction={"row"}
          //   spacing={1}
          //   alignItems={"center"}
          //   justifyContent={"flex-start"}
          // >
          //   <InputLabel id="demo-simple-select-helper-label">Mode</InputLabel>
          //   <Select
          //     labelId="demo-simple-select-helper-label"
          //     id="demo-simple-select-helper"
          //     label="Mode"
          //     {...field}
          //   >
          //     {options.map((el, i) => (
          //       <MenuItem key={i} value={el.value}>
          //         {el.title}
          //       </MenuItem>
          //     ))}
          //   </Select>
          //   {/* <FormHelperText>{helperText}</FormHelperText> */}
          // </Stack>
        );
      }}
      name={name}
      control={control}
    ></Controller>
  );
}
