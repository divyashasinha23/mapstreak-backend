const mongoose = require("mongoose");


const GoldSchema = mongoose.Schema({
   Weekly_price: {
       type:String
   },
   Monthly_price:{
       type:String
   },
   image:{
    type:String
},
   tiffinservice:{
    type:String,
    ref:'Tiffin'
},
});

const SilverSchema = mongoose.Schema({
    Weekly_price: {
        type:String
    },
    Monthly_price:{
        type:String
    },
    image:{
        type:String
    },
    tiffinservice:{
        type:String,
        ref:'Tiffin'
    },
 });

 const DiamondSchema = mongoose.Schema({
    Weekly_price: {
        type:String
    },
    Monthly_price:{
        type:String
    },
    image:{
        type:String
    },
    tiffinservice:{
        type:String,
        ref:'Tiffin'
    },
 });

const menuSchema = new mongoose.Schema({
  tiffinservice:{
      type:String,
      ref:'Tiffin',
      unique:true
  },
  plan:{
      veg_plan:{
          Gold: [GoldSchema],
          Silver:[SilverSchema],
          Diamond:[DiamondSchema],
      },
      Nonveg_plan:{
        Gold: [GoldSchema],
        Silver:[SilverSchema],
        Diamond:[DiamondSchema],
      }
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
      lunch: {type:Boolean},
      Dinner: {type:Boolean},
      Both:{type:Boolean}
  },
  Date:{
      type:String
  }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;