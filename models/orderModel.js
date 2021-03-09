const mongoose = require('mongoose');

const orderSchema =  new mongoose.Schema
({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
     tiffinservice: {
          type: String,
          required: true,
          ref: 'Tiffin',
        },
    deliveryAddress: {
      address: { type: String, required: true },
      city: { type: String,required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    phone:{
      type: Number,
      required: true
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
  
  
},
{timestamps: true}
);


const Order = mongoose.model('Order', orderSchema)

module.exports = Order;