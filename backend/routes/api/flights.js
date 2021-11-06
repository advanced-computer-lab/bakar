// TODO: Specifiy the API schema for flights, refer to issue #3 : https://github.com/advanced-computer-lab/bakar/issues/3
// also refer to issues #2, #4, #5 and #6.
const express = require('express');
const router = express.Router();
const Flight = require('../../models/Flight');

router.post('/', function(req,res){
        if(req.body.departureTime < req.body.arrivalTime){
            if(req.body.seatsEcon >= 0 && req.body.seatsBus >= 0 && req.body.seatsFirst >= 0){
                if(req.body.departureLocation != req.body.arrivalLocation){    
                    const newFlight = new Flight(req.body)

                    newFlight.save().then(result => {
                        res.sendStatus(200);
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

router.get('/', (req, res) => {
  Flight.find({})
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  });
});

router.put('/:id', (req, res) => {
  Flight.findByIdAndUpdate(req.params.id,req.body)
  .then(result =>{
    res.status(200).send("flight updated ");
    console.log('The flight is Updated successfully !');
  })
  .catch(err => {
    console.log(err);
  });

});

router.delete('/:id', async (req, res) => {
  try {
    const dbResult = await Flight.findByIdAndDelete(req.params.id);
    res.status(200).send(dbResult);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting request");
  }
});

router.delete('/', async (req, res) => {
  try {
    const dbResult = await Flight.deleteMany(req.body);
    res.status(200).send(dbResult);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting request");
  }
});

module.exports = router;
