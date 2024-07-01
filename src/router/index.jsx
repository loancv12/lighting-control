import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequiredAuth from "../component/auth/RequiredAuth";
import SocketProvider from "../context/SocketProvider";
import Login from "../component/auth/Login";
import Control from "../component/control/Control";
import Statistics from "../component/statistics/Statistics";
import { ROLES } from "../config/roles";
import HeaderLayout from "../component/layout/HeaderLayout";
import CenterLayout from "../component/layout/CenterLayout";
import Unauthorized from "../component/auth/Unauthorized";
import NotFound from "../component/NotFound";
import PersistLogin from "../component/auth/PersistLogin";
import Accounts from "../component/accounts/Accounts";
import CreateAccount from "../component/accounts/CreateAccount";
import SidebarLayout from "../component/layout/SidebarLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CenterLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<HeaderLayout />}>
          <Route element={<PersistLogin />}>
            <Route
              element={
                <RequiredAuth allowedRoles={[...Object.values(ROLES)]} />
              }
            >
              <Route element={<SidebarLayout />}>
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
              </Route>
              <Route element={<RequiredAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="/accounts">
                  <Route index element={<Accounts />} />
                  <Route path="create-account" element={<CreateAccount />} />
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
