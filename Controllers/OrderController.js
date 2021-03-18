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

//get order by user id
  module.exports.get_order_by_id = async(req,res,next) => {
      try{
        const user_orders = await Order.find({user: req.params.id},{ Tiffin: 1, Menu: 1, Order_Date:1, status: 1 },
          {sort : {createdAt: -1}});
          if(user_orders){
            res.status(201).json({
               user_orders
            });
          }
        }
      catch(err){
        console.error(err);
        res.status(500).json({
          error: 'Server error',
        });
      }
  }

//get order details by order_id

module.exports.get_order_by_orderid = async(req,res) => {
  try{
    const orders = await Order.findById(req.params.id);
    if(orders){
      res.status(201).json({
        data: orders
      });
    }
  }
  catch(err){
    console.error(err);
    res.status(500).json({
      error: 'Server error',
    });
  }
}