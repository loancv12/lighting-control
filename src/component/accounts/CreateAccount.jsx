import React, { useContext, useState } from "react";
import FormProvider from "../hookForm/FormProvider";
import * as Yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import RHFTextField from "../hookForm/RHFTextField";
import { ROLES } from "../../config/roles";
import RHFMultiSelect from "../hookForm/RHFMultiSelect";
import {
  ArrowArcLeft,
  Eye,
  EyeSlash,
  MinusCircle,
  PlusCircle,
} from "phosphor-react";
import AreaItem from "./AreaItem";
import { SENSORS } from "../../config/sensors";
import { useAddNewAccountMutation } from "../../redux/acount/acountApiSlice";
import LoadingScreen from "../LoadingScreen";
import { SnackbarContext } from "../../context/SnackbarProvider";
import { useNavigate } from "react-router-dom";

function findSecondDuplicateIndex(arr) {
  const seen = new Map();

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (seen.has(item)) {
      seen.set(item, seen.get(item) + 1);
      // If an item is seen more than once, return its index as the second duplicate
      if (seen.get(item) === 2) {
        return i;
      }
    } else {
      seen.set(item, 1);
    }
  }

  // If no second duplicate is found, return -1 to indicate not found
  return -1;
}

const CreateAccount = () => {
  const { handleOpenSnackbar } = useContext(SnackbarContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [addNewAccount, { isLoading, isError, isSuccess }] =
    useAddNewAccountMutation();

  const defaultValues = {
    username: "",
    password: "",
    roles: ["user"],
    areas: [
      {
        name: "",
        sensors: Object.values(SENSORS),
      },
    ],
  };

  const areaSchema = Yup.object({
    name: Yup.string()
      .min(4, "Tên khu vực phải có 4-14 kí tự")
      .max(14, "Tên khu vực phải có 4-14 kí tự")
      .required("Tên khu vực là trường bắt buộc"),
    sensors: Yup.array()
      .of(Yup.string().oneOf(Object.values(SENSORS)))
      .min(1, "Ban phải chọn ít nhất một loại sensor cho khu vực"),
  });
  const accountSchema = Yup.object({
    username: Yup.string()
      .min(4, "Tên đăng nhập phải có 4-14 kí tự")
      .max(14, "Tên đăng nhập phải có 4-14 kí tự")
      .required("Tên đăng nhập là trường bắt buộc"),
    password: Yup.string()
      .min(4, "Mật khẩu phải có 4-14 kí tự")
      .max(14, "Mật khẩu phải có 4-14 kí tự")
      .required("Mật khẩu là trường bắt buộc"),
    roles: Yup.array()
      .of(Yup.string().oneOf(Object.values(ROLES)))
      .min(1, "Bạn phải chọn ít nhất một vai trò")
      .required("Bạn phải chọn ít nhất một vai trò"),
    areas: Yup.array()
      .ensure()
      .of(areaSchema)
      .test({
        name: "unique",
        test: (value, context) => {
          const list = value;
          const nameList = list.map((a) => a.name.trim());
          const duplicateIndex = findSecondDuplicateIndex(nameList);
          if (duplicateIndex !== -1)
            return context.createError({
              path: `areas.[${duplicateIndex}].name`,
              message: "Tên khu vực không được trùng",
            });
          return true;
        },
      }),
  });

  const methods = useForm({
    resolver: yupResolver(accountSchema),
    defaultValues,
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

  console.log("errors", errors, isError);
  const onSubmit = async (data) => {
    console.log("submit", data);
    try {
      await addNewAccount(data).unwrap();
      handleOpenSnackbar({ message: "Create account successfully" });
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        message: error?.data?.message ?? "Something wrong",
      });
    }
  };

  const roleOptions = Object.keys(ROLES).map((key) => {
    return {
      title: key,
      value: ROLES[key],
    };
  });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      <FormProvider
        methods={methods}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton onClick={handleBack}>
            <ArrowArcLeft size={20} />
          </IconButton>
          <Typography variant="h4">Thông tin tài khoản</Typography>
        </Stack>
        <Stack
          direction={{ sx: "column", md: "row" }}
          spacing={2}
          justifyContent={"flex-start"}
          width={"100%"}
        >
          <Paper
            sx={{
              p: 2,
              minWidth: "200px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Typography variant="h3" sx={{ fontSize: "1.25rem", mb: 1, mt: 1 }}>
              Người dùng mới
            </Typography>
            <Stack spacing={2} justifyContent={"space-between"} width={"100%"}>
              <RHFTextField name="username" label="Tên đăng nhập" />
              <RHFTextField name="password" type="password" label="Mật khẩu" />
              {/* <RHFTextField
                name="password"
                label="Mật khẩu"
                fullWidth
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={(e) => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /> */}
              <RHFMultiSelect
                multiple={true}
                name="roles"
                options={roleOptions}
                label="Vai"
              />
            </Stack>
          </Paper>
          <Paper
            sx={{
              p: 2,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Typography variant="h3" sx={{ fontSize: "1.25rem", mb: 1 }}>
                Khu vực mới
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
                <AreaItem
                  key={field.id}
                  {...{ field, index, remove, control }}
                />
              ))}
            </Grid>
          </Paper>
        </Stack>
        <Button type="submit">Nộp</Button>
      </FormProvider>
    </>
  );
};

export default CreateAccount;
