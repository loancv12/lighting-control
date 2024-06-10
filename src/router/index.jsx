import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequiredAuth from "../component/auth/RequiredAuth";
import SocketProvider from "../context/SocketProvider";
import Login from "../component/auth/Login";
import Register from "../component/auth/Register";
import Control from "../component/control/Control";
import Statistics from "../component/statistics/Statistics";
import Users from "../component/user/Users";
import { ROLES } from "../config/roles";
import HeaderLayout from "../component/layout/HeaderLayout";
import CenterLayout from "../component/layout/CenterLayout";
import Unauthorized from "../component/auth/Unauthorized";
import NotFound from "../component/NotFound";
import Prefetch from "../component/auth/Prefetch";
import PersistLogin from "../component/auth/PersistLogin";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CenterLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<HeaderLayout />}>
          <Route element={<PersistLogin />}>
            <Route
              element={
                <RequiredAuth allowedRoles={[...Object.values(ROLES)]} />
              }
            >
              <Route element={<Prefetch />}>
                <Route
                  element={
                    <RequiredAuth allowedRoles={[ROLES.Admin, ROLES.User]} />
                  }
                >
                  <Route
                    path="/control"
                    element={
                      <SocketProvider>
                        <Control />
                      </SocketProvider>
                    }
                  />
                </Route>
                <Route
                  element={
                    <RequiredAuth allowedRoles={[ROLES.Admin, ROLES.User]} />
                  }
                >
                  <Route path="/" element={<Statistics />} />
                </Route>
                <Route element={<RequiredAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="/users" element={<Users />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
