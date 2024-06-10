import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import RHFTextField from "../hookForm/RHFTextField";
import RHFSelect from "../hookForm/RHFSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import RHFDate from "../hookForm/RHFDate";
import { useForm } from "react-hook-form";
import FormProvider from "../hookForm/FormProvider";
import { SocketContext } from "../../context/SocketProvider";
import { useGetConfigQuery } from "../../redux/config/configApiSlice";
import LoadingScreen from "../LoadingScreen";

const Control = () => {
  const now = new Date();
  const defaultConfig = {
    startLightingDate: now,
    endLightingDate: now,
    mode: "early-morning",
    dliTarget: 22,
    ppfdLamp: 300,
    saturatedPpfd: 500,
  };
  const {
    data: config = defaultConfig,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetConfigQuery();
  console.log("error", error);
  const socket = useContext(SocketContext);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const ControlLightSchema = Yup.object({
    startLightingDate: Yup.date()
      .required("Giá trị cho ngày bắt đầu việc chiếu sáng bổ sung là bắt buộc")
      .min(today, "Ngày bắt đầu chiếu phải từ ngày hiện tại trở đi"),
    endLightingDate: Yup.date()
      .required("Giá trị cho ngày bắt đầu việc chiếu sáng bổ sung là bắt buộc")
      .min(
        Yup.ref("startLightingDate"),
        "Ngày kết thúc chiếu phải sau ngày bắt đầu chiếu"
      ),
    mode: Yup.string()
      .oneOf(["early-morning", "evening"])
      .required("Giá trị mode là bắt buộc"),
    dliTarget: Yup.number(
      "giá trị cần điền là một số thực hoặc số nguyên dương"
    )
      .typeError("Giá trị cần điền là một số thực hoặc số nguyên dương")
      .required("Giá trị DLI là bắt buộc")
      .positive("Giá trị cần điền là một số dương"),
    ppfdLamp: Yup.number("Giá trị cần điền là một số thực hoặc số nguyên dương")
      .typeError("Giá trị cần điền là một số thực hoặc số nguyên dương")
      .positive("Giá trị cần điền là một số dương")
      .required("Giá trị PPFD của đèn là bắt buộc"),
    saturatedPpfd: Yup.number(
      "Giá trị cần điền là một số thực hoặc số nguyên dương"
    )
      .typeError("Giá trị cần điền là một số thực hoặc số nguyên dương")
      .positive("Giá trị cần điền là một số dương")
      .required(
        "Lượng ánh sáng bão hòa của cây cà chua là bắt buộc (giá trị dạng PPFD)"
      ),
  });

  const {
    startLightingDate,
    endLightingDate,
    mode,
    dliTarget,
    ppfdLamp,
    saturatedPpfd,
  } = config;
  const defaultValues = {
    startLightingDate,
    endLightingDate,
    mode,
    dliTarget,
    ppfdLamp,
    saturatedPpfd,
  };

  const modeOptions = [
    {
      title: "Chiếu trước quang chu kì tự nhiên, từ 3 giờ đến 18 giờ",
      value: "early-morning",
    },
    {
      title: "Chiếu sau quang chu kì tự nhiên, từ 6 giờ đến 21 giờ",
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

  console.log(errors);
  const onSubmit = (data) => {
    console.log("submit", data);
    socket.emit("change-config", data, () => {
      refetch();
    });
  };

  let content;
  if (isLoading) {
    content = <LoadingScreen />;
  } else if (isError) {
    content = (
      <Typography variant="body2">There are some thing wrong</Typography>
    );
  } else {
    content = (
      <FormProvider
        methods={methods}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          width={"100%"}
          spacing={{ xs: 2, md: 8 }}
        >
          <RHFDate
            name="startLightingDate"
            label={"Ngày bắt đầu chiếu bổ sung"}
          />
          <RHFDate
            name="endLightingDate"
            label={"Ngày kết thúc chiếu bổ dung"}
          />
        </Stack>
        <RHFTextField name="dliTarget" label="DLI tối ưu" />
        <RHFTextField name="ppfdLamp" label="PPFD của đèn" />
        <RHFTextField name="saturatedPpfd" label="PPFD bão hòa" />
        <RHFSelect name="mode" options={modeOptions} label="Mode" />

        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
        >
          Gửi
        </Button>
      </FormProvider>
    );
  }

  return content;
};

export default Control;
