require('dotenv').config();
const express = require('express');
const mongoose = require('../database/mongo'); 
const userRoutes = require('./routes/userRoutes');

const app = express();
const trafficRoutes = require('./routes/trafficRoutes');
const airQualityRoutes = require('./routes/airQualityRoutes');
const energyRoutes = require('./routes/energyRoutes');
const wasteRoutes = require('./routes/wasteRoutes');

app.use(express.json());
app.use('/api/traffic', trafficRoutes);
app.use('/api/air-quality', airQualityRoutes);
app.use('/api/energy', energyRoutes);
app.use('/api/waste', wasteRoutes);
app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
  res.send('Smart City Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
