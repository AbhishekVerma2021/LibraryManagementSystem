const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

const authenticate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const token = authorization.split('Bearer ')[1];
    if(!authorization || !token) {
      res.status(401).send('Not Authorized!!');
    }
    const verifyToken = jwt.verify(token, 'MY_SECRET_KEY_ABHISHEK_VERMA');
    const user = await Users.findOne({ _id: verifyToken._id });
    if(!user) {
      res.status(401).send('User not found!!!');
    };
    req.user = user;
    next();
  }
  catch (err) {
    console.error(err); // Log the error for debugging
    res.status(401).send('Authentication failed'); // Send a generic error message to the client
  }
  
};

module.exports = authenticate;