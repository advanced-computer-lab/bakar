const jwt = require("jsonwebtoken");
require('dotenv').config();

const auth = (req, res, next) => {
    
    try{
    const token = req.headers.authorization.slice(7);
    console.log(token);
    if(!token){
        return res.status(403).send("User does not have a token issued.");
    }
        jwt.verify(token, process.env.secretKey);
        next();
    } catch(err){
        console.log(err);
    }
}

module.exports = auth;