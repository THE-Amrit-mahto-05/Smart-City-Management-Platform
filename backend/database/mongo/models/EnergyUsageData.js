const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const energySchema = new Schema({
  date: { type: Date, required: true },
  region: { type: String, required: true },
  thermalActual: { type: Number },
  thermalEstimated: { type: Number },
  nuclearActual: { type: Number },
  nuclearEstimated: { type: Number },
  hydroActual: { type: Number },
  hydroEstimated: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('EnergyUsageData', energySchema);
