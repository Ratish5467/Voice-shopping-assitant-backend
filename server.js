require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./src/config/db');

const authRoutes = require('./src/routes/auth');
const itemRoutes = require('./src/routes/items');
const priceRoutes = require('./src/routes/price');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet());
app.use(express.json());
app.use(cors());

// API routes
app.use('/api', authRoutes);      // /api/login  /api/register
app.use('/api/items', itemRoutes);
app.use('/api/price', priceRoutes);

app.get('/', (req, res) => res.json({ ok: true, message: 'VoiceCart backend' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Server error' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
