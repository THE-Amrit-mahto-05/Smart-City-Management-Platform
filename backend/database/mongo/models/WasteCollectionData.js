const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wasteSchema = new Schema({
  state: { type: String, required: true },
  villagesSWM: { type: Number, required: true },  
  villagesLWM: { type: Number, required: true },  
  villagesBoth: { type: Number, required: true }, 
  timestamp: { type: Date, default: Date.now }   
});

module.exports = mongoose.model('WasteManagementData', wasteSchema);
