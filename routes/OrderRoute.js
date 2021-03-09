const express = require('express');
const router = express.Router();
OrderController = require('../Controllers/OrderController');

router.post('/place_order',OrderController.post_order);
router.get('/get-order-details/:id',OrderController.get_order_by_id);

module.exports = router;