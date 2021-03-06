const express = require('express');
const router = express.Router();
const TiffinContoller = require('../Controllers/TiffinController');

router.route('/tiffinservices').get(TiffinContoller.get_tiffin).post(TiffinContoller.post_tiffin);
router.get('/tiffinservices/:id',TiffinContoller.get_tiffin_by_id);

module.exports = router;