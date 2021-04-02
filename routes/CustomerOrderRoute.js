const express = require('express');
const router = express.Router();
const OrderController = require('../Controllers/OrderController');
const {requireAuth, current_User} = require('../Middleware/UserMiddleware');

router.post('/place_order', current_User);
router.post('/place_order', requireAuth, OrderController.post_order);


// router.get('/get-order-details',current_User);
// router.get('/get-order-details', requireAuth,OrderController.get_order);


//get order details by user id
router.get('/get-order-details/:id',OrderController.get_order_by_id);
//get order details by order id
router.get('/order-details/:id',OrderController.get_order_by_orderid);

module.exports = router;