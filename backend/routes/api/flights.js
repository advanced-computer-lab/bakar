// TODO: Specifiy the API schema for flights, refer to issue #3 : https://github.com/advanced-computer-lab/bakar/issues/3
// also refer to issues #2, #4, #5 and #6.
const Flight = require('../models/Flight');
exports.viewFlights = (req, res) => {                                               
    Flight.find({})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
    };
    exports.updateFlight = (req,res)=>{
        Flight.findByIdAndUpdate(req.params.id,req.body).then(result =>{
    
            res.status(200).send("flight updated ");
            console.log('The flight is Updated successfully !');
        }).catch(err => {
            console.log(err);
          });
    
      };
   