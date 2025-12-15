const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorhandler = require('./middleware/errorhandler');

dotenv.config();
// connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/weather', require('./routes/weather'));
app.use('/api/user', require('./routes/user'));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: '🌤️ Weatherly backend is running'
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorhandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `🌤️  Weatherly backend (MySQL) running on http://localhost:${PORT}`
  );
});

module.exports = app;
