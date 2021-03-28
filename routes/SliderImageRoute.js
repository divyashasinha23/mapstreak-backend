
//Admin Roles

const express = require('express');
const Upload = require('../Middleware/upload');
const slider = require('../models/SliderModel');
const SliderController = require('../Controllers/SliderController');
const {requireAuth_admin, currentAdmin} = require('../Middleware/AdminMiddleware');
const router = express.Router();

//view all slider images in user app
router.get('/slider-images', SliderController.show_slider_image);

//Admin can only post slider images(Admin Roles)
router.post('/slider-images',currentAdmin);
router.post('/slider-images', requireAuth_admin, (req,res) => {
    Upload(req,res, (error => {
        if(error){
            console.log(error);
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

//admin can update slider images by slider-image-id
router.post('/update-slider-image', currentAdmin);
router.post('/update-slider-image/:id', requireAuth_admin,(req,res) => {
    Upload(req,res, (error => {
        if(error){
            console.log(error);
        }
        else{
            var obj= {
                image : req.file.key,
                location : req.file.location,
            }

            slider.findByIdAndUpdate({_id: req.params.id},obj, (err,item) => {
                if(err){
                    console.log(err);
                }
                else{
                    res.status(201).json({
                        obj,
                        msg:"Slider image Updated"
                    });
                }
            });
        }
    }))
}  )

module.exports = router;
