const asyncHandler = require('express-async-handler');
const Tiffin = require('../models/tiffinServiceModel');
const Menu = require('../models/menuModel');



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

  module.exports.post_tiffin = async (req,res,next) => {
    try{
    const tiffin = await Tiffin.create(req.body);
    res.status(201).json({
      success: true,
      _id: tiffin._id,
      cusines: tiffin.cusines,
      address:tiffin.address,
      Rating:tiffin.Rating,
      image:tiffin.image,
      Discount:tiffin.Discount,
      name:tiffin.name,
      Time:tiffin.Time
    });
    
  }
  catch(err){
    res.status(400);
    console.log(err);
  }
  }

  module.exports.post_menu_tiffin = async(req,res,next) => {
    try{
      const menu = await Menu.create(req.body);
      res.status(201).json({
        success:true,
        data:menu,
      });
    }
    catch(err){
      res.status(400);
      console.log(err);
    }
  }

  module.exports.get_menu_tiffin = async(req,res,next) => {
      const menu = await Menu.find({});
      res.json(menu);
    }
  