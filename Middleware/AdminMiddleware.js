
const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModel');

const requireAuth_admin = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'mapstreak-admin', (err,decodedToken) => {
            if(err){
                // res.redirect('/admin_signup');
                res.send('You are not logged in');
            }
            else{
                console.log(decodedToken)
                next();
            }
        });
    }
    else{
        // res.redirect('/admin_signup');
        res.send('You are not logged in');
    }
};


const currentAdmin = (req,res,next) => {
  const token = req.cookies.jwt;
  if(token){
      jwt.verify(token,'mapstreak-admin', async (err, decodedToken) => {
          if(err){
              console.log(err.message);
              res.locals.admin = null;
              next();
          } else{
              console.log(decodedToken);
              let admin= await Admin.findById(decodedToken.id);
              res.locals.admin = admin;
              next();
          }
      });
  }
  else{
     res.locals.admin = null;
     next();
  }
}

module.exports = {requireAuth_admin, currentAdmin};