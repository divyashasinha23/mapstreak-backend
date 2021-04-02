
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'mapstreak', (err,decodedToken) => {
            if(err){
                res.send('Your are not logged in')
            }
            else{
                console.log(decodedToken)
                next();
            }
        });
    }
    else{
        res.send('Your are not logged in')
    }
};


const current_User = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'mapstreak', async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            } else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }
    else{
       res.locals.user = null;
       next();
    }
  }
  

module.exports = {requireAuth, current_User} ;