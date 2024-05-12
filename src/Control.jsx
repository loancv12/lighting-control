import { Button, Paper, TextField } from "@mui/material";
import React from "react";
import RHFTextField from "./RHFTextField";
import RHFSelect from "./RHFSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import RHFDate from "./RHFDate";
import { useForm } from "react-hook-form";
import FormProvider from "./FormProvider";

const Control = () => {
  const now = new Date();

  const ControlLightSchema = Yup.object({
    startLightingDate: Yup.date("Giá trị ")
      .required("Giá trị cho ngày bắt đầu việc chiếu sáng bổ sung là bắt buộc")
      .min(now, "Ngày bắt đầu chiếu phải từ ngày hiện tại trở đi"),
    endLightingDate: Yup.date()
      .required("Giá trị cho ngày bắt đầu việc chiếu sáng bổ sung là bắt buộc")
      .min(
        Yup.ref("startLightingDate"),
        "Ngày kết thúc chiếu phải sau ngày bắt đầu chiếu"
      ),
    mode: Yup.string()
      .oneOf(["early-morning", "evening"])
      .required("Giá trị mode là bắt buộc"),
    dliTarget: Yup.number("giá trị cần điền là 1 số thực hoặc số nguyên dương")
      .typeError("Giá trị cần điền là 1 số thực hoặc số nguyên dương")
      .required("Giá trị DLI là bắt buộc")
      .positive("giá trị cần điền là 1 số dương"),
    ppfdLamp: Yup.number("Giá trị cần điền là 1 số thực hoặc số nguyên dương")
      .typeError("Giá trị cần điền là 1 số thực hoặc số nguyên dương")
      .positive("giá trị cần điền là 1 số dương")
      .required("Giá trị PPFD của đèn là bắt buộc"),
    ppfdMax: Yup.number("Giá trị cần điền là 1 số thực hoặc số nguyên dương")
      .typeError("Giá trị cần điền là 1 số thực hoặc số nguyên dương")
      .positive("giá trị cần điền là 1 số dương")
      .required(
        "Lượng ánh sáng bão hòa của cây cà chua là bắt buộc (giá trị dạng PPFD)"
      ),
  });
  const defaultValues = {
    startLightingDate: new Date(),
    endLightingDate: new Date(),
    mode: "early-morning",
    dliTarget: 22,
    ppfdLamp: 300,
    ppfdMax: 300,
  };

  const modeOptions = [
    {
      title: "Early morning, from 3h to 18h",
      value: "early-morning",
    },
    {
      title: "Evening, from 6h to 21h",
      value: "evening",
    },
  ];

  const methods = useForm({
    resolver: yupResolver(ControlLightSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = (data) => console.log(data);
  return (
    <FormProvider
      methods={methods}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <RHFDate name="startLightingDate" label={"Date to start lighting"} />
      <RHFDate name="endLightingDate" label={"Date to end lighting"} />
      <RHFTextField name="dliTarget" label="DLI target" />
      <RHFTextField name="ppfdLamp" label="PPFD of lamp" />
      <RHFTextField name="ppfdMax" label="PPFD of saturated light" />
      <RHFSelect name="mode" options={modeOptions} label="Mode" />
      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
      >
        Submit
      </Button>
    </FormProvider>
  );
};

export default Control;
