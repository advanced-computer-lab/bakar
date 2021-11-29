import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import React from "react";
import FlightRow from "./FlightRow";
import { TableRow, TableCell, TableHead } from "@mui/material";

function FlightTable(props) {
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
              Number of Seats
            </TableCell>
            <TableCell style={style} align="center" colSpan={1}>
              Price of Economy Seats
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.flights &&
            props.flights.map((flight) => (
              <FlightRow
                key={flight.flightNo}
                userType={props.userType}
                flightNo={flight.flightNo}
                departureTime={flight.departureTime}
                arrivalTime={flight.arrivalTime}
                departureLocation={flight.departureLocation}
                departureTerminal={flight.departureTerminal}
                arrivalLocation={flight.arrivalLocation}
                arrivalTerminal={flight.arrivalTerminal}
                seatsEcon={flight.seatsEcon}
                seatsBus={flight.seatsBus}
                priceEcon={flight.priceEcon}
                priceBus={flight.priceBus}
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

export default FlightTable;
