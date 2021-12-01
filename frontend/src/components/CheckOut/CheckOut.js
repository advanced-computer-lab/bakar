import * as React from "react";
import axios from "../../api";
import Button from "@mui/material/Button";
import DoneIcon from '@mui/icons-material/Done';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogActions } from "@mui/material";
export default function  CheckOut(probs) {
    const getData = async (queryString) => {
        const res = await axios.get("/flights?flightNo=" + queryString);
        console.log(res.data[0]);
        return res.data[0];
      };
    const [open, setOpen] = React.useState(false);
    const [departurePrice, setPrice] = React.useState(false);
    const [returnPrice, setReturnPrice] = React.useState(false);
    const [flightData, setFlightData] = React.useState({flightNo:"",departureTime:""});
    const [returnData, setReturnData] = React.useState({flightNo:"",departureTime:""});
    const  handleClickOpen = async () => {
        setPrice(()=>{
            if(probs.departureCabin==="Economy")
                return true;
            else{
                return false;
            }
        })
        setReturnPrice(()=>{
            if(probs.returncabin==="Economy")
                return true;
            else{
                return false;
            }
        })
        setFlightData(await getData(probs.departureflightNo)); 
        setReturnData(await getData(probs.returnFlightNo))
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    return(
        <div>
            <Button
            variant = "contained"
            starticon = {<DoneIcon/>}
            onClick={handleClickOpen}
            >
                Check out
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Check out</DialogTitle>
                <DialogContent>
                    <DialogTitle>Departure flight</DialogTitle>
                    <DialogContentText>Flight Number : {flightData.flightNo}</DialogContentText>
                    <DialogContentText>Date : {flightData.departureTime.substring(0,10)}</DialogContentText>
                    <DialogContentText>Time : {flightData.departureTime.substring(11,19)}</DialogContentText> 
                    <DialogContentText>Cabin : {probs.departureCabin}</DialogContentText>
                    <DialogContentText>Price : {departurePrice? flightData.priceEcon : flightData.priceBus}</DialogContentText>
                    <DialogTitle>Return flight</DialogTitle>
                    <DialogContentText>Flight Number : {returnData.flightNo}</DialogContentText>
                    <DialogContentText>Date : {returnData.departureTime.substring(0,10)}</DialogContentText>
                    <DialogContentText>Time : {returnData.departureTime.substring(11,19)}</DialogContentText> 
                    <DialogContentText>Cabin : {probs.returncabin}</DialogContentText>
                    <DialogContentText>Price : {returnPrice? returnData.priceEcon : returnData.priceBus}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                    variant="contained">
                    {/*onClick=*/}
                    Proceed
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}