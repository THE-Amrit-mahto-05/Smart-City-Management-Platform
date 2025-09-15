const express = require('express');
const router = express.Router();
const { addTrafficData, getTrafficData } = require('../controllers/trafficController');
router.post('/', addTrafficData);
router.get('/', getTrafficData);
module.exports = router;
