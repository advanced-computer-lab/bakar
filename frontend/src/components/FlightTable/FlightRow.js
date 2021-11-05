import React from "react";
import TableRow from "@mui/material/TableRow";
import { TableCell } from "@mui/material";

function FlightRow(props) {
  return (
    <TableRow>
      <TableCell>{props.id}</TableCell>
      <TableCell>
        {props.departDate} - {props.arriveDate}
      </TableCell>
      <TableCell>
        {props.departLocation} - {props.arriveLocation}
      </TableCell>
      <TableCell>{props.seats}</TableCell>
      <TableCell>{props.price}</TableCell>
    </TableRow>
  );
}

export default FlightRow;
