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

const menu = [
  {
    path: "/",
    title: "Control",
  },
  {
    path: "statistics",
    title: "Statistics",
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
  return (
    <React.Fragment>
      <Box>
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
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default Header;
