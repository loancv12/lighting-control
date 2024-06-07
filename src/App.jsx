import { useContext, useState } from "react";
import Router from "./router";
import { Alert, Snackbar } from "@mui/material";
import { SnackbarContext } from "./context/SnackbarProvider";

function App() {
  const { open, handleClose, severity, message } = useContext(SnackbarContext);
  return (
    <>
      <Router />
      {open ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
}

export default App;
