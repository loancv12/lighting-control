import React, { useContext } from "react";
import { SENSORS } from "../../config/sensors";
import { useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../hookForm/FormProvider";
import { useAddNewAreaMutation } from "../../redux/area/areaApiSlice";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { PlusCircle } from "phosphor-react";
import AreaItem from "./AreaItem";
import {
  findFirstDuplicateIndex,
  findSecondDuplicateIndex,
} from "../../utils/findSecondDup";
import LoadingScreen from "../LoadingScreen";
import { SnackbarContext } from "../../context/SnackbarProvider";

const AddAreaForm = ({ user, onClose }) => {
  const { handleOpenSnackbar } = useContext(SnackbarContext);

  const defaultValues = {
    userId: user.id,
    areas: [
      {
        name: "",
        sensors: Object.values(SENSORS),
      },
    ],
  };

  const [addNewArea, { isLoading }] = useAddNewAreaMutation();

  const areaSchema = Yup.object({
    name: Yup.string()
      .min(4, "Tên nhà màng phải có 4-14 kí tự")
      .max(14, "Tên nhà màng phải có 4-14 kí tự")
      .required("Tên nhà màng là trường bắt buộc"),
    sensors: Yup.array()
      .of(Yup.string().oneOf(Object.values(SENSORS)))
      .min(1, "Ban phải chọn ít nhất một loại sensor cho nhà màng"),
  });

  const schema = Yup.object({
    areas: Yup.array()
      .ensure()
      .of(areaSchema)
      .test({
        name: "unique",
        test: (value, context) => {
          const list = value;
          const nameList = list.map((a) => a.name.trim());
          const duplicateIndex = findFirstDuplicateIndex(
            nameList.concat(user.areas.map((area) => area.name))
          );
          // it can be duplicate with already exist area
          if (duplicateIndex !== -1)
            return context.createError({
              path: `areas.[${duplicateIndex}].name`,
              message: "Tên nhà màng không được trùng với những nhà màng đã có",
            });
          return true;
        },
      }),
  });

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "areas", // unique name for your Field Array
  });
  const onSubmit = async (data) => {
    try {
      await addNewArea(data).unwrap();
      handleOpenSnackbar({ message: "Create area successfully" });
      onClose();
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        message: error?.data?.message ?? "Something wrong",
      });
    }
  };

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      <FormProvider
        methods={methods}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}
          <Stack
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            width={"100%"}
          >
            <Typography variant="h3" sx={{ fontSize: "1.25rem", mb: 1 }}>
              Nhà màng mới
            </Typography>
            <IconButton
              onClick={() =>
                append({ name: "", sensors: Object.values(SENSORS) })
              }
            >
              <PlusCircle size={20} />
            </IconButton>
          </Stack>
          <Grid container spacing={2}>
            {fields.map((field, index) => (
              <AreaItem key={field.id} {...{ field, index, remove, control }} />
            ))}
          </Grid>
          <Button type="submit" variant="contained" sx={{ maxWidth: "150px" }}>
            Nộp
          </Button>
        </Box>
      </FormProvider>
    </>
  );
};

export default AddAreaForm;
