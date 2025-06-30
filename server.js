import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Route imports
import healthInsuranceRoutes from './routes/healthInsuranceRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import lifeInsuranceRoutes from './routes/lifeInsuranceRoutes.js';
import businessQuoteRoutes from './routes/businessQuoteRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB (vault)');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// Routes
app.use('/api/health-insurance-leads', healthInsuranceRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/life-insurance-leads', lifeInsuranceRoutes);
app.use('/api/business-quotes', businessQuoteRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Vault Insurance API is running 🚀');
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
