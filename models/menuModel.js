const mongoose = require("mongoose");


const GoldSchema = mongoose.Schema({
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
    Day_price:{
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
    Day_price:{
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

const Extra = mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:String
    }
})

const menuSchema = new mongoose.Schema({
  tiffinservice:{
      type:String,
      ref:'Tiffin',
      unique:true
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
      lunch: {type:Boolean},
      Dinner: {type:Boolean},
      Both:{type:Boolean}
  },
  order_for:{
      order_now:{type:Boolean},
      order_later:{type:Boolean}
  },
  Date:{
      type:String
  }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;