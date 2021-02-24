
const jwt = require('jsonwebtoken');
const Merchant = require('../models/merchantModel');
const nodemailer = require('nodemailer');


//create token
const maxAge = 1 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, 'mapstreak-merchant', {
    expiresIn: maxAge,
    });
};
//error handling
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '', mobile_no:'' , confirmPassword: ''};

  if(err.message === "password does not match"){
     errors.confirmPassword = "Password did not match";
  }

  if (err.code === 11000) {
    if(err.message.includes("mobile_no_1")){
    errors.mobile_no = 'Mobile Number Already Registered';
    }
    else{
     errors.email = 'That Email is Already Registered';
    }
    
}

  if(err.message === "invalid Email id"){
    errors.email = "Please enter a valid Email ID";
  }
  
  if(err.message === "invalid mobile number"){
    errors.mobile_no = "Invalid mobile number or Mobile number not Registered";
  }

  if(err.message === "incorrect password"){
    errors.password = "Password is incorrect";
    
  }


  if (err.message.includes('Merchant validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
return errors;
}


//signup
module.exports.merchant_get_signup = async (req,res)=>
{
  res.render('merchant_signup');
}


module.exports.merchant_post_signup = async(req,res)=>
{
  const {full_name,address,mobile_no,email,password,confirmPassword}=req.body;
  try{
      if(password == confirmPassword){
       const merchant= await Merchant.create({full_name,address,email,password,mobile_no,confirmPassword});
       const token  = createToken(merchant._id);
       res.cookie('jwt',token,{ httpOnly: true, maxAge: maxAge * 1000 });
         res.status(201);
         res.json({
          _id:merchant._id,
          name:merchant.full_name,
          password:merchant.password,
          email:merchant.email,  
          mobile_no:merchant.mobile_no,  
          address:merchant.address, 
          confirmPassword:merchant.confirmPassword, 
          token:token
        });
      }
      else{
        throw Error('password does not match')
      }
        }
    catch(err)
    {
      const errors = handleErrors(err);
      res.status(400).json({errors});
    }
 
}



//login
module.exports.merchant_get_login = async(req,res) => {
 res.render('merchant_login');
}

module.exports.merchant_post_login = async (req,res) => {
  const {mobile_no, password} = req.body;
  try{
    const merchant = await Merchant.login(mobile_no,password);
    const token = createToken(merchant._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
     res.status(201).json({
       _id : merchant._id,
       password: merchant.password,
       mobile_no: merchant.mobile_no,
       token: token
     });  
    }
      catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
      }
}

// module.exports.getMerchnat = async(req,res) => {
//   res.render('submitted');
// }