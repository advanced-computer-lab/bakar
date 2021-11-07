const express = require("express");
const router = express.Router();
const Flight = require("../../models/Flight");

router.post("/", async (req, res) => {
  console.log(req.body);
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
    const result = await Flight.find({}).exec();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:flightNo", async (req, res) => {
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

router.post("/delete", async (req, res) => {
  console.log(req.body);
  const flights = req.body.deleteQuery;
  try {
    const dbResult = await Flight.deleteMany(flights).exec();
    res.status(200).send(dbResult);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting request");
  }
});

module.exports = router;
