const pdfParse = require('pdf-parse');
const fs = require('fs');
const EnergyUsageData = require('../database/mongo/models/EnergyUsageData');

function normalizeRecord(record) {
  return {
    date: record.Date ? new Date(record.Date) : null,
    region: record.Region || "Unknown",
    thermalActual: Number(record['Thermal Generation Actual (in MU)'] || 0),
    thermalEstimated: Number(record['Thermal Generation Estimated (in MU)'] || 0),
    nuclearActual: Number(record['Nuclear Generation Actual (in MU)'] || 0),
    nuclearEstimated: Number(record['Nuclear Generation Estimated (in MU)'] || 0),
    hydroActual: Number(record['Hydro Generation Actual (in MU)'] || 0),
    hydroEstimated: Number(record['Hydro Generation Estimated (in MU)'] || 0)
  };
}

exports.uploadEnergyData = async (req, res) => {
  try {
    const pdfBuffer = fs.readFileSync(req.file.path); 
    const data = await pdfParse(pdfBuffer);
    const records = parsePdfToJson(data.text); 
    const normalizedRecords = records.map(normalizeRecord);

    await EnergyUsageData.insertMany(normalizedRecords);
    res.status(200).json({ message: "Energy data uploaded successfully", count: normalizedRecords.length });
  } catch (error) {
    console.error("Error uploading energy data:", error);
    res.status(500).json({ message: "Failed to upload energy data", error });
  }
};
