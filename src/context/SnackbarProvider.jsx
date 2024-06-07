import { createContext, useState } from "react";
import React from "react";

export const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [severity, setSeverity] = useState("success");

  const handleOpenSnackbar = ({ message, severity }) => {
    setOpen(true);
    setMessage(message);
    setSeverity(severity);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <SnackbarContext.Provider
      value={{ open, message, severity, handleOpenSnackbar, handleClose }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
