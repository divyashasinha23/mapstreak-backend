const mongoose = require('mongoose');

const SliderSchema = new mongoose.Schema({
    image:{
        type:String
    },
    location:{

    }
});

const slider = mongoose.model('slider',SliderSchema);

module.exports = slider;