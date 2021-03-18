const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const {requireAuth, current_User} = require('../Middleware/UserMiddleware');
// const aws = require( 'aws-sdk' );
// const multerS3 = require( 'multer-s3' );
// const multer = require('multer');
// const path = require( 'path' );
// const url = require('url');


//AWS Connection

// const s3 = new aws.S3({
//   accessKeyId: process.env.AWS_ID,
//   secretAccessKey: process.env.AWS_SECRET,
//   Bucket: process.env.AWS_BUCKET_NAME
//  });

//uploading images

// const Upload = multer({
//   storage: multerS3({
//    s3: s3,
//    bucket: process.env.AWS_BUCKET_NAME,
//    acl: 'public-read',
//    key: function (req, file, cb) {
//     cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
//    }
//   }),
//   limits:{ fileSize: 2000000 }, 
//  }).single('Image');



router.post('/login',UserController.post_login);
// console.log(req.file);
router.post('/signup',UserController.post_signup);
router.get('/profile',current_User);
router.get('/profile',requireAuth,UserController.get_profile);
router.get('/profile/:id', UserController.get_profile_by_id);
router.post('/update-profile', current_User);
router.post('/update-profile',requireAuth, UserController.update_profile);
router.post('/update-profile/:id',  UserController.update_profile_by_id);
router.post('/forgot-password',UserController.post_forgotpassword);
router.post('/reset-password',current_User);
router.post('/reset-password', requireAuth, UserController.post_resetpassword);






module.exports = router;