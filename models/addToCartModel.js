const mongoose = require("mongoose");




 const Extra = mongoose.Schema({
     name:{
         type:String
     },
     price:{
         type:String
     },
     qty:{
         type:Number
     }
 })
 
 const addToCartSchema = new mongoose.Schema({
   user:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required:true,
  },
  tiffinservice:{
    type:String,
    ref:'Tiffin',  
},
   plan:{
    name:{
        type:String
    },
    Weekly_price: {
        type:String
    },
    Monthly_price:{
        type:String
    },
    Day_price:{
        type:String
      },
    image:{
        type:String
    },

   },
   extras:{
       extra1: [Extra],
       extra2: [Extra],
       extra3: [Extra],
       extra4: [Extra],
       extra5: [Extra],
   },
   coupon:{
     type:String,
      
 },
 coupon_company:{
     type:String,
     ref:'Service'
 },
   delivery:{
       price:{
           type: String
       }
   },
   pickup:{
       price:{
           type:String
       }
   },
   meal_for:{
       lunch: {type:Boolean,default:false},
       Dinner: {type:Boolean,default:false},
       Both:{type:Boolean,default:false}
   },
   order_for:{
       order_now:{type:Boolean,default:false},
       order_later:{type:Boolean,default:false}
   },
   Date:{
       type:String
   },
   totalPrice:{
    type:String
   }
 });
 

 const addToCart = mongoose.model('addToCart', addToCartSchema);

module.exports = addToCart;