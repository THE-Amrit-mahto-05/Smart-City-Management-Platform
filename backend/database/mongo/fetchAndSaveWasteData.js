const axios = require('axios');
const csv = require('csvtojson');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../../.env' }); 

const WasteCollectionData = require('./models/WasteCollectionData');

const MONGO_URL = process.env.MONGO_URL;

const csvUrl = 'https://uvahgnpymhzeuzvkpbta.supabase.co/storage/v1/object/public/pdf/RS_Session_258_AS_132_2.csv';

async function fetchAndSaveWasteData() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connected');

    const response = await axios.get(csvUrl);
    const csvString = response.data;

    const jsonArray = await csv().fromString(csvString);
    console.log('CSV headers:', Object.keys(jsonArray[0]));
    console.log('First 5 rows:', jsonArray.slice(0, 5));

    const normalizedData = jsonArray.map(row => ({
      state: row['State/UT'],
      villagesSWM: Number(row['Number of Villages Covered with SWM'] || 0),
      villagesLWM: Number(row['Number of Villages Covered with LWM'] || 0),
      villagesBoth: Number(row['Number of Villages Covered with Both SWM and LWM'] || 0)
    }));

    await WasteCollectionData.insertMany(normalizedData); 
    console.log(`Inserted ${normalizedData.length} waste management records to MongoDB`);

    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error fetching or saving waste data:', err);
    mongoose.connection.close();
  }
}

fetchAndSaveWasteData();
