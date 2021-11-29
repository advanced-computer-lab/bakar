import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import axios from "../../api";
import Box from "@mui/material/Box";
import { DateTimePicker } from "@mui/lab";

export default function CreateFlight({ getData }) {
  const [open, setOpen] = React.useState(false);
  const [departureTime, setDepartureTime] = React.useState(
    new Date(Date.now())
  );
  const [arrivalTime, setArrivalTime] = React.useState(new Date(Date.now()));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    console.log(departureTime);
    console.log(arrivalTime);
    try {
      let response = await axios.post(
        "/flights",
        {
          flightNo: data.get("flightNo"),
          departureTime: new Date(
            new Date(departureTime.setSeconds(0)).setMilliseconds(0)
          ),
          arrivalTime: new Date(
            new Date(arrivalTime.setSeconds(0)).setMilliseconds(0)
          ),
          departureLocation: data.get("departureLocation"),
          arrivalLocation: data.get("arrivalLocation"),
          seatsEcon: data.get("seatsEcon"),
          seatsBus: data.get("seatsBus"),
          departureTerminal: data.get("departureTerminal"),
          arrivalTerminal: data.get("arrivalTerminal"),
          priceEcon: data.get("priceEcon"),
          priceBus: data.get("priceBus"),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(data);
      console.log(response.headers);
      setOpen(false);
      getData("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Add a flight
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <DialogTitle>Create</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter flight data</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="flightNo"
              id="flightNo"
              label="Flight Number"
              type="text"
              fullWidth
              variant="outlined"
            />
            <DateTimePicker
              renderInput={(props) => (
                <TextField {...props} margin="dense" fullWidth />
              )}
              label="Departure Time"
              value={departureTime}
              onChange={(newValue) => {
                setDepartureTime(newValue);
              }}
            />
            <DateTimePicker
              renderInput={(props) => (
                <TextField {...props} margin="dense" fullWidth />
              )}
              label="Arrival Time"
              value={arrivalTime}
              onChange={(newValue) => {
                setArrivalTime(newValue);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              name="departureLocation"
              id="departureLocation"
              label="Departure Location"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              name="departureTerminal"
              id="departureTerminal"
              label="Departure Terminal"
              type="Number"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              name="arrivalLocation"
              id="arrivalLocation"
              label="Arrival Location"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              name="arrivalTerminal"
              id="arrivalTerminal"
              label="Arrival Terminal"
              type="Number"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              name="seatsEcon"
              id="seatsEcon"
              label="Number of Economy Seats"
              type="number"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              name="seatsBus"
              id="seatsBus"
              label="Number of Business Seats"
              type="number"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              name="priceEcon"
              id="priceEcon"
              label="Price of Economy Seats"
              type="number"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              name="priceBus"
              id="priceBus"
              label="Price of Business Seats"
              type="number"
              fullWidth
              variant="outlined"
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} variant="contained">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
