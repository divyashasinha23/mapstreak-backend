const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const url = require('url');


// AWS Connection

const s3 = new aws.S3({
  accessKeyId: 'AKIATPW2NNB2K7L4RCO2',
  secretAccessKey: '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',
  Bucket: 'image-bucket-mapstreak'
 });

//uploading images

const Upload = multer({
  storage: multerS3({
   s3: s3,
   bucket: 'image-bucket-mapstreak',
   acl: 'public-read',
   key: function (req, file, cb) {
    cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
   }
  }),
  limits:{ fileSize: 2000000 }, 
 }).single('image');

 module.exports = Upload;