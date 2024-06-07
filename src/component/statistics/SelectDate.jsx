import React from "react";
import RHFDate from "../hookForm/RHFDate";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormProvider from "../hookForm/FormProvider";
import { useForm } from "react-hook-form";
import { IconButton, Stack } from "@mui/material";
import { PaperPlane, PaperPlaneRight } from "phosphor-react";

const SelectDate = ({ onSubmit }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const now = new Date();

  const defaultValues = {
    selectDate: today,
  };
  const dateSchema = Yup.object({
    selectDate: Yup.date()
      .required("Giá trị là bắt buộc")
      .max(now, "Ngày phải từ hiện tại đổ về trước"),
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
        <RHFDate name="selectDate" label={"Biểu đồ PPFD"} />
        <IconButton type="submit">
          <PaperPlaneRight size={24} />
        </IconButton>
      </Stack>
    </FormProvider>
  );
};

export default SelectDate;
