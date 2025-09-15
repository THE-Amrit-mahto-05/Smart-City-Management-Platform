const AirQualityData = require('../models/AirQualityData');
exports.addAirQualityData = async (req, res) => {
    try {
        const data = new AirQualityData(req.body);
        await data.save();
        res.status(201).json({ message: 'Data added successfully', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAirQualityData = async (req, res) => {
    try {
        const data = await AirQualityData.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
