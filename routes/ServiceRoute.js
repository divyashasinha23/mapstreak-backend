const express = require('express');
const router = express.Router();
ServiceController = require('../Controllers/ServiceController');

router.get('/Mapstreak-Services/:id',ServiceController.get_services_by_id);
router.post('/Mapstreak-Services', ServiceController.post_services);
router.get('/Mapstreak-Services',ServiceController.get_services);



module.exports = router;