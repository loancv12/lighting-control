import PropTypes from "prop-types";

// Form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
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
  const { control } = useFormContext();
  return (
    <Controller
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl sx={{ width: "100%", m: 1 }}>
            <InputLabel id={`label-${label}`}>{label}</InputLabel>
            <Select
              id={`select-${label}`}
              fullWidth
              labelId={`label-${label}`}
              input={<OutlinedInput label={label} />}
              {...field}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.title}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{error}</FormHelperText>
          </FormControl>
        );
      }}
      name={name}
      control={control}
    ></Controller>
  );
}
