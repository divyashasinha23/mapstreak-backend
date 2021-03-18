// const express=require('express');
// const router=express.Router();
// // const paytmChecksum=require('./PaytmChecksum')



// router.post('/payment',(req,res)=>{

//     const{amount,email}=req.body;
// /* import checksum generation utility */
// // var PaytmChecksum = require("./PaytmChecksum");

// var Params = {};

// /* initialize an array */
// params['MID'] = process.env.PAYTM_MID,
// params['WEBSITE'] = process.env.PAYTM_WEBSITE,
// params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
// params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
// params['ORDER_ID'] = uuidv4(),
// params['CUST_ID'] = process.env.PAYTM_CUST_ID,
// params['TXN_AMOUNT'] = totalAmount,
// params['CALLBACK_URL'] = 'http://localhost:5000/api/callback',
// params['EMAIL'] =email,
// params['MOBILE_NO'] = '9876543210'

// /**
// * Generate checksum by parameters we have
// * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
// */
// var paytmChecksum = PaytmChecksum.generateSignature(Params, "process.env.PAYTM_MERCHANT_KEY");
// paytmChecksum.then(function(checksum){
//     let paytmParams={
//         ...params,
//         "CHECKSUMHASH":checksum
//     }
//     res.json(paytmParams)
// }).catch(function(error){
// 	console.log(error);
// });



// })
// module.exports=router;