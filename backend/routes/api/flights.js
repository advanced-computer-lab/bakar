const express = require("express");
const router = express.Router();
const Flight = require("../../models/Flight");


router.post("/",async (req, res) => {
  if (req.body.departureTime < req.body.arrivalTime) {
    if (req.body.seatsEcon >= 0 && req.body.seatsBus >= 0) {
      if (req.body.departureLocation != req.body.arrivalLocation) {
        const newFlight = new Flight(req.body);
        try {
          await newFlight.save();
          res.sendStatus(200);
          console.log("added");
        } catch (err) {
          console.log(err);
        }
      } else {
        throw "Arrival location isn't matching with departureLocation";
      }
    } else {
      throw "Invalid seatNumber";
    }
  } else {
    throw "Invalid departureTime or arrivalTime";
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await Flight.find(req.query).exec();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:flightNo", async (req, res) => {
  const header = req.headers.authorization
  const decoded = jwt.verify(header.slice(7, header.length), "tom&jerry");
  console.log(decoded);
  try {
    await Flight.updateOne({ flightNo: req.params.flightNo }, req.body).exec();
    res.status(200).send("flight updated ");
    console.log("The flight is Updated successfully !");
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:flightNo", async (req, res) => {
  try {
    const dbResult = await Flight.deleteOne({
      flightNo: req.params.flightNo,
    }).exec();
    res.status(200).send(dbResult);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting request");
  }
});

router.get("/:flightNo", async (req,res) =>{
  try{
      const dbResult = await Flight.find({flightNo : req.params.flightNo}).exec();
      console.log(dbResult);
      res.send(dbResult).status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting request");
  }
})

router.post("/delete", async (req, res) => {
  try {
    const dbResult = await Flight.deleteMany(flights).exec();
    res.status(200).send(dbResult);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting request");
  }
});

module.exports = router;
