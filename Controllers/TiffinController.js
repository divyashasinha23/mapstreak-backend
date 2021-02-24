const asyncHandler = require('express-async-handler');
const Tiffin = require('../models/tiffinServiceModel');
const tiffinservices = require('../data/tiffinServices');


module.exports.get_tiffin  = asyncHandler(async (req, res) => {
    const tiffins = await Tiffin.find({});
    res.json(tiffins);
  });
  
  module.exports.getTiffinById = asyncHandler(async (req, res) => {
    const tiffin = await Tiffin.findById(req.params.id);
    if (tiffin) {
      res.json(tiffin);
    } else {
      res.status(404);
      throw new Error('No such Service found');
    }
  });
