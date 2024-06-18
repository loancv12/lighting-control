import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { object, string, number, date } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import RHFTextField from "../hookForm/RHFTextField";
import { Eye, EyeSlash } from "phosphor-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/auth/authApiSlice";
import { useDispatch } from "react-redux";
import usePersist from "../../hooks/usePersist";
import FormProvider from "../hookForm/FormProvider";
import { setCredentials } from "../../redux/auth/authSlice";
import { SnackbarContext } from "../../context/SnackbarProvider";
import LoadingScreen from "../LoadingScreen";

const LoginForm = () => {
  const { handleOpenSnackbar } = useContext(SnackbarContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [persist, setPersist] = usePersist();

  const handleToggle = () => {
    setPersist((prev) => !prev);
  };

  const [login, { isLoading, isError }] = useLoginMutation();

  const LoginSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const defaultValues = {
    username: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    // debugger;
    try {
      // Submit data
      const { accessToken } = await login(data).unwrap();
      dispatch(setCredentials({ accessToken }));
      handleOpenSnackbar({ message: "Login successfully" });
      navigate("/");
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        message: error.data.message ?? "Something wrong",
      });
    }
  };

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} width={"100%"}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}
          <RHFTextField
            name="username"
            autoFocus
            fullWidth
            label="Tên đăng nhập"
            autoComplete="username"
          />
          <RHFTextField
            name="password"
            label="Mật khẩu"
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={(e) => setShowPassword((prev) => !prev)}>
                    {showPassword ? <Eye /> : <EyeSlash />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ my: 2 }}
        >
          <label htmlFor="persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Ghi nhớ
          </label>
          <Link
            variant="body2"
            to="/auth/reset-password"
            component={RouterLink}
            color="inherit"
            underline="always"
          >
            Quên mật khẩu
          </Link>
        </Stack>
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "#000",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.000",
            },
          }}
        >
          Đăng nhập
        </Button>
      </FormProvider>
    </>
  );
};

export default LoginForm;
