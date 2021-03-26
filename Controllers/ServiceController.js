const asyncHandler = require('express-async-handler');
const Service = require('../models/ServiceModel');


module.exports.get_services  = asyncHandler(async (req, res) => {
    const services = await Service.find({});
    res.json(services);
  });
  
  module.exports.get_services_by_id = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);
    if (service) {
      res.json(service);
    } else {
      res.status(404);
      throw new Error('No such Service found');
    }
  });


  module.exports.delete_service = async(req,res) => {
    try{
    const delete_Service = await Service.findOneAndDelete({_id: req.params.id});
    if(delete_Service){
      res.status(201).json({
        msg:"Service Deleted Successfully",
      });
    }
    else{
      res.json({
        msg: "No such Service found",
      });
    }
  }
  catch(err){
    console.log(err);
    res.status(400).json({
      msg: "Server Error"
    });
  }

  }


  