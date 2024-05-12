import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RequiredAuth = () => {
  const isLogin = true;
  return isLogin ? <Outlet /> : <Navigate to="login" />;
};

export default RequiredAuth;
