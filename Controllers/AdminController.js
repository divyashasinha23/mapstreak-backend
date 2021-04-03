const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModel');
const service = require('../models/ServiceModel');
const Tiffin = require('../models/tiffinServiceModel');


//create token
const maxAge = 1 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.MAPSTREAK_ADMIN, {
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
  const {name,email,password,mobile_no}=req.body;
 
  try{
       const admin=await Admin.create({name,email,password,mobile_no});
       const token =createToken(admin._id);
      //  res.cookie('jwt',token,{ httpOnly: true, maxAge: maxAge * 1000 })
       if(admin){
         res.status(201);
         res.json({
           _id:admin._id,
           name:admin.name,
           password:admin.password,
           email:admin.email,   
           mobile_no:admin.mobile_no,
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
      // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
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


// module.exports.update_admin_profile = async(req,res) => {
//   try{
//   const {newname} = req.body; 
//   const {newemail} = req.body;
//   const {newMobileNumber} = req.body;
//   const {image} = req.body;


//   await Admin.findOneAndUpdate({_id: res.locals.admin._id}, {
//     name: newname,
//     email:newemail,
//     mobile_no: newMobileNumber,
//     image: image
//   })

//   res.json({
//     name: newname,
//     email: newemail,
//     mobile_no: newMobileNumber,
//     image: image,
//     msg:"profile updated successfully"
//   });
// }
// catch(err){
//   console.log(err);
// }
// }  

  // profile
  
  module.exports.admin_get_profile= async (req, res) => {
    try{
    const admin = await Admin.findById(req.admin._id);
  
    if (admin) {
      res.json({
        name: admin.name,
        mobile_no:admin.mobile_no,
        email: admin.email,
        image: admin.image,
      
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
 
  

// get-profile by id

// module.exports.admin_get_profile_by_Id= async (req, res) => {
//   try{
//   const admin = await Admin.findById(req.params.id);

//   if (admin) {
//     res.json({
//       _id: admin._id,
//       name: admin.name,
//       email: admin.email,
//       mobile_no: admin.mobile_no,
//       image: admin.image
//     });
//   } else {
//     res.status(404);
//     throw new Error('admin not found');
//   }
// }
// catch(err){
//   console.log(err);
// }
// };


// delete tiffinservice

module.exports.delete_tiffinservice = async(req,res) => {
  try{
   const delete_tiffin_service = await Tiffin.findByIdAndDelete(req.params.id);
   if(delete_tiffin_service){
     res.status(200).json({
       msg: "Service deleted"
     });
   }
   else{
     throw new Error("No Tiffin service found");
   }
  }
  catch(err){
    console.log(err);
    res.status(400).json({
      msg: "servcer error"
    })
  }
}

// view all tiffinservices

module.exports.view_tiffinservice = async(req,res) => {
  try{
    const tiffinservice = await Tiffin.find();
    if(tiffinservice.length !== 0){
      res.status(200).json({
        success: true,
        data: tiffinservice,
        count: tiffinservice.length
      });
    }
    else{
      res.status(200).json({
        msg: "No Tiffin service available"
      });
    }
  }
  catch(err){
    console.log(err);
    res.status(400).json({
      msg: 'Server Error'
    });
  }
}

// view all services

module.exports.view_services = async(req,res) => {
  try{
  const services = await service.find();
  if(services.length !== 0){
    res.status(200).json({
      data: services,
      count: services.length
    });
  }
  else{
    res.status(200).json({
      msg: "No service available"
    });
  }
}
catch(err){
  console.log(err);
  res.status(400).json({
    msg: 'Server Error'
  });
}
}



