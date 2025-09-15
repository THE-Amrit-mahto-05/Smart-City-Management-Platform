const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const airQualitySchema = new Schema({
  country: String,
  state: String,
  city: String,
  station: String,
  pollutant_id: String,
  pollutant_min: Number,
  pollutant_max: Number,
  pollutant_avg: Number,
  pollutant_unit: String,
 last_update: Date

});


module.exports = mongoose.model('AirQualityData', airQualitySchema);
