const express = require("express");
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const colors = require('colors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const UserRoute=require('./routes/UserRoute');
const passport = require("passport");
const facebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate=require("mongoose-findorcreate");
const User =require('./models/User');
const MerchantRoute=require('./routes/MerchantRoute');
const Merchant=require('./models/merchantModel')
const PartnerRoute = require('./routes/PartnerRoute');
const path = require('path')
const shortid = require('shortid')
const Razorpay = require('razorpay')
const cors = require('cors')
const serviceRoute = require('./routes/ServiceRoute');
const menuRoute = require('./routes/menuRoute');
const customerorderRoute = require('./routes/CustomerOrderRoute');
// const paymentRoute=require('./routes/PaymentRoute');
// const {v4:uuidv4}=require('uuid')
const searchRoute = require('./routes/SearchRoute');
const addToCartRoute=require('./routes/addToCartRoute')

dotenv.config({ path: '.env' });
connectDB();
var app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



app.use(UserRoute);
app.use(MerchantRoute);
app.use(PartnerRoute);
app.use(serviceRoute);
app.use(menuRoute);
app.use(customerorderRoute);
// app.use('/api',paymentRoute)
app.use(searchRoute);
app.use(addToCartRoute);
app.use('/tiffinservices', require('./routes/TiffinRoute'));

app.use('/uploads', express.static('uploads'));


app.use(passport.initialize());
app.use(passport.session());
app.use(session({secret:process.env.SECRET_KEY}));



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  UserFb.findById(id, function(err, user) {
    done(err, user);
  });

});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret:process.env.GOOGLE_SECRET,
  callbackURL: "http://localhost:5000/auth/google/Mapstreak",
  profileFields: ['id', 'displayName', 'name', 'gender','picture.type(large)','email'],
  userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
},
function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
  User.findOrCreate({ googleId: profile.id, name: profile.name.givenName + ' ' + profile.name.familyName }, function (err, user) {
    return cb(err, user);
  });
}
));



passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_PASS,
    callbackURL: "http://localhost:3000/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'gender','picture.type(large)','email']
  },
  function(token, refreshToken, profile, done) {
     // asynchronous
     process.nextTick(function() {
  
      // find the user in the database based on their facebook id
      User.findOne({ 'uid' : profile.id }, function(err, user) {
  
          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
              return done(err);
  
          // if the user is found, then log them in
          if (user) {
              console.log("user found")
              console.log(user)
              return done(null, user); // user found, return that user
          } else {
              // if there is no user found with that facebook id, create them
              var newUser = new User();
  
              // set all of the facebook information in our user model
              newUser.uid    = profile.id; // set the users facebook id                   
              newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
              newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
              newUser.pic = profile.photos[0].value
              // save our user to the database
              newUser.save(function(err) {
                  if (err)
                      throw err;
  
                  // if successful, return the new user
                  return done(null, newUser);
              });
          }
  
      });
  
  })
  
  }));

  app.get('/',(req,res) => {
    res.send("server started");
  })
  
  app.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));
  app.get('/facebook/callback', passport.authenticate('facebook',{
    successRedirect: '/profile',
    failureRedirect:'/failed'
  }))
  
  app.get('/profile',(req,res) => {
    res.redirect('/');
  })
  
  app.get('/failed',(req,res) => {
    res.redirect('/login');
  });

  app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile']
 }));

 app.get('/auth/google/Mapstreak', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }); 


  const razorpay = new Razorpay({
    key_id:process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET
  })
  
  app.post('/verification', (req, res) => {
    // do a validation
    const secret = 'secret12'
  
    console.log(req.body)
  
    const crypto = require('crypto')
  
    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')
  
    console.log(digest, req.headers['x-razorpay-signature'])
  
    if (digest === req.headers['x-razorpay-signature']) {
      console.log('request is legit')
      // process it
      require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
    } else {
      // pass it
    }
    res.json({ status: 'ok' })
  })
  
  app.post('/razorpay', async (req, res) => {
    // const payment_capture = 1
    const amount = req.body
    const currency = 'INR'
  
    const options = {
      amount: amount * 100,
      currency,
      receipt: shortid.generate(),
      payment_capture
    }
  
    try {
      const response = await razorpay.orders.create(options)
      console.log(response)
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount
      })
    } catch (error) {
      console.log(error)
    }
  })
  
//socket
// const io=require('socket.io')(server)
// io.on('connection',()=>{
//   //
// })

PORT= process.env.PORT;

// const server=
app.listen(PORT, ()=> console.log(`Server started at ${PORT}`));