const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const healthInsuranceRoutes = require('./routes/healthInsuranceRoutes');
const vehicleRoutes = require("./routes/vehicleRoutes")
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// MongoDB Connection

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB (vault)');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

app.use('/api/health-insurance-leads', healthInsuranceRoutes);
app.use("/api/vehicles", vehicleRoutes);

// Contact Schema
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  phone:     { type: String, required: true },
  helpWith:  { type: String, required: true },
  message:   { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ContactSubmission = mongoose.model('ContactSubmission', contactSchema);

// Life Insurance Lead Schema
const lifeInsuranceLeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String }, 
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true , maxlength: 14 },
  selected_plan: { type: String, required: true }, 
  preferred_companies: [{ type: String }], 
  created_at: { type: Date, default: Date.now }
});

const LifeInsuranceLead = mongoose.model('LifeInsuranceLead', lifeInsuranceLeadSchema);


// Business Insurance Lead Schema

const businessQuoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  business_name: { type: String },
  mobile_number: { type: String, required: true, maxlength: 14 },
  product_type: { type: String, enum: ['retail', 'service', 'manufacturing'], required: true },
  email: { type: String },
  created_at: { type: Date, default: Date.now }
});

const BusinessQuote = mongoose.model('BusinessQuote', businessQuoteSchema);



// 🚀 POST: Save Contact Submission
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new ContactSubmission(req.body);
    const saved = await contact.save();
    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save contact data' });
  }
});

// 📥 GET: Fetch Contact Submissions
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
});

// 📥 POST: Life insaurance Create Lead
app.post('/api/life-insurance-leads', async (req, res) => {
  try {
    const lifeLead = new LifeInsuranceLead(req.body);
    const saved = await lifeLead.save();
    res.status(201).json({success:true, id: saved.id});
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ success: false, message: 'Failed to save life insaurance lead' });
  }
});

// 📤 GET: Life Insaurance Fetch All Leads (optional)
app.get('/api/life-insurance-leads', async (req, res) => {
  try {
    const leads = await LifeInsuranceLead.find().sort({ created_at: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve leads' });
  }
});

// POST: Submit Business Quote
app.post('/api/business-quotes', async (req, res) => {
  try {
    const quote = new BusinessQuote(req.body);
    const saved = await quote.save();
    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save business quote' });
  }
});

// GET: Retrieve All Business Quotes
app.get('/api/business-quotes', async (req, res) => {
  try {
    const quotes = await BusinessQuote.find().sort({ created_at: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve business quotes' });
  }
});

app.get('/', (req, res) => {
  res.send('Vault Insuarance API is running');
});



app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
