import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { vi } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useFormContext, Controller } from "react-hook-form";
import { Stack, Typography } from "@mui/material";
import { format } from "date-fns";

registerLocale("vi", vi);
// Form

export default function RHFTime({ name, label, helperText, ...other }) {
  const { control } = useFormContext();

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
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
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
