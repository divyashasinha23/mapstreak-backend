const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    _id:{
        type:String,
        unique: true
    },
    text:{
        type:String
    },
    image:{
        type:String
    }
});

const service = mongoose.model('Service',serviceSchema);

module.exports = service;
