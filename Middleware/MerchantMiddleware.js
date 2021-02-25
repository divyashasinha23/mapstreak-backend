
const jwt = require('jsonwebtoken');
const Merchant = require('../models/merchantModel');

const Auth = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'mapstreak-merchant', (err,decodedToken) => {
            if(err){
                res.redirect('/merchant_signup');
            }
            else{
                console.log(decodedToken)
                next();
            }
        });
    }
    else{
        res.redirect('/merchant_signup');
    }
};


const currentUser = (req,res,next) => {
  const token = req.cookies.jwt;
  if(token){
      jwt.verify(token,'mapstreak-merchant', async (err, decodedToken) => {
          if(err){
              console.log(err.message);
              res.locals.merchant = null;
              next();
          } else{
              console.log(decodedToken);
              let merchant = await Merchant.findById(decodedToken.id);
              res.locals.merchant = merchant;
              next();
          }
      });
  }
  else{
     res.locals.merchant = null;
     next();
  }
}

module.exports = {Auth, currentUser};