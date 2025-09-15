const express = require('express');
const router = express.Router();
const { addAirQualityData, getAirQualityData } = require('../controllers/airQualityController');

router.post('/', addAirQualityData);
router.get('/', getAirQualityData);

module.exports = router;
