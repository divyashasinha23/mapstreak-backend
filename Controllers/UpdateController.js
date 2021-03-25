const mongoose = require('mongoose');
const Tiffin = require('../models/tiffinServiceModel');

module.exports.delete_tiffin_service = async(req,res) => {
    try{
    const user =  await Merchant.findById(res.locals.merchant);
    if(user){    
    const delete_service = await Tiffin.findOneAndDelete({_id: req.params.id});
    if(delete_service){
        res.status(201).json({
            msg:"Tiffin Service Deleted"
        });
    }
    else{
        res.json({
            msg: "No Such service Found"
        });
    }
}
else{
    res.send('You are not Logged in/ Permission denied');
}
}
catch(err)
{
  console.error(err);
  res.status(500).json({
    error: 'Server error',
  });
}
}