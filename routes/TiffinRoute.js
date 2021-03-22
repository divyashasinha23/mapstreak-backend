const express = require('express');
const router = express.Router();
const TiffinContoller = require('../Controllers/TiffinController');
const Upload = require('../Middleware/upload');

router.route('/').get(TiffinContoller.get_tiffin).post(TiffinContoller.post_tiffin); 


module.exports = router;


// var obj = {
//     _id:req.body._id,
//     name:req.body.name,
//     address:req.body.address,
//     cusines: req.body.cusines,
//     Time: req.body.Time,
//     Discount: req.body.Discount,
//     numReviews: req.body.numReviews,
//     service: req.body.service,
//     image : req.file.key,
//     location : req.file.location,
// }