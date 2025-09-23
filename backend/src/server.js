require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const prisma = require('./../database/prisma/config');
const mongoose = require('./../database/mongo'); 
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const trafficRoutes = require('./routes/trafficRoutes');
const airQualityRoutes = require('./routes/airQualityRoutes');
const energyRoutes = require('./routes/energyRoutes');
const wasteRoutes = require('./routes/wasteRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173"];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      callback(null, false); 
    }
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","PATCH"],
  allowedHeaders: ["Content-Type","Authorization"]
}));
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/traffic', trafficRoutes);
app.use('/api/air-quality', airQualityRoutes);
app.use('/api/energy', energyRoutes);
app.use('/api/waste', wasteRoutes);
app.get('/', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ message: "Smart City Backend Running & DB Connected" });
  } catch (err) {
    console.error('Database connection failed:', err.message);
    res.status(500).json({ message: "Backend running but DB connection failed" });
  }
});

app.get('/health', (req, res) => res.json({ status: "ok" }));
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack || err);
  res.status(500).json({ message: "Internal Server Error" });
});
app.listen(PORT, () => {
  console.log(`MongoDB connected`);
  console.log(`Server running on http://localhost:${PORT}`);
});
