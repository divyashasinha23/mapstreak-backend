
const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModel');
const asyncHandler = require('express-async-handler');


const requireAuth_admin = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    try {
      token = req.headers.authorization.split(' ')[1].toString();
      const decodedToken = jwt.verify(token, process.env.MAPSTREAK_ADMIN);
      req.admin= await Admin.findById(decodedToken.id).select('-password');
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

module.exports =requireAuth_admin;
