import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {
  ArrowDown,
  ArrowUp,
  Clipboard,
  Info,
  PlusCircle,
} from "phosphor-react";
import { Icon, Popover, Tooltip, styled } from "@mui/material";
import { useGetAccountsQuery } from "../../redux/acount/acountApiSlice";
import LoadingScreen from "../LoadingScreen";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ViRoles } from "../../config/roles";
import { ViSensors } from "../../config/sensors";
import AddAreaForm from "./AddAreaForm";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&": {
    backgroundColor: "rgb(160 160 160 / 60%)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableRowGray = styled(TableRow)(({ theme }) => ({
  "&": {
    backgroundColor: "rgb(210 207 207 / 60%)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

function SmallTableInside({ row }) {
  const [open, setOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(function () {
        setCopySuccess(false);
      }, 4000);
    } catch (error) {}
  };

  return (
    <Table size="small" aria-label="area">
      <TableHead>
        <TableRow>
          <TableCell />

          <TableCell>Id</TableCell>
          <TableCell>Tên cảm biến</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {row?.sensors?.map((sensor, i) => (
          <Fragment key={i}>
            <TableRow>
              <TableCell>
                <IconButton size="small">
                  <Info />
                </IconButton>
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ position: "relative" }}
              >
                {sensor._id}
                <IconButton onClick={() => copyToClipboard(sensor._id)}>
                  <Clipboard />
                  {copySuccess ? (
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%) translateX(100%)",
                        right: 0,
                        fontSize: "1rem",
                        backgroundColor: "#00b700",
                        padding: "4px",
                        borderRadius: "4px",
                      }}
                    >
                      {" "}
                      Copied!
                    </span>
                  ) : null}
                </IconButton>
              </TableCell>
              <TableCell>{ViSensors[capitalize(sensor.name)]}</TableCell>
            </TableRow>
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
}

function RowOfTableInside({ area }) {
  const [open, setOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(function () {
        setCopySuccess(false);
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <StyledTableRowGray>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowUp /> : <ArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ position: "relative" }}>
          {area.id}
          <IconButton onClick={() => copyToClipboard(area.id)}>
            <Clipboard />
            {copySuccess ? (
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%) translateX(100%)",
                  right: 0,
                  fontSize: "1rem",
                  backgroundColor: "#00b700",
                  padding: "4px",
                  borderRadius: "4px",
                }}
              >
                {" "}
                Copied!
              </span>
            ) : null}
          </IconButton>
        </TableCell>
        <TableCell>{area.name}</TableCell>
      </StyledTableRowGray>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <SmallTableInside row={area} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

function TableInside({ row }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleAddArea = (e) => {
    handleClick(e);
  };
  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPaper-root": {
            width: { xs: "300px", md: "600px" },
          },
        }}
      >
        <AddAreaForm user={row} onClose={handleClose} />
      </Popover>
      <Table size="small" aria-label="area">
        <TableHead>
          <TableRow>
            <TableCell>
              <Tooltip title="Thêm khu vực">
                <IconButton aria-describedby={id} onClick={handleAddArea}>
                  <PlusCircle size={20} />
                </IconButton>
              </Tooltip>
            </TableCell>
            <TableCell>Id</TableCell>
            <TableCell>Tên khu vực</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row?.areas?.map((area, i) => (
            <RowOfTableInside key={i} area={area} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  return (
    <Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowUp /> : <ArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ position: "relative" }}>
          {row.id}
          <IconButton onClick={() => copyToClipboard(row.id)}>
            <Clipboard />
            {copySuccess ? (
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%) translateX(100%)",
                  right: 0,
                  fontSize: "1rem",
                  backgroundColor: "#00b700",
                  padding: "4px",
                  borderRadius: "4px",
                }}
              >
                {" "}
                Copied!
              </span>
            ) : null}
          </IconButton>
        </TableCell>
        <TableCell>
          {row.roles.map((role) => ViRoles[capitalize(role)]).join()}
        </TableCell>
        <TableCell>{row.username}</TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <TableInside row={row} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function Accounts() {
  const { data: accounts, isLoading, isError, refetch } = useGetAccountsQuery();
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate("/accounts/create-account");
  };
  let content;
  if (isLoading) {
    content = <LoadingScreen />;
  } else if (isError) {
    content = <Typography variant="body2">Some thing wrong.</Typography>;
  } else {
    content = (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead
            sx={{
              backgroundColor: (theme) => theme.palette.common.black,
              color: (theme) => theme.palette.common.white,

              "& th": {
                color: (theme) => theme.palette.common.white,
              },
            }}
          >
            <TableRow>
              <TableCell>
                <Tooltip title="Thêm người dùng">
                  <IconButton onClick={handleAddUser}>
                    <PlusCircle size={32} color="white" />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Tên người dùng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.ids.map((id, i) => (
              <Row key={i} row={accounts.entities[id]} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return content;
}
