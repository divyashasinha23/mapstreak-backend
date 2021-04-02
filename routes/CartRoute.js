const express = require('express');
const router = express.Router();
const addToCartController = require('../Controllers/CartController');
const {requireAuth, current_User} = require('../Middleware/UserMiddleware');


//Add items to cart
router.post('/add-to-cart', current_User);
router.post('/add-to-cart', requireAuth, addToCartController.post_addToCart);

//view cart by user-id
router.get('/get-cart-details', current_User);
router.get('/get-cart-details', requireAuth, addToCartController.get_cart_details_by_id);

//delete items from cart using cart-id
router.get('/delete-from-cart/:id',addToCartController.delete_cart_by_id);

module.exports = router;