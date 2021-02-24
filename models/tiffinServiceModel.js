const mongoose=require("mongoose");


const tiffinSchema = new mongoose.Schema
({
    _id:{
        type:String
      },
    menu:{
           type: mongoose.Schema.Types.ObjectId,
           required:true,
           ref:'Menu'
    },
     name:{
     type: String
     },
 location:{
     type: String
 },
 Rating:{
     type:Number
 },
});
const Tiffin= mongoose.model('Tiffin', tiffinSchema);

module.exports = Tiffin;