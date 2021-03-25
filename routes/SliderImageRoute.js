const express = require('express');
const Upload = require('../Middleware/upload');
const slider = require('../models/SliderModel');
const SliderController = require('../Controllers/SliderController');
const router = express.Router();


router.get('/slider-images', SliderController.show_slider_image);
router.post('/slider-images', (req,res) => {
    Upload(req,res, (error => {
        if(error){
            console.log('error');
        }
        else{
            var obj= {
                image : req.file.key,
                location : req.file.location,
            }

            slider.create(obj, (err,item) => {
                if(err){
                    console.log(err);
                }
                else{
                    res.status(201).json({
                        obj,
                        msg:"Slider image added"
                    });
                }
            });
        }
    }));
});

module.exports = router;
