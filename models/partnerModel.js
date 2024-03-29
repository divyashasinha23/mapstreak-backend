const mongoose = require('mongoose');


const partnerSchema = new mongoose.Schema
({
    outletName : {
        type: String,
        required: true
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    primary_location: {
        type: String
    },
    pincode : {
        type: Number
    },
    outlettype: {
        Cloud_kitchen: { type: Boolean},
        Resturent: { type: Boolean},
        others: { type: Boolean}
        
    },
    contact_person: {
        type: String
    },
    name :{
        type: String
    },
    phone_no : {
        type: Number
    },
    type_of_cusines :{
       type: String
    },
    services: {
        // deleviery: { type: Boolean, required: true,default:false},
        // walkin: { type: Boolean, required: true,default:false}
        delivery: {type: Boolean},
        walkin: {type: Boolean}
    },
    specify:{
        type: String
    },
    time_from: {
        type : String
    },
    time_to: {
    type: String
    },
    image: {
       type: String
    }
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;