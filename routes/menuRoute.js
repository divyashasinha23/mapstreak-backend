const express = require('express');
const router = express.Router();
const menuController = require('../Controllers/MenuController');



router.get('/menu',menuController.get_menu_tiffin);
router.get('/menu/:id',menuController.get_menu_tiffin_by_id);


router.post('/menu', menuController.post_menu_tiffin);


module.exports = router;