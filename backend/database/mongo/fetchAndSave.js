require('dotenv').config({ path: '../../.env' }); 


const mongoose = require('mongoose');
const axios = require('axios');
const AirQualityData = require('./models/AirQualityData');

const { MONGO_URL, API_KEY, BASE_URL } = process.env;

if (!MONGO_URL) throw new Error("MONGO_URL is not defined in .env");
if (!API_KEY) throw new Error("API_KEY is not defined in .env");
if (!BASE_URL) throw new Error("BASE_URL is not defined in .env");
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

async function fetchAndSaveAirQuality(limit = 999, offset = 0) {
  try {
    const response = await axios.get(BASE_URL, {
      params: { 'api-key': API_KEY, format: 'json', limit, offset }
    });

    const records = response.data.records.map(r => {
      let lastUpdate = r.last_update ? new Date(r.last_update) : null;
      if (lastUpdate && isNaN(lastUpdate.getTime())) lastUpdate = null;

      return {
        country: r.country,
        state: r.state,
        city: r.city,
        station: r.station,
        pollutant_id: r.pollutant_id,
        pollutant_min: r.min_value !== "NA" ? Number(r.min_value) : null,
        pollutant_max: r.max_value !== "NA" ? Number(r.max_value) : null,
        pollutant_avg: r.avg_value !== "NA" ? Number(r.avg_value) : null,
        pollutant_unit: "",
        last_update: lastUpdate
      };
    });

    await AirQualityData.insertMany(records);
    console.log(`Saved ${records.length} records from offset ${offset}`);

    const total = response.data.total;
    if (offset + limit < total) await fetchAndSaveAirQuality(limit, offset + limit);
    else {
      console.log('All records fetched and saved!');
      mongoose.connection.close();
    }

  } catch (err) {
    console.error('Error fetching or saving data:', err.message);
  }
}

fetchAndSaveAirQuality();
