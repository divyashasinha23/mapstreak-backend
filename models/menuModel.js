const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
   tiffinservice:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Tiffin'
   },
   membership_plan:{
    Gold: { type: Boolean},
    Silver: { type: Boolean},
    Diamond: { type: Boolean}
   },
monthly_plan:{
    monthly:{type: String},
    weekly:{type: String}
   },
meal_for:{
     lunch:{type: String},
     Dinner:{type: String},
     Both:{type: String}
   },
Delivery_type:{
    delivery:{type: String},
    pickup:{type: String}
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