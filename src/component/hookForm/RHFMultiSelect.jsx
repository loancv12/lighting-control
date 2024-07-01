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
import { useState } from "react";
RHFMultiSelect.prototype = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFMultiSelect({
  name,
  label,
  options,
  helperText,
  ...other
}) {
  const { control } = useFormContext();
  const [values, setValues] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setValues(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <Controller
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl sx={{ maxWidth: "100%", m: 1 }} error={!!error}>
            <InputLabel id={`label-${label}`}>{label}</InputLabel>
            <Select
              id={`select-${label}`}
              fullWidth
              multiple
              labelId={`label-${label}`}
              input={<OutlinedInput label={label} />}
              value={values}
              onChange={handleChange}
              {...field}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.title}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {error ? error.message : helperText}
            </FormHelperText>
          </FormControl>
        );
      }}
      name={name}
      control={control}
    ></Controller>
  );
}
