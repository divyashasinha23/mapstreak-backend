const mongoose = require('mongoose');

var allOrdersSchema = new mongoose.Schema({
    merchant:{
         type: mongoose.Schema.Types.ObjectId,
         required:true,
         ref: "Merchant"
    },
    tiffinservice_item:{
        type: String,
        ref: "Tiffin"
        },
    customer_name:{
        type: String,
        required: true
    },
    Address: {
        address: { type: String, required: true },
        city: { type: String,required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
      },
    phone:{
        type: Number,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
});

const AllOrder = mongoose.model('AllOrder', allOrdersSchema);

module.exports = AllOrder;