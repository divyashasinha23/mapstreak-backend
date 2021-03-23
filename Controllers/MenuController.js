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

  module.exports.get_menu_tiffin_by_id = async (req, res, next) => {
    try {
      const menu = await Menu.findOne({tiffinservice: req.params.id});
      return res.status(200).json({
        data: menu,
      });
    } catch (error) {
      console.error(err);
      res.status(500).json({
        error: 'Server error',
      });
    }
  };

  module.exports.update_menu_tiffin_by_id=async(req,res,next)=>{
  try{
    const {plan} = req.plan;  
    const {extras} = req.extras;
    const {coupon} = req.coupon;
    await Menu.findOneAndUpdate({_id: req.params.id}, {
      plan: newplan,
     extras:newextras,
      coupon: newcoupon,
      
    })
    res.json({
      name: newname,
      email: newemail,
      mobile_no: newMobileNumber,
      image: image,
      msg:"Menu updated successfully"
    });
  }
  catch(err){
    console.log(err);
  }
  } 