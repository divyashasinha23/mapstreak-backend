
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// json web token is verified
const Auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    try {
      token = req.headers.authorization.split(' ')[1].toString();
      const decodedToken = jwt.verify(token, process.env.MAPSTREAK_USER);
      req.user = await User.findById(decodedToken.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('not authorized, no token');
    }
  if (!token) {
    res.status(401);
    throw new Error('not authorized, no token');
  }
});

module.exports = Auth;