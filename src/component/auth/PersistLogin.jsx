import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/auth/authSlice";
import { Link, Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import usePersist from "../../hooks/usePersist";
import { useRefreshMutation } from "../../redux/auth/authApiSlice";
import { Typography } from "@mui/material";

const PersistLogin = () => {
  const [persist, setPersist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const firstMount = useRef(true);
  // state to make sure that logout is redirect to Login but refresh page is not
  // when logout, isRunRefresh is false
  const usedToHaveToken = useRef(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (
      firstMount.current === false ||
      process.env.NODE_ENV !== "development" ||
      process.env.NODE_ENV !== "development"
    ) {
      // run once
      const verifyRefreshToken = async () => {
        try {
          console.log("run refresh");
          await refresh();
          console.log("run after refresh");
        } catch (error) {
          console.log(error);
        }
      };

      if (persist && !token) verifyRefreshToken();
    }
    return () => {
      firstMount.current = false;
    };
  }, []);

  useEffect(() => {
    if (token) {
      usedToHaveToken.current = true;
    }
  }, [token]);

  let content = "perstst";
  if (!persist) {
    content = <Outlet />;
  } else {
    if (!token) {
      console.log("no token");
      content = "no token";
      if (isLoading) {
        console.log("isLoading");
        content = <LoadingScreen />;
      } else if (isError) {
        console.log("isError");
        content = <Navigate to={"/login"} />;
      } else if (isUninitialized) {
        console.log(
          "isUninitialized",
          firstMount.current,
          process.env.NODE_ENV,
          usedToHaveToken,
          import.meta.env.VITE_NODE_ENV // refresh zo here
        );
        content = "isUninitialized";
        if (
          isUninitialized &&
          (process.env.NODE_ENV !== "development" ||
            (firstMount.current === false &&
              process.env.NODE_ENV === "development"))
        ) {
          console.log(
            "isUninitialized firstMount.current false and development or production"
          );
          if (usedToHaveToken) {
            console.log(
              "isUninitialized firstMount.current false and development or production and usedToHaveToken",
              usedToHaveToken // logout zo here
            );
            content = <Outlet />;
          }
        }
      } else {
        console.log("no token no loading, no erroo, no isUninitialized");
        content = "no token no loading, no erroo, no isUninitialized";
      }
    } else {
      console.log("have token");
      content = <Outlet />;
    }
  }

  return content;
};

export default PersistLogin;
