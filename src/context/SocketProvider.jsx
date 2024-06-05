import { createContext, useEffect } from "react";
import { BASE_URL } from "../config/api";
import useAuth from "../hooks/useAuth";
import { io } from "socket.io-client";
export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { username } = useAuth();
  const options = {
    query: {
      username,
    },
  };
  const socket = io(BASE_URL, options);

  useEffect(() => {
    function onConnect() {
      console.log("socket connect", socket);
    }

    function onDisconnect() {
      console.log("socket disconnect", socket);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("error", (message) => {
      console.log(message);
    });
    socket.on("change-config", (data) => {
      console.log("change-config");
    });

    socket.on("change-config-ret", (data) => {
      console.log("change-config-ret", data);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("change-config");
    };
  }, [username, socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
