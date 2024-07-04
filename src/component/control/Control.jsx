import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import RHFTextField from "../hookForm/RHFTextField";
import RHFSelect from "../hookForm/RHFSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import RHFDate from "../hookForm/RHFDate";
import { useForm } from "react-hook-form";
import FormProvider from "../hookForm/FormProvider";
import {
  useGetConfigQuery,
  useUpdateConfigMutation,
} from "../../redux/config/configApiSlice";
import LoadingScreen from "../LoadingScreen";
import { selectAreaId } from "../../redux/area/areaSlice";
import { useSelector } from "react-redux";
import { SnackbarContext } from "../../context/SnackbarProvider";

const Control = () => {
  const selectedAreaId = useSelector(selectAreaId);

  const { handleOpenSnackbar } = useContext(SnackbarContext);

  const now = new Date();
  const {
    data: defaultConfig,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetConfigQuery({ areaId: selectedAreaId });

  const ControlLightSchema = Yup.object({
    startLightingDate: Yup.date().required(
      "Giá trị cho ngày bắt đầu việc chiếu sáng bổ sung là bắt buộc"
    ),
    endLightingDate: Yup.date()
      .required("Giá trị cho ngày bắt đầu việc chiếu sáng bổ sung là bắt buộc")
      .min(
        Yup.ref("startLightingDate"),
        "Ngày kết thúc chiếu phải sau ngày bắt đầu chiếu"
      ),
    mode: Yup.string()
      .oneOf(["early-morning", "evening"])
      .required("Giá trị mode là bắt buộc"),
    dliTarget: Yup.number("giá trị cần điền là số nguyên dương")
      .typeError("Giá trị cần điền là số nguyên dương")
      .required("Giá trị DLI là bắt buộc")
      .positive("Giá trị cần điền là một số dương"),
    ppfdLamp: Yup.number("Giá trị cần điền là số nguyên dương")
      .typeError("Giá trị cần điền là số nguyên dương")
      .positive("Giá trị cần điền là một số dương")
      .required("Giá trị PPFD của đèn là bắt buộc"),
    saturatedPpfd: Yup.number("Giá trị cần điền là số nguyên dương")
      .typeError("Giá trị cần điền là số nguyên dương")
      .positive("Giá trị cần điền là một số dương")
      .required(
        "Lượng ánh sáng bão hòa của cây cà chua là bắt buộc (giá trị dạng PPFD)"
      ),
  });

  const defaultValues = {
    startLightingDate: now,
    endLightingDate: now,
    mode: "early-morning",
    dliTarget: 22,
    ppfdLamp: 300,
    saturatedPpfd: 500,
  };

  const modeOptions = [
    {
      title: "3AM - 6PM",
      value: "early-morning",
    },
    {
      title: "6AM - 9PM",
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

  const [
    updateConfig, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useUpdateConfigMutation();

  const onSubmit = async (data) => {
    try {
      const res = await updateConfig({
        configId: defaultConfig.id,
        ...data,
      }).unwrap();
      handleOpenSnackbar({ message: res.message });
    } catch (error) {
      console.log(error);
      setError("afterSubmit", {
        message: error?.data?.message ?? "Something wrong",
      });
    }
  };

  useEffect(() => {
    if (defaultConfig) {
      const {
        startLightingDate,
        endLightingDate,
        mode,
        dliTarget,
        ppfdLamp,
        saturatedPpfd,
      } = defaultConfig;
      reset({
        startLightingDate,
        endLightingDate,
        mode,
        dliTarget,
        ppfdLamp,
        saturatedPpfd,
      });
    }
  }, [defaultConfig, reset]);

  let content;
  if (isLoading) {
    content = <LoadingScreen />;
  } else if (isError) {
    content = (
      <Typography variant="body2">There are some thing wrong</Typography>
    );
  } else {
    content = (
      <Stack spacing={2}>
        {isLoading || isUpdating ? <LoadingScreen /> : null}
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <FormProvider
          methods={methods}
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={2}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              width={"100%"}
              spacing={{ xs: 2, md: 8 }}
            >
              <RHFDate
                name="startLightingDate"
                label={"Ngày bắt đầu chiếu bổ sung"}
              />
              <Divider orientation="vertical" flexItem />
              <RHFDate
                name="endLightingDate"
                label={"Ngày kết thúc chiếu bổ sung"}
              />
            </Stack>
            <RHFTextField name="dliTarget" label="DLI tối ưu (mol/d)" />
            <RHFTextField
              name="ppfdLamp"
              label="Cường độ ánh sáng của đèn (µmol/m²/s)"
            />
            <RHFTextField
              name="saturatedPpfd"
              label="Điểm bão hòa ánh sáng (lux)"
            />
            <RHFSelect
              name="mode"
              options={modeOptions}
              label="Khung giờ chiếu"
            />

            <Button
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
            >
              Gửi
            </Button>
          </Stack>
        </FormProvider>
      </Stack>
    );
  }

  return content;
};

export default Control;
