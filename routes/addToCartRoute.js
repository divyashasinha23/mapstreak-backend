const express = require('express');
const router = express.Router();
const addToCartController = require('../Controllers/addToCartController');
const {requireAuth, current_User} = require('../Middleware/UserMiddleware');


router.post('/add-to-cart',addToCartController.post_addToCart);
router.get('/get-cart-details',current_User);
router.get('/get-card-details/:id',addToCartController.get_cart_details_by_id);

router.get('/delete-from-cart/:id',addToCartController.delete_cart_by_id);

module.exports = router;