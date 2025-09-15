const express = require('express');
const router = express.Router();
const { addWasteData, getWasteData } = require('../controllers/wasteController');

router.post('/', addWasteData);
router.get('/', getWasteData);

module.exports = router;
