const express = require('express');
const router = express.Router();
const LifeInsuranceLead = require('../models/LifeInsuranceLead');

// POST /api/life-insurance-leads - Save a lead
router.post('/', async (req, res) => {
  try {
    const lead = new LifeInsuranceLead(req.body);
    const saved = await lead.save();
    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to save life insurance lead' });
  }
});

// GET /api/life-insurance-leads - Retrieve all leads
router.get('/', async (req, res) => {
  try {
    const leads = await LifeInsuranceLead.find().sort({ created_at: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve leads' });
  }
});

module.exports = router;
