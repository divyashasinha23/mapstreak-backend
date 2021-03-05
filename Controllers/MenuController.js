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

  module.exports.get_menu_tiffin = async(req,res,next) => {
      const menu = await Menu.findById(req.params.id);
      res.json(menu);
    }