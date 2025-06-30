const express = require('express');
const router = express.Router();
const ContactSubmission = require('../models/Contact');

// POST /api/contact - Save contact form data
router.post('/', async (req, res) => {
  try {
    const contact = new ContactSubmission(req.body);
    const saved = await contact.save();
    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save contact data' });
  }
});

// GET /api/contact - Retrieve all contact submissions
router.get('/', async (req, res) => {
  try {
    const contacts = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
});

module.exports = router;
