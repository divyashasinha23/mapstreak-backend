const express = require('express');
const router = express.Router();
const menuController = require('../Controllers/menuController');

router.get('/menu',menuController.get_menu_tiffin);
router.post('/menu',menuController.post_menu_tiffin);

module.exports = router;