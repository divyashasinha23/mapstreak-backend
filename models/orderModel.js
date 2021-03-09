const mongoose = require('mongoose');

const orderSchema =  new mongoose.Schema
({
    user: {
      type: String,
     
      ref: 'User',
    },
     tiffinservice: {
          type: String,
         
          ref: 'Tiffin',
        },
    deliveryAddress: {
      address: { type: String,  },
      city: { type: String},
      postalCode: { type: String},
      country: { type: String},
    },
    paymentMethod: {
      type: String,
    },
    paymentResult: {
      order_id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      
      default: 0.0,
    },
    deliveryPrice: {
      type: Number,
     
      default: 0.0,
    },
    totalPrice: {
      type: Number,
    
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
    
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
     
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  
});


const Order = mongoose.model('Order', orderSchema)

module.exports = Order;