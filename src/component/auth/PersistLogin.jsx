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

  useEffect(() => {
    if (
      firstMount.current === false ||
      process.env.NODE_ENV !== "development"
    ) {
      // run once
      const verifyRefreshToken = async () => {
        try {
          console.log("run refresh");
          await refresh();
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

  let content = "perstst";
  if (!persist) {
    content = <Outlet />;
  } else {
    // persist is true
    // if (isLoading) {
    //   content = <LoadingScreen />;
    // } else if (isError) {
    //   content = (
    //     <>
    //       <Navigate to="/login" />
    //     </>
    //   );
    // } else if (isSuccess) {
    //   //refresh api was run in case refresh page, no token
    //   content = <Outlet />;
    // } else if (token) {
    //   content = <Outlet />; // login, because in LoginForm, after setCredential then navigate('/'),
    //   // so there are token, no refresh api was run
    // } else if (
    //   !token &&
    //   ((firstMount.current && process.env.NODE_ENV === "development") ||
    //     (!firstMount.current && process.env.NODE_ENV !== "development")) &&
    //   isUninitialized
    // ) {
    //   // logout situation
    //   content = <Outlet />;
    // }
    // refresh api will run
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
        console.log("isUninitialized", firstMount.current);
        content = "isUninitialized";
        if (
          (isUninitialized && firstMount.current === false) ||
          process.env.NODE_ENV !== "development"
        ) {
          console.log("isUninitialized", firstMount.current);
          content = <Outlet />;
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
