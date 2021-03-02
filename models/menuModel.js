const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
   tiffinservice:{
    type: String,
    ref:'Tiffin'
   },
   membership_plan:{
    Gold: { type: Boolean},
    Silver: { type: Boolean},
    Diamond: { type: Boolean}
   },
monthly_plan:{
    monthly:{type: Boolean},
    weekly:{type: Boolean}
   },
meal_for:{
     lunch:{type: Boolean},
     Dinner:{type: Boolean},
     Both:{type: Boolean}
   },
Delivery_type:{
    delivery:{type: Boolean},
    pickup:{type: Boolean}
   },
   Date:{
       type: String
   },
    veg_name:{
        type:String
    },
    Nonveg_name:{
        type:String
    },

});

const Menu= mongoose.model('Menu', MenuSchema);

module.exports = Menu;