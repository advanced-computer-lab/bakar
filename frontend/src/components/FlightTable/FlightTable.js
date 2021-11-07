import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import React from "react";
import FlightRow from "./FlightRow";

function FlightTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {props.flights &&
            props.flights.map((flight) => (
              <FlightRow
                key={flight.flightNo}
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
