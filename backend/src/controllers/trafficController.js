const TrafficData = require('../../database/mongo/models/TrafficData');
exports.addTrafficData = async (req, res) => {
  try {
        const data = new TrafficData(req.body);
        await data.save();
        res.status(201).json({ message: 'Traffic data added', data });
  }catch (err) {
        res.status(500).json({ error: err.message });
  }
};

exports.getTrafficData = async (req, res) => {
  try {
    const data = await TrafficData.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
