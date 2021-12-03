/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-loop-func */
import * as React from "react";
import axios from "../../api";
import DoneIcon from '@mui/icons-material/Done';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";

import Air from '@mui/icons-material/AirlineSeatReclineNormal';

export default function  SeatReserve(props) {
    let [pickedSeats,setPickedSeats]= React.useState([]);
    let [number,setNumber] = React.useState(props.number);  
    const [open, setOpen] = React.useState(false);  
    const list = [];
    
    for (let index = 0; index < props.seats.length; index++) {
            if(props.seats[index]==='Free'){
                list.push(
                <Grid item xs={6}>
                    <IconButton key={index+50}
                    onClick={
                                function(){
                                if(props.seats[index]==="Free" && (number>0)){
                                    props.seats[index] = "Picked";
                                    setNumber(number-1);
                                    let s = [...pickedSeats]
                                    s.push((index))
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
            else if(props.seats[index]==='Picked'){
                list.push(
                    <Grid item xs={6}>
                        <IconButton key={index+50}
                        onClick={
                                    function(){
                                    if(props.seats[index]==="Picked"){
                                        props.seats[index] = "Free";
                                        let s = [...pickedSeats]
                                        s.splice(s.indexOf(index),1);
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
                        <label style={{fontSize : "22px",color:"green"}}>seat number {index+1}</label>                    </Grid>
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
    const  handleClickOpen = async () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
      };
    return (
        <div>
             <Button
            variant = "contained"
            starticon = {<DoneIcon/>}
            onClick={handleClickOpen}
            >
                Select seats
            </Button>
        <Dialog open={open} onClose={handleClose}>
            <Box sx={{ width: '100%' ,height:"100%",padding:"50px"}}>
                <Grid  container alignItems="center" justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    {list}
                </Grid>
                    <br />
                    <br />
                <Grid container  alignItems="center"  justifyContent="center" ><Button variant="contained" onClick={console.log(pickedSeats)}>Done</Button></Grid>
            </Box>
        </Dialog>
    </div>
    );
}

