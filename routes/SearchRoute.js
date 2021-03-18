const express = require('express');
const Tiffin = require('../models/tiffinServiceModel');
const router = express.Router();

router.get('/search', function(req,res,next) {
    var seacrhfield = req.query.name;
    Tiffin.find({name:{$regex: seacrhfield, $options: '$i'}}).then((data) => {
        res.status(200).json(data);
    })
});

// router.get('/search', function(req,res,next) {
//     var q = req.query.q;
//     Tiffin.find({
//         name:{
//             $regex : new RegExp(q)
//         }
//     },{
//         _id: 0,
//         __v: 0
//     },function(err, data) {
//         res.json(data);
//     }
//     ).limit(15);
// });

module.exports = router;