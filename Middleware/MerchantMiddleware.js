
const jwt = require('jsonwebtoken');
const Merchant = require('../models/merchantModel');

const Auth = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'mapstreak-merchant', (err,decodedToken) => {
            if(err){
                // res.redirect('/merchant_signup');
                res.send('Your are not logged in')
            }
            else{
                console.log(decodedToken)
                next();
            }
        });
    }
    else{
        // res.redirect('/merchant_signup');
        res.send('Your are not logged in')
    }
};


const currentMerchant = (req,res,next) => {
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

module.exports = {Auth, currentMerchant};