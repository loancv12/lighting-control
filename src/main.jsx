import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import SocketProvider from "./context/SocketProvider.jsx";
import SnackbarProvider from "./context/SnackbarProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider>
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>
);
