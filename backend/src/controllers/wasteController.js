const WasteCollectionData = require('../../database/mongo/models/WasteCollectionData');

exports.addWasteData = async (req, res) => {
  try {
    const data = new WasteManagementData(req.body);
    await data.save();
    res.status(201).json({ message: 'Waste data added', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWasteData = async (req, res) => {
  try {
    const data = await WasteManagementData.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
