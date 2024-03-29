const mongoose=require("mongoose");
// const geocoder = require('../utils/geocoder');

const tiffinSchema = new mongoose.Schema
({
   
    _id:{
        type:String,
        unique: true
      },
    Merchant:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Merchant'
    }, 
    Admin:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Admin'
    },
    image:{
      type: String
    },
    location:{

    },
     name:{
     type: String
     },
     address:{
       type:String
     },
     cusines:[{
       type:String
     }],
     Time:{
       type:String
     },
     Discount:{
      type:String
     },
     numReviews:{
      type: Number,
     },
     service:{
          type:String,
          ref:'Service',
          unique:true
     },
     isOpen:{
       type: Boolean,
       deafult: false
     },
//  location:{
//      //GeoJSON Point
//      type: {
//         type: String, 
//         enum: ['Point'], 
//       },
//       coordinates: {
//         type: [Number],
//         index: '2dsphere'
//       },
//       formattedAddress: String,
//       street: String,
//       city: String,
//       state: String,
//       country: String,
//      },
 Rating:{
     type:Number
 },
 createdAt:{
   type:Date,
   default:Date.now()
 },
});

//Geocoder 
// tiffinSchema.pre('save', async function(next) {
//  const loc = await geocoder.geocode(this.address);
//  this.location = {
//      type: 'point',
//      coordinates: [loc[0].longitude, loc[0].latitude],
//      formattedAddress: loc[0].formattedAddress,
//      street: loc[0].streetName,
//      city: loc[0].city,
//      zipcode: loc[0].zipcode,
//      country: loc[0].countryCode
//  };
// });


const Tiffin= mongoose.model('Tiffin', tiffinSchema);

module.exports = Tiffin;