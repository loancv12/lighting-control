import React from "react";
import RHFDate from "../hookForm/RHFDate";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormProvider from "../hookForm/FormProvider";
import { useForm } from "react-hook-form";
import { IconButton, Stack, Typography } from "@mui/material";
import { PaperPlane, PaperPlaneRight } from "phosphor-react";
import { sub } from "date-fns";

const SelectDates = ({ onSubmit }) => {
  const today = new Date();
  const date15DaysAgo = sub(today, {
    days: 15,
  });

  const defaultValues = {
    startDate: date15DaysAgo,
    endDate: today,
  };
  const dateSchema = Yup.object({
    startDate: Yup.date()
      .required("Giá trị là bắt buộc")
      .max(today, "Ngày phải từ hiện tại đổ về trước"),
    endDate: Yup.date()
      .required("Giá trị là bắt buộc")
      .min(Yup.ref("startDate"), "Ngày phải lớn hơn ngày bắt đầu")
      .max(today, "Ngày phải từ hiện tại đổ về trước"),
  });

  const methods = useForm({
    resolver: yupResolver(dateSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  return (
    <FormProvider
      methods={methods}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack
        direction={"row"}
        spacing={2}
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        <Typography variant="body2">DLI</Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
          <RHFDate name="startDate" label={"Từ ngày"} />
          <RHFDate name="endDate" label={"đến"} />
        </Stack>

        <IconButton type="submit">
          <PaperPlaneRight size={24} />
        </IconButton>
      </Stack>
    </FormProvider>
  );
};

export default SelectDates;
