const mongoose = require('../index'); 
const Schema = mongoose.Schema;

const trafficSchema = new Schema({
  location: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  vehicleCount: Number,
  avgSpeed: Number,
  congestionLevel: String
});

module.exports = mongoose.model('TrafficData', trafficSchema);
