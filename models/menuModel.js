const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
   tiffinservice:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Tiffin'
   },
    veg_name:{
        type:String
    },
    veg_price:{
        type:String
    },
    Nonveg_name:{
        type:String
    },
    Nonveg_price:{
        type:String
    }
});

const Menu= mongoose.model('Menu', MenuSchema);

module.exports = Menu;