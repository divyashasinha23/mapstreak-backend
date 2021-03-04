const express = require('express');
const router = express.Router();
const MerchantController = require('../Controllers/MerchantController');
const requireAuth = require('../Middleware/MerchantMiddleware');

router.post('/merchant_login',MerchantController.merchant_post_login);
router.post('/merchant_signup',MerchantController.merchant_post_signup);




module.exports = router;