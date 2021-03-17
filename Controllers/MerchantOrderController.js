const mongoose = require('Mongoose');
const Order = require('../models/orderModel');

module.exports.get_orders = async(req,res) => {
    const order = await Order.find({ status: { $ne: 'completed'}}, null, {sort : {'createdAt' : -1}}).
    populate('user', '-password').exec( (err, orders) => {
        res.json(orders);
    })

}