const express = require('express');
const router = express.Router();
OrderController = require('../Controllers/OrderController');

router.post('/place-order', OrderController.post_order);