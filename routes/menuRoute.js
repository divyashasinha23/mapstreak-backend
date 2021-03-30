const express = require('express');
const router = express.Router();
const menuController = require('../Controllers/MenuController');
const { currentMerchant, Auth } = require('../Middleware/MerchantMiddleware');


//Menu will be viewed in user app
router.get('/menu',menuController.get_menu_tiffin);
router.get('/menu/:id',menuController.get_menu_tiffin_by_id);

//merchant can post menu
router,post('/menu', currentMerchant);
router.post('/menu', Auth, menuController.post_menu_tiffin);


module.exports = router;