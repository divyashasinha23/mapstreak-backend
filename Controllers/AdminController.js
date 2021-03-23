const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModel');


//create token
const maxAge = 1 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, 'mapstreak-admin', {
    expiresIn: maxAge,
    });
};

//error handling
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', mobile_no:''};
  
    if (err.code === 11000) {
      if(err.message.includes("mobile_no_1")){
      errors.mobile_no = 'Mobile Number Already Registered';
      }
      else{
       errors.email = 'That Email is Already Registered';
      }
      
  }
  
    if(err.message === "invalid adminname"){
      errors.email = "Invalid Email id/ Mobile Number";
     
    }
  
    if(err.message === "incorrect password"){
      errors.password = "Password is incorrect";
      
    }
  
  
    if (err.message.includes('Admin validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
  return errors;
  }
  

//signup


module.exports.admin_post_signup= async(req,res)=>
{
  const {name,email,password,mobile_no,image}=req.body;
 
  try{
       const admin=await Admin.create({name,email,password,mobile_no,image});
       const token =createToken(admin._id);
       res.cookie('jwt',token,{ httpOnly: true, maxAge: maxAge * 1000 })
       if(admin){
         res.status(201);
         res.json({
           _id:admin._id,
           name:admin.name,
           password:admin.password,
           email:admin.email,   
           mobile_no:admin.mobile_no,
           image:admin.image,
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


module.exports.admin_post_login = async (req,res) => {
    const {adminname} = req.body
    const {password} = req.body
    try{
      const admin = await Admin.login(adminname,password);
      const token = createToken(admin._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
       res.status(201).json({
         _id : admin._id,
         password: admin.password,
         email: admin.email,
         mobile_no: admin.mobile_no,
         token:token
       });  
      }
        catch(err){
          const errors = handleErrors(err);
          res.status(400).json({errors});
        }
  }

  
//update-profile

module.exports.update_profile = async(req,res) => {
    try{
    const {newemail} = req.body;
    const {newMobileNumber} = req.body;
    const {image} = req.body;
  
    await Admin.findOneAndUpdate({_id: res.locals.Admin._id}, {
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
  
  //profile
  
  module.exports.get_profile = async (req, res) => {
    try{
    const admin = await Admin.findById(res.locals.admin);
  
    if (this.admin_post_login) {
      res.json({
        name: admin.full_name,
        mobile_no:admin.mobile_no,
        email: admin.email,
        password: admin.password,
      
      });
    } else {
      res.status(404);
      throw new Error('admin not found');
    }
  }
  catch(err){
    console.log(err);
  }
  };