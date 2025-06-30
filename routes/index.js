// routes/index.js
const express = require('express');
const router = express.Router();

const healthInsuranceRoutes = require('./healthInsuranceRoutes');
const vehicleRoutes = require('./vehicleRoutes');

const ContactSubmission = require('../models/Contact');
const LifeInsuranceLead = require('../models/LifeInsuranceLead');
const BusinessQuote = require('../models/BusinessQuote');

// Modular route use
router.use('/health-insurance-leads', healthInsuranceRoutes);
router.use('/vehicles', vehicleRoutes);

// Contact routes
router.post('/contact', async (req, res) => {
  try {
    const contact = new ContactSubmission(req.body);
    const saved = await contact.save();
    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save contact data' });
  }
});

router.get('/contact', async (req, res) => {
  try {
    const contacts = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
});

// Life insurance routes
router.post('/life-insurance-leads', async (req, res) => {
  try {
    const lead = new LifeInsuranceLead(req.body);
    const saved = await lead.save();
    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save life insurance lead' });
  }
});

router.get('/life-insurance-leads', async (req, res) => {
  try {
    const leads = await LifeInsuranceLead.find().sort({ created_at: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve leads' });
  }
});

// Business quote routes
router.post('/business-quotes', async (req, res) => {
  try {
    const quote = new BusinessQuote(req.body);
    const saved = await quote.save();
    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save business quote' });
  }
});

router.get('/business-quotes', async (req, res) => {
  try {
    const quotes = await BusinessQuote.find().sort({ created_at: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve business quotes' });
  }
});

module.exports = router;
