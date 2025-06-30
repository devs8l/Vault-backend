const express = require('express');
const router = express.Router();
const BusinessQuote = require('../models/BusinessQuote');

// POST /api/business-quotes - Save a new business quote
router.post('/', async (req, res) => {
  try {
    const quote = new BusinessQuote(req.body);
    const saved = await quote.save();
    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save business quote' });
  }
});

// GET /api/business-quotes - Retrieve all business quotes
router.get('/', async (req, res) => {
  try {
    const quotes = await BusinessQuote.find().sort({ created_at: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve business quotes' });
  }
});

module.exports = router;
