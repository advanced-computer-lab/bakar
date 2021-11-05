// TODO: Specifiy the API schema for flights, refer to issue #3 : https://github.com/advanced-computer-lab/bakar/issues/3
// also refer to issues #2, #4, #5 and #6.
const Flight = require("../models/Flight");
exports.viewFlights = (req, res) => {
  Flight.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.updateFlight = (req, res) => {
  Flight.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).send("flight updated ");
      console.log("The flight is Updated successfully !");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteFlight = async (req, res) => {
  try {
    const dbResult = await Flight.findByIdAndDelete(req.params.id);
    res.status(200).send(dbResult);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting request");
  }
};

exports.deleteFlights = async (req, res) => {
  try {
    const dbResult = await Flight.deleteMany(req.body);
    res.status(200).send(dbResult);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting request");
  }
};
