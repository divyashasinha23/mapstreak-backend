const mongoose = require('mongoose');
const Order = require('../models/orderModel');


  module.exports.post_order = async(req,res,next) => {
    try{
      const order = await Order.create(req.body);
      res.status(201).json({
        success:true,
        data:order,
      });
    }
    catch(err){
      res.status(400);
      console.log(err);
    }
  }

  module.exports.get_order_by_id = async(req,res,next) => {
      try{
          const orders = await Order.find({user: req.params.id},null, {sort: {'createdAt': -1 }}).
          populate('Menu').exec( (err, orders) => {
            res.json(orders);
        })
      }
      catch(err){
        console.error(err);
        res.status(500).json({
          error: 'Server error',
        });
      }
  }