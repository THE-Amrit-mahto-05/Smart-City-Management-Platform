const mongoose = require('mongoose');
require('dotenv').config(); 

const mongoURL = process.env.MONGO_URL; 

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose;
