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
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSendLogoutMutation } from "../../redux/auth/authApiSlice";

const menu = [
  {
    path: "/",
    title: "Thống kê",
  },
  {
    path: "/control",
    title: "Điều khiển",
  },
  {
    path: "/users",
    title: "Nhân viên",
  },
];

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        >
          {menu.map((el, i) => (
            <NavLink key={i} to={el.path}>
              {({ isActive, isPending, isTransitioning }) => (
                <Button variant={isActive ? "contained" : "text"}>
                  {el.title}
                </Button>
              )}
            </NavLink>
          ))}
          <Button variant={"text"} onClick={handleLogout}>
            Thoát
          </Button>
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default Header;
