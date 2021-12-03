import React, { useState } from "react";
import { TableRow, Checkbox, TableCell, Button, IconButton, Icon,Dialog,DialogContent,DialogContentText,DialogActions,DialogTitle } from "@mui/material";
import { UserType } from "../../userType";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "../../api";
import FlightDetails from "../FlightDetails/FlightDetails";
import { getDate } from "date-fns";

function MyFlightRow(props) { 
  const handleClick = async (event) => {
    if(event.currentTarget.name=="delete"){
        setOpen(true);
    } else{
       await axios.delete(`/tickets/${props.id}`);
       props.getData()
       setOpen(false);
    }
  }
  const handleFlightClick = async (event) => {
    if(event.currentTarget.name=="depFlightInfo"){
        setOpen(true);
    } else{
       await axios.delete(`/tickets/${props.id}`);
       setOpen(false);
       document.location.reload();
    }
  }
const handleClose = () => {
    setOpen(false);
}
  
  const [open,setOpen,] = useState();
  let flag = props.userType === UserType.admin;
  
  const departureTime = new Date(props.departureTime);
  const arrivalTime = new Date(props.arrivalTime);
  return (
    <TableRow>
      <TableCell align="center">{props.id}</TableCell>
      <TableCell align="center">
          <Button onClick={()=>props.setClicked(props.departureFlightNo)}>
          {props.departureFlightNo}
          </Button>
          </TableCell>
      <TableCell align="center">
          <Button onClick={()=>props.setClicked(props.returnFlightNo)}>
          {props.returnFlightNo}
          </Button>
          </TableCell>
      <TableCell align="center">{props.cabin}</TableCell>
      <TableCell align="center">{"current Seat"}</TableCell>
      <TableCell align="center">{props.price}</TableCell>
      <TableCell>
        <IconButton onClick={handleClick} name='delete'>
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
