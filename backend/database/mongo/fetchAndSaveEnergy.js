require('dotenv').config(); 

const mongoose = require('mongoose');
const axios = require('axios');
const csv = require('csvtojson'); 
const EnergyUsageData = require('./models/EnergyUsageData');

const { MONGO_URL } = process.env;
if (!MONGO_URL) throw new Error("MONGO_URL is not defined in .env");

const supabaseFiles = [
  'https://uvahgnpymhzeuzvkpbta.supabase.co/storage/v1/object/public/pdf/file_02.csv',
];

async function fetchCSVFile(url) {
  const response = await axios.get(url);
  const rawData = await csv().fromString(response.data);

  const cleanedData = rawData.map(row => {
    const newRow = {};
    for (let key in row) {
      const cleanKey = key.trim().toLowerCase().replace(/\s+/g, '_').replace(/[()]/g, '');
      newRow[cleanKey] = row[key] ? row[key].trim() : row[key];
    }
    return newRow;
  });

  return cleanedData;
}

function parseNumber(value) {
  if (!value) return null;             
  const cleaned = value.replace(/,/g, ''); 
  const num = Number(cleaned);
  return isNaN(num) ? null : num;      
}

function normalizeRecord(record) {
  return {
    date: record.date ? new Date(record.date) : null,
    region: record.region || "Unknown",
    thermalActual: parseNumber(record.thermal_generation_actual_in_mu),
    thermalEstimated: parseNumber(record.thermal_generation_estimated_in_mu),
    nuclearActual: parseNumber(record.nuclear_generation_actual_in_mu),
    nuclearEstimated: parseNumber(record.nuclear_generation_estimated_in_mu),
    hydroActual: parseNumber(record.hydro_generation_actual_in_mu),
    hydroEstimated: parseNumber(record.hydro_generation_estimated_in_mu),
  };
}

async function fetchAndSaveEnergyData() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connected');

    let allData = [];
    for (const file of supabaseFiles) {
      console.log(`Fetching file: ${file}`);
      const rawData = await fetchCSVFile(file);

      console.log('CSV headers:', Object.keys(rawData[0]));
      console.log('First 5 raw rows:', rawData.slice(0,5));

      const normalized = rawData.map(normalizeRecord);
      allData.push(...normalized);
    }

    if (allData.length === 0) {
      console.log('No data found to insert.');
      return;
    }
    await EnergyUsageData.insertMany(allData);
    console.log(`Inserted ${allData.length} energy records to MongoDB`);
  } catch (err) {
    console.error('Error fetching or saving data:', err);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}
fetchAndSaveEnergyData();
