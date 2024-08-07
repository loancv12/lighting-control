import React from "react";
import { FormProvider as Form } from "react-hook-form";
import { FormHelperText, Paper, Stack } from "@mui/material";

const FormProvider = ({ children, onSubmit, methods }) => {
  return (
    <Form {...methods}>
      <Paper
        sx={{
          // marginTop: 2,
          padding: { xs: 2, md: 2 },
        }}
        component={"form"}
        onSubmit={onSubmit}
      >
        {/* <Stack alignItems={"flex-start"} spacing={2}> */}
        {children}
        {/* </Stack> */}
      </Paper>
    </Form>
  );
};

export default FormProvider;
