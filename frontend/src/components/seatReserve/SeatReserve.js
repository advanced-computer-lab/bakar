/* eslint-disable no-loop-func */
import * as React from "react";
import axios from "../../api";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button, IconButton } from "@mui/material";
import Air from '@mui/icons-material/AirlineSeatReclineNormal';
import { fontSize } from "@mui/system";

export default function  SeatReserve(props) {
    const getData = async (queryString) => {
        const res = await axios.get("/flights?flightNo=" + queryString);
        console.log(res.data[0]);
        return res.data[0];
    };
    let FlightDetails= getData(props.flightNo);
    let [seats,setSeats] = React.useState([]);
    if(props.Cabin === "Economy"){
        setSeats(FlightDetails.seatsEconView);
    }else if(props.Cabin ==="Business"){
        setSeats(FlightDetails.seatsBusView);
    }

    let [number,setNumber] = React.useState(props.number);
    const list = [];
    let [pickedSeats,setPickedSeats]= React.useState([])

    for (let index = 0; index < seats.length; index++) {
            if(seats[index]==='Free'){
                list.push(
                <Grid item xs={6}>
                    <IconButton key={index+50}
                    onClick={
                                function(){
                                if(seats[index]==="Free" && (number>0)){
                                    seats[index] = "Picked";
                                    alert('You picked seat number ' +(index+1));
                                    setNumber(number-1);
                                    let s = [...pickedSeats]
                                    s.push((index+1))
                                    setPickedSeats(s)                              
                                    }
                                else{
                                    alert("You picked your seats");
                                }
                            }
                        }   
                        
                    >
                        <Air>
                        </Air>
                    </IconButton>
                    <label style={{fontSize : "22px"}}>seat number {index+1}</label>
                </Grid>
                )
            }
            else if(seats[index]==='Picked'){
                list.push(
                    <Grid item xs={6}>
                        <IconButton key={index+50}
                        onClick={
                                    function(){
                                    if(seats[index]==="Picked"){
                                        seats[index] = "Free";
                                        alert('You unpicked seat number ' +(index+1));
                                        let s = [...pickedSeats]
                                        s.splice(s.indexOf(index+1),1);
                                        setPickedSeats(s);
                                        setNumber(number+1)
                                    }
                                    else{
                                        alert("You picked your seats");
                                    }
                                }
                            }   
                        color = "success"    
                        >
                            <Air>
                            </Air>
                        </IconButton>
                        <label style={{fontSize : "22px"}}>seat number {index+1}</label>                    </Grid>
                    )
            }
            else{
                list.push(
                    <Grid item xs={6}>
                        <IconButton disabled>
                            <Air></Air>
                        </IconButton>
                        <label style={{fontSize : "22px"}}>seat number {index+1}</label>                    </Grid>
                    ) 
            }
    }
    
    return (
        <Box sx={{ width: '100%' }}>
      <Grid  container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        {list}
      </Grid>
      <label style={{fontSize:"30px"}}>Chosen seats number:</label>
      {pickedSeats.map((seat)=>(
            <li style={{fontSize:"22px"}}>{seat}</li>
        ))}
    </Box>
    );
}

