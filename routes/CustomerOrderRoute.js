const express = require('express');
const router = express.Router();
const OrderController = require('../Controllers/OrderController');
const {requireAuth, current_User} = require('../Middleware/UserMiddleware');


router.post('/place_order',OrderController.post_order);
router.get('/get-order-details',current_User);
router.get('/get-order-details/:id',requireAuth, OrderController.get_order_by_id);

module.exports = router;