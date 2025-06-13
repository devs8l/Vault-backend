const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/vault', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB (vault)');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});


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


// Health Insurance Lead Schema
const healthInsuranceLeadSchema = new mongoose.Schema({
  policy_type:   { type: String, enum: ['new', 'renew'], required: true },
  adults:        { type: Number, default: 0 },
  children:      { type: Number, default: 0 },
  existing_disease: { type: String },  // e.g., 'none', 'diabetes'
  insurer:       { type: String },
  claim_status:  { type: String, enum: ['yes', 'no'], default: null },
  tenure:        { type: Number },     // in years
  eldest_age:    { type: Number },
  pincode:       { type: String, maxlength: 10 },
  created_at:    { type: Date, default: Date.now }
});

const HealthInsuranceLead = mongoose.model('HealthInsuranceLead', healthInsuranceLeadSchema);

// Business Insurance Lead Schema

const businessQuoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  business_name: { type: String },
  mobile_number: { type: String, required: true },
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



// 🚀 POST: Save Health Insurance Lead
app.post('/api/health-insurance-leads', async (req, res) => {
  try {
    const lead = new HealthInsuranceLead(req.body);
    const saved = await lead.save();
    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save insurance lead' });
  }
});

// 📥 GET: Fetch Health Insurance Leads
app.get('/api/health-insurance-leads', async (req, res) => {
  try {
    const leads = await HealthInsuranceLead.find().sort({ created_at: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve insurance leads' });
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



app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
