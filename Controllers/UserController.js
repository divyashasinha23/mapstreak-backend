
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');



mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


//create token
const maxAge = 1 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, 'mapstreak', {
    expiresIn: maxAge,
    });
};
//error handling
//error handling
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '', mobile_no: ''};

  if (err.code === 11000) {
    if(err.message.includes("mobile_no_1")){
    errors.mobile_no = 'Mobile Number Already Registered';
    }
    else{
     errors.email = 'That Email is Already Registered';
    }
    
}

  if(err.message === "invalid Email id"){
    errors.email = "Invalid Email ID";
   
  }

  if(err.message === "incorrect password"){
    errors.password = "Password is incorrect";
    
  }


  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
return errors;
}


//signup


module.exports.post_signup = async(req,res)=>
{
  const {name,email,password,mobile_no}=req.body;
  try{
       const user=await User.create({name,email,password,mobile_no});
       const token =createToken(user._id);
       res.cookie('jwt',token,{ httpOnly: true, maxAge: maxAge * 1000 })
       if(user){
         res.status(201);
         res.json({
           _id:user._id,
           name:user.name,
           password:user.password,
           email:user.email,   
           mobile_no:user.mobile_no,
           token:token
         });
       }
       else{
        res.status(400);
        throw new Error ('Invalid details');   
       }

    }
    catch(err)
    {
      const errors = handleErrors(err);
      res.status(400).json({errors});
    }
 
}



//login


module.exports.post_login = async (req,res) => {
    const {email, password} = req.body;
    try{
      const user = await User.login(email,password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
       res.status(201).json({
         _id : user._id,
         password: user.password,
         email: user.email,
         token:token
       });  
      }
        catch(err){
          const errors = handleErrors(err);
          res.status(400).json({errors});
        }
  }


//forget-password

module.exports.post_forgotpassword = async(req,res) =>{
    try{
      const {email} = req.body;
      const user =  await User.findOne({email});
      if(!user){
        res.json({message: "This email id does not exists"});
      }
     const token = createToken(user._id);  
     var transporter = nodemailer.createTransport({
            host: "smtpout.secureserver.net",
            secure: true,
            secureConnection: false, // TLS requires secureConnection to be false
            tls: {
                ciphers:'SSLv3'
            },
            auth: {
              user: process.env.USER,
              pass: process.env.PASS
            },
          });
      
          var mailOptions = {
            from: process.env.USER,
            to: user.email,
            subject:'Forgot password Request',
            text:'mail',
            html: `
             <h2>Please click on the link to  reset your password</h2>
             <p>${process.env.CLIENT_URL}/reset-password/${token}</p>
            `
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              res.json({
                email: user.email,
              })
            }
          });
        }
        catch(err){
          console.log(err);
        }
      }


//reset-password
      
module.exports.post_resetpassword = async(req,res) => {
  try{
  const {newPassword} = req.body;
  const passwordHash = await bcrypt.hash(newPassword, 12)
console.log(newPassword);
console.log(res.locals.user);  
  await User.findOneAndUpdate({_id: res.locals.user._id},{
    password: passwordHash
  });
  res.json({
    newPassword: newPassword,
  });
 }
catch(err){
  console.log(err);
}

}

//update-profile

    module.exports.update_profile = async(req,res) => {
      try{
      const {newemail} = req.body;
      const {newMobileNumber} = req.body;
      const {image} = req.body;

      await User.findOneAndUpdate({_id: res.locals.user._id}, {
        email:newemail,
        mobile_no: newMobileNumber,
        image: image
      })
  
      res.json({
        email: newemail,
        mobile_no: newMobileNumber,
        image: image
      });
    }
    catch(err){
      console.log(err);
    }
    }  

//

    module.exports.get_profile = async (req, res) => {
      try{
      const user = await User.findById(res.locals.user);
    
      if (user) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile_no: user.mobile_no,
          image: user.image
        });
      } else {
        res.status(404);
        throw new Error('user not found');
      }
    }
    catch(err){
      console.log(err);
    }
    };