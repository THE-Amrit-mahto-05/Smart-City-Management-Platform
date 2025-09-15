const express = require('express');
const router = express.Router();
const { addEnergyData, getEnergyData } = require('../controllers/energyController');

router.post('/', addEnergyData);  
router.get('/', getEnergyData);   

module.exports = router;
