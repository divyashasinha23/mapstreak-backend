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

  module.exports.post_services = async (req,res,next) => {
    try{
    const service = await Service.create(req.body);
    res.status(201).json({
     success: true,
     data:service
    });
    
  }
  catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Server error',
    });
  }
  }


  