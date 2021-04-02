const mongoose=require("mongoose");
const bcrypt = require("bcrypt");
const {isEmail} = require('validator');


const adminSchema = new mongoose.Schema
({
    name:{
        type:String,
        required: true
    },
    mobile_no:{
        type:String,
        
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique:true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
    },
    image:{
      type: String,
    },
    location:{
        
    }
    


}
);

// bcrypting password
adminSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
});


//static login
adminSchema.statics.login = async function(adminname, password){
    const admin = await this.findOne({$or: [{email:adminname}, {mobile_no: adminname}]});
    if (admin){
  const auth = await bcrypt.compare(password, admin.password);
  if(auth){
      return admin;
  }
  throw Error('incorrect password');
    }
    throw Error('invalid adminname');
}


const Admin= mongoose.model('Admin', adminSchema);

module.exports = Admin;