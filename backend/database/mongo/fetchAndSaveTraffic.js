require('dotenv').config({ path: '../../.env' });

const mongoose = require('mongoose');
const axios = require('axios');
const TrafficData = require('./models/TrafficData');

const { MONGO_URL, TOMTOM_API_KEY } = process.env;
if (!MONGO_URL) throw new Error("MONGO_URL is not defined in .env");
if (!TOMTOM_API_KEY) throw new Error("TOMTOM_API_KEY is not defined in .env");

mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

function getCongestionLevel(currentSpeed, freeFlowSpeed) {
  if (!freeFlowSpeed || freeFlowSpeed === 0) return 'unknown';
  const ratio = currentSpeed / freeFlowSpeed;
  if (ratio >= 0.8) return 'low';
  if (ratio >= 0.5) return 'medium';
  return 'high';
}

async function fetchAndSaveTraffic(lat, lon) {
  try {
    const url = "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json";
    const response = await axios.get(url, {
      params: { point: `${lat},${lon}`, key: TOMTOM_API_KEY }
    });

    const { flowSegmentData } = response.data;
    if (!flowSegmentData) {
      console.warn(`No traffic data for ${lat}, ${lon}`);
      return;
    }

    const trafficRecord = {
      location: `${lat},${lon}`,
      timestamp: new Date(),
      vehicleCount: null,
      avgSpeed: flowSegmentData.currentSpeed || 0,
      congestionLevel: getCongestionLevel(flowSegmentData.currentSpeed, flowSegmentData.freeFlowSpeed)
    };

    await TrafficData.create(trafficRecord);
    console.log(`Saved traffic data for ${lat},${lon}`);
  } catch (err) {
    console.error(`Error fetching traffic data:`, err.message);
  }
}

const lat = process.argv[2] || 28.6139; 
const lon = process.argv[3] || 77.2090;

(async () => {
  await fetchAndSaveTraffic(lat, lon);
  console.log("Finished fetching traffic for current location!");
  mongoose.connection.close();
})();
