import React from "react";
import TableRow from "@mui/material/TableRow";
import { Checkbox, TableCell } from "@mui/material";
import EditFlight from "../EditFlight/EditFlight";

function FlightRow(props) {
  function handleChange(event) {
    let newChecks = { ...props.checks, [props.flightNo]: event.target.checked };
    props.setChecks(newChecks);
    console.log(newChecks);
  }

  return (
    <TableRow>
      <TableCell>{props.flightNo}</TableCell>
      <TableCell>
        {props.departureTime} - {props.arrivalTime}
      </TableCell>
      <TableCell>
        {props.departureLocation} - {props.arrivalLocation}
      </TableCell>
      <TableCell>{props.seatsEcon + props.seatsBus}</TableCell>
      <TableCell>{props.priceEcon}</TableCell>
      <TableCell>
        <EditFlight flight={props} />
      </TableCell>
      <TableCell>
        <Checkbox onChange={handleChange} />
      </TableCell>
    </TableRow>
  );
}

export default FlightRow;
