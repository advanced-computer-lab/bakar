import { Button } from "@mui/material";
import React, { useState } from "react";
import FlightTable from "../components/FlightTable/FlightTable";
import AddIcon from '@mui/icons-material/Add';

import axios from 'axios';

function Flights() {
  const [flights, setFlights] = useState([]);

  const getData = async () => {
      const res = await axios.get('/flights');
      setFlights(res.data.flights)
  }

  getData();

  return (
    <div>
      <Button variant='contained' startIcon={<AddIcon />}>Add a flight</Button>
      <FlightTable flights={flights} />
    </div>
  );
}

export default Flights;
