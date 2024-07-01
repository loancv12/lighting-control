import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Box,
  Tooltip,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSendLogoutMutation } from "../../redux/auth/authApiSlice";
import { green } from "@mui/material/colors";
import logo from "../../../public/logo.svg";

const menu = [
  {
    path: "/",
    title: "Thống kê",
  },
  {
    path: "/control",
    title: "Điều khiển",
  },
];

const authMenu = [
  {
    path: "/accounts",
    title: "Người dùng",
  },
];

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { isAdmin } = useAuth();

  const [sendLogout, { isError, error }] = useSendLogoutMutation();

  const handleLogout = async () => {
    try {
      await sendLogout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <Box sx={{ p: 2 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
        >
          <Link to={"/"}>
            <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
              <img src={"/logo.svg"} alt="Lighting control" />
            </Avatar>
          </Link>
          {menu.map((el, i) => (
            <NavLink key={i} to={el.path}>
              {({ isActive, isPending, isTransitioning }) => (
                <Button variant={isActive ? "contained" : "text"}>
                  {el.title}
                </Button>
              )}
            </NavLink>
          ))}
          {isAdmin
            ? authMenu.map((el, i) => (
                <NavLink key={i} to={el.path}>
                  {({ isActive, isPending, isTransitioning }) => (
                    <Button variant={isActive ? "contained" : "text"}>
                      {el.title}
                    </Button>
                  )}
                </NavLink>
              ))
            : null}
          <Button variant={"text"} onClick={handleLogout}>
            Thoát
          </Button>
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default Header;
