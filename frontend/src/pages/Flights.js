import React, { useState } from "react";
import FlightTable from "../components/FlightTable/FlightTable";
import CreateFlight from "../components/CreateFlight/CreateFlight";
import DeleteFlight from "../components/DeleteFlight/DeleteFlight";
import SearchFlight from "../components/SearchFlight/SearchFlight";
import Grid from "@mui/material/Grid";

import axios from "axios";
import { useNavigate } from "react-router";
const jwt = require("jsonwebtoken");

function Flights() {
  const [flights, setFlights] = useState([]);
  const [checks, setChecks] = useState({});

  
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  React.useEffect(() => {
    try {
      jwt.verify(token, "tom&jerry");
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  });
  const getData = async (queryString) => {
    const res = await axios.get("/flights?" + queryString,
    {headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
    console.log(res);
    let flightData = res["data"];
    setFlights(flightData);
    let currentChecks = {};
    flightData.forEach((element) => {
      currentChecks[element.flightNo] = false;
    });
    setChecks(currentChecks);
  };

  React.useEffect(() => getData(), []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <CreateFlight getData={getData} />
        </Grid>
        <Grid item>
          <DeleteFlight checks={checks} getData={getData} />
        </Grid>
        <Grid item>
          <SearchFlight getData={getData} />
        </Grid>
      </Grid>
      <br></br>
      <FlightTable
        flights={flights}
        checks={checks}
        setChecks={setChecks}
        getData={getData}
      />
    </div>
  );
}

export default Flights;
