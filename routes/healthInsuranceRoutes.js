const express = require('express');
const router = express.Router();
const HealthInsuranceLead = require('../models/HealthInsuranceLead');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Save Health Insurance Lead
router.post('/', upload.single('policy_file'), async (req, res) => {
  try {
    // Create lead data from request body
    const leadData = {
      ...req.body,
      // Use the policy_type from the request or default to 'new'
      policy_type: req.body.policy_type || 'new'
    };

    // Only add policy_file if a file was uploaded
    if (req.file) {
      leadData.policy_file = req.file.path;
    }

    // Create and save the lead
    const lead = new HealthInsuranceLead(leadData);
    const saved = await lead.save();
    
    res.status(201).json({ 
      success: true, 
      id: saved._id,
      policy_type: saved.policy_type // Return the policy type for confirmation
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Failed to save insurance lead',
      details: err.message 
    });
  }
});

// Fetch Health Insurance Leads
router.get('/', async (req, res) => {
  try {
    const leads = await HealthInsuranceLead.find().sort({ created_at: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve insurance leads' });
  }
});

module.exports = router;