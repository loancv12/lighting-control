import { createContext, useContext, useEffect } from "react";
import { BASE_URL } from "../config/api";
import useAuth from "../hooks/useAuth";
import { io } from "socket.io-client";
import { SnackbarContext } from "./SnackbarProvider";
export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { handleOpenSnackbar } = useContext(SnackbarContext);
  const { username } = useAuth();

  const options = {
    autoConnect: false,
    query: {
      username,
    },
  };
  const socket = io(BASE_URL, options);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    function onConnect() {
      console.log("socket connect", socket);
    }

    function onDisconnect() {
      console.log("socket disconnect", socket);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", (err) => {
      // the reason of the error, for example "xhr poll error"
      console.log(err.message);

      // some additional description, for example the status code of the initial HTTP response
      console.log(err.description);

      // some additional context, for example the XMLHttpRequest object
      console.log(err.context);
      handleOpenSnackbar({
        message: "Something wrong",
        severity: "error",
      });
    });
    socket.on("error", (message) => {
      handleOpenSnackbar({
        message: "Something wrong",
        severity: "error",
      });
    });

    socket.on("change-config-ret", (data) => {
      handleOpenSnackbar({
        message: data.message,
        severity: "success",
      });
    });

    return () => {
      console.log("unmount");
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error");
      socket.off("change-config-ret");
      socket.disconnect();
    };
  }, [username]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
