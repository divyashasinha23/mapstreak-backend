const mongoose = require("mongoose");


const plan1Schema = mongoose.Schema({
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
   tiffinservice:{
    type:String,
    ref:'Tiffin'
},
});

const plan2Schema = mongoose.Schema({
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
    tiffinservice:{
        type:String,
        ref:'Tiffin'
    },
 });

 const plan3Schema = mongoose.Schema({
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
          plan1:[plan1Schema],
          plan2:[plan2Schema],
          plan3:[plan3Schema]    
      },
      Nonveg_plan:{
        plan1:[plan1Schema],
        plan2:[plan2Schema],
        plan3:[plan3Schema]    
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
      order_now:{type:Boolean,default:false},
      order_later:{type:Boolean,default:false}
  },
  Date:{
      type:String
  }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;