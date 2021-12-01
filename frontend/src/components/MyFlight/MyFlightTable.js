import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import React from "react";
import MyFlightRow from "./MyFlightRow";
import { TableRow, TableCell, TableHead } from "@mui/material";

function MyFlightTable(props) {
  const style = {
    fontSize: 16,
    fontWeight: "bold",
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={style} align="center" colSpan={1}>
              Flight Number
            </TableCell>
            <TableCell style={style} align="center" colSpan={1}>
              Departure Time - Arrival Time
            </TableCell>
            <TableCell style={style} align="center" colSpan={1}>
              Departure Location - Arrival Loation
            </TableCell>
            <TableCell style={style} align="center" colSpan={1}>
              Reserved Seat
            </TableCell>
            <TableCell style={style} align="center" colSpan={1}>
              Ticket Price
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.flights &&
            props.flights.map((ticket) => (
              <MyFlightRow
                key={ticket.flightNo}
                userType={props.userType}
                flightNo={ticket.flightNo}
                departureTime={ticket.departureTime}
                arrivalTime={ticket.arrivalTime}
                departureLocation={ticket.departureLocation}
                departureTerminal={ticket.departureTerminal}
                arrivalLocation={ticket.arrivalLocation}
                arrivalTerminal={ticket.arrivalTerminal}
                seatsEcon={ticket.seatsEcon}
                seatsBus={ticket.seatsBus}
                priceEcon={ticket.priceEcon}
                priceBus={ticket.priceBus}
                checks={props.checks}
                setChecks={props.setChecks}
                getData={props.getData}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MyFlightTable;
