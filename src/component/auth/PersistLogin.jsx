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
  // state to make sure token is set, mutation flag isSuccess is true before
  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();
  // console.log(
  //   "isUninitialized, isLoading, isSuccess, isError token trueSuccess",
  //   isUninitialized,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   token,
  //   trueSuccess
  // );

  useEffect(() => {
    if (
      firstMount.current === false ||
      process.env.NODE_ENV !== "development"
    ) {
      // run once
      const verifyRefreshToken = async () => {
        try {
          console.log("run refresh");
          await refresh().unwrap();
          console.log("run after refresh");

          setTrueSuccess(true);
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

  let content;
  if (!persist) {
    content = <Outlet />;
  } else {
    // persist is true
    if (isLoading) {
      content = <LoadingScreen />;
    } else if (isError) {
      content = (
        <>
          <Navigate to="/login" />
        </>
      );
    } else if (isSuccess && trueSuccess) {
      content = <Outlet />;
    } else if (token && isUninitialized) {
      content = <Outlet />;
    }
  }

  return content;
};

export default PersistLogin;
