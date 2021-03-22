const express = require('express');
const router = express.Router();
const addToCartController = require('../Controllers/CartController');

//Add items to cart
router.post('/add-to-cart',addToCartController.post_addToCart);

//view cart
router.get('/get-card-details/:id',addToCartController.get_cart_details_by_id);

//delete items from cart
router.get('/delete-from-cart/:id',addToCartController.delete_cart_by_id);

module.exports = router;