import React from "react";
import { FormProvider as Form } from "react-hook-form";
import { FormHelperText, Paper, Stack } from "@mui/material";

const FormProvider = ({ children, onSubmit, methods }) => {
  return (
    <Form {...methods}>
      <Paper
        sx={{
          marginTop: 3,
          padding: 3,
        }}
        component={"form"}
        onSubmit={onSubmit}
      >
        <Stack alignItems={"flex-start"} spacing={3}>
          {children}
        </Stack>
      </Paper>
    </Form>
  );
};

export default FormProvider;
