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

  return (
    <Controller
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <Stack spacing={1} width="100%">
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            justifyContent={"space-between"}
            width="100%"
            sx={{
              // zIndex: 2,
              "& .react-datepicker__input-container input": {
                padding: { xs: "13.5px 8px", md: "16.5px 14px" },
                fontSize: "1rem",
                outline: "transparent",
                width: { xs: "150px", md: "auto" },
              },

              "& .react-datepicker-popper": {
                zIndex: 2,
              },

              "& .react-datepicker__tab-loop": {
                marginLeft: 0,
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
