import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Air from '@mui/icons-material/AirlineSeatReclineNormal';

export default function SeatItem({seatStatus, requestedSeats, setRequestedSeats, index, setPickedSeats}) {
    const [picked, setPicked] = React.useState(false);
    const canReserve = seatStatus === 'Free';
    const handleClick = () => {
        if (canReserve) {
            if (!picked && requestedSeats > 0) {
                setRequestedSeats(requestedSeats - 1);
                setPicked(true);
                setPickedSeats((prevPickedSeats) => [...prevPickedSeats, index+1]);
            } else if (picked) {
                setRequestedSeats(requestedSeats + 1);
                setPicked(false);
                // remove the seat from our picked seats
                setPickedSeats((prevPickedSeats) => prevPickedSeats.filter(value => value !== (index + 1)));
            }
        }
    }
    

    return (
        <Grid item xs={6}>
            <IconButton
                onClick={handleClick}
                color={canReserve? (picked? "info": "success"): "error"}
            >
                <Air></Air>
            </IconButton>
            <label style={{ fontSize: '22px' }}>seat requestedSeats {index + 1}</label>
        </Grid>
    )
}

/*
*/