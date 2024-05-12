import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { vi } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useFormContext, Controller } from "react-hook-form";
import { Stack, Typography } from "@mui/material";
import { format } from "date-fns";

registerLocale("vi", vi);
// Form

export default function RHFDate({ name, label, helperText, ...other }) {
  const { control } = useFormContext();
  const handleChangeRaw = (date) => {
    console.log(date.currentTarget.value);
    date.currentTarget.value = format(this.props.input.value, "DD/MM/YYYY");
  };
  return (
    <Controller
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <Stack spacing={1}>
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            sx={{
              // zIndex: 2,
              "& .react-datepicker__input-container input": {
                padding: "16.5px 14px",
                fontSize: "1rem",
              },

              "& .react-datepicker-popper": {
                zIndex: 2,
              },
            }}
          >
            {" "}
            <Typography variant="subtitle2">{label}</Typography>
            <DatePicker
              locale="vi"
              onChange={onChange} // send value to hook form
              onBlur={onBlur} // notify when input is touched/blur
              selected={value}
              dateFormat="dd/MM/yyyy"
            />
          </Stack>
          {!!error ? (
            <Typography sx={{ color: "red" }} variant="subtitle">
              {error?.message}
            </Typography>
          ) : null}
        </Stack>
      )}
      name={name}
      control={control}
    ></Controller>
  );
}
