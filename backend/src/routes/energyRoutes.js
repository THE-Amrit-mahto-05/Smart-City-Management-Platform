const express = require('express');
const router = express.Router();
const { uploadEnergyData, getEnergyData } = require('../controllers/energyController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

router.post('/', upload.single('pdf'), uploadEnergyData);  
router.get('/', getEnergyData);

module.exports = router;
