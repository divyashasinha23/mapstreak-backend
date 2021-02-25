const express = require('express');
const router = express.Router();
TiffinContoller = require('../Controllers/TiffinController');

router.get('/tiffinservices',TiffinContoller.get_tiffin);
router.get('/tiffinservices/:id',TiffinContoller.getTiffinById);

module.exports = router;