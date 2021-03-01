const mongoose = require('mongoose');
const Partner = require('../models/partnerModel');

module.exports.post_form = async(req,res) => {
    const {outletName, state,  city, primary_location, pincode, outlettype, contact_person, name, phone_no, type_of_cusines, services, time_from, time_to}=req.body;
    try{
        const partner = await Partner.create({outletName, state,city, primary_location, pincode, outlettype, contact_person, name, phone_no, type_of_cusines, services, time_from, time_to});
        if(partner){
            res.json({
                _id: partner._id,
                outletName:partner.outletName,
                state:partner.state,
                city:partner.city,
                primary_location:partner.primary_location,
                pincode:partner.pincode,
                outlettype:partner.outlettype,
                contact_person:partner.contact_person,
                name:partner.name,
                phone_no:partner.phone_no,
                type_of_cusines:partner.type_of_cusines,
                services:partner.services,
                time_from:partner.time_from,
                time_to:partner.time_to
            });

        }
        else{
            res.status(401).json({msg: "invalid details"});
        }
    }
    catch(err){
        console.log(err);
    }

}