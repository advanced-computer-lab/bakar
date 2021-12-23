import React, { useState } from "react";
import {
  TableRow,
  Checkbox,
  TableCell,
  Button,
  IconButton,
  Icon,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { UserType } from "../../userType";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../api";
import FlightDetails from "../FlightDetails/FlightDetails";
import { getDate } from "date-fns";

function MyFlightRow(props) {
  const handleClick = async (event) => {
    if (event.currentTarget.name == "delete") {
      setOpen(true);
    } else {
      await axios.delete(`/tickets/${props.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      props.getData();
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState();
  let flag = props.userType === UserType.admin;

  const departureTime = new Date(props.departureTime);
  const arrivalTime = new Date(props.arrivalTime);
  return (
    <TableRow>
      <TableCell align="center">{props.id}</TableCell>
      <TableCell align="center">
          {props.departureFlightNo}
        <IconButton onClick={() => props.setClicked(props.departureFlightNo)}>
          {" "}
          <EditIcon />{" "}
        </IconButton>
      </TableCell>
      <TableCell align="center">
          {props.returnFlightNo}
        <IconButton onClick={() => props.setClicked(props.returnFlightNo)} >
          {" "}
          <EditIcon />{" "}
        </IconButton>
      </TableCell>
      <TableCell align="center">{props.cabin}</TableCell>
      <TableCell align="center">{props.seatsDeparture.join(", ")}</TableCell>
      <TableCell align="center">{props.seatsReturn.join(", ")}</TableCell>
      <TableCell align="center">{props.price}</TableCell>
      <TableCell>
        <IconButton onClick={handleClick} name="delete">
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </TableCell>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Careful!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete all of the selected elements?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClick} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
}

export default MyFlightRow;
