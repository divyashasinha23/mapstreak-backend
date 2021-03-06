const mongoose = require('mongoose');
const Menu = require('../models/menuModel');



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

  module.exports.get_menu_tiffin = async (req, res, next) => {
    try {
      const menu = await Menu.find();
  
      return res.status(200).json({
        success: true,
        data: menu,
      });
    } catch (error) {
      console.error(err);
      res.status(500).json({
        error: 'Server error',
      });
    }
  };