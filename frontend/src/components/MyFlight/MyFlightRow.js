import React from "react";
import { TableRow, Checkbox, TableCell } from "@mui/material";
import EditFlight from "../EditFlight/EditFlight";
import { UserType } from "../../userType";

function MyFlightRow(props) {
  let flag = props.userType === UserType.admin;
  function handleChange(event) {
    let newChecks = { ...props.checks, [props.flightNo]: event.target.checked };
    props.setChecks(newChecks);
    console.log(newChecks);
  }
  const departureTime = new Date(props.departureTime);
  const arrivalTime = new Date(props.arrivalTime);
  return (
    <TableRow>
      <TableCell align="center">{props.flightNo}</TableCell>
      <TableCell align="center">
        {departureTime.toLocaleDateString()}  {departureTime.toLocaleTimeString()} - {arrivalTime.toLocaleDateString()}  {arrivalTime.toLocaleTimeString()}
      </TableCell>
      <TableCell align="center">
        {props.departureLocation} - {props.arrivalLocation}
      </TableCell>
      <TableCell align="center">{props.seatsEcon + props.seatsBus}</TableCell>
      <TableCell align="center">{props.priceEcon}</TableCell>
      <TableCell>
        {flag && <EditFlight flight={props} />}
      </TableCell>
      <TableCell>
        {flag && <Checkbox onChange={handleChange} />}
      </TableCell>
    </TableRow>
  );
}

export default MyFlightRow;
