const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const healthInsuranceRoutes = require('./routes/healthInsuranceRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, 
  
).then(() => {
  console.log('✅ Connected to MongoDB (vault)');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Routes
app.use('/api/health-insurance-leads', healthInsuranceRoutes);
app.use('/api/vehicles', vehicleRoutes);

// Models
const ContactSubmission = require('./models/Contact');
const LifeInsuranceLead = require('./models/LifeInsuranceLead');
const BusinessQuote = require('./models/BusinessQuote');

// Contact APIs
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new ContactSubmission(req.body);
    const saved = await contact.save();
    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save contact data' });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
});

// Life Insurance APIs
app.post('/api/life-insurance-leads', async (req, res) => {
  try {
    const lead = new LifeInsuranceLead(req.body);
    const saved = await lead.save();
    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to save life insurance lead' });
  }
});

app.get('/api/life-insurance-leads', async (req, res) => {
  try {
    const leads = await LifeInsuranceLead.find().sort({ created_at: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve leads' });
  }
});

// Business Quote APIs
app.post('/api/business-quotes', async (req, res) => {
  try {
    const quote = new BusinessQuote(req.body);
    const saved = await quote.save();
    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save business quote' });
  }
});

app.get('/api/business-quotes', async (req, res) => {
  try {
    const quotes = await BusinessQuote.find().sort({ created_at: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve business quotes' });
  }
});

app.get('/', (req, res) => {
  res.send('Vault Insurance API is running 🚀');
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
