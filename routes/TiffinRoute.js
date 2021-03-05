const express = require('express');
const router = express.Router();
const TiffinContoller = require('../Controllers/TiffinController');

router.route('/').get(TiffinContoller.get_tiffin).post(TiffinContoller.post_tiffin);

module.exports = router;