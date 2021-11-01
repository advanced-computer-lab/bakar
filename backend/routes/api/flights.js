// TODO: Specifiy the API schema for flights, refer to issue #3 : https://github.com/advanced-computer-lab/bakar/issues/3
// also refer to issues #2, #4, #5 and #6.
const express = require('express');
const router = express.Router();
const flight = require('../../models/Flight.js')

router.post('/flight', function(req,res){
        if(req.body.departureTime < req.body.arrivalTime){
            if(req.body.seatsEcon >= 0 && req.body.seatsBus >= 0 && req.body.seatsFirst >= 0){
                if(req.body.departureLocation != req.body.arrivalLocation){    
                    const newFlight = new flight(req.body)

                    newFlight.save().then(result => {
                        res.send(result);
                        console.log("added");
                    })
                    .catch(err => {
                    console.log(err);                  
                    });
                }else{
                    throw "Arrival location isn't matching with departureLocation";
                }
            }else{
                throw "Invalid seatNumber";
            }
    }else{
        throw "Invalid departureTime or arrivalTime";
    }
});

router.get('/flight',function(req,res){
    flight.find({}).then(result => {
        res.send(result);
        console.log("added");
    })
    .catch(err => {
    console.log(err);                  
    });
})

module.exports = router;