import express from 'express';
import HealthInsuranceLead from '../models/HealthInsuranceLead.js';
import upload from '../middlewares/upload.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

const router = express.Router();

// POST: Create Health Insurance Lead
router.post('/', upload.single('policy_file'), async (req, res) => {
  try {
    const leadData = {
      ...req.body,
      policy_type: req.body.policy_type || 'new',
    };

    if (req.file && req.file.buffer) {
      const result = await uploadToCloudinary(req.file.buffer, 'vault_insurance');
      leadData.policy_file = result.secure_url;
    }

    const lead = new HealthInsuranceLead(leadData);
    const saved = await lead.save();

    res.status(201).json({
      success: true,
      id: saved._id,
      policy_type: saved.policy_type,
      policy_file_url: saved.policy_file,
    });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ error: 'Failed to save insurance lead', details: err.message });
  }
});

// GET: Fetch All Leads
router.get('/', async (req, res) => {
  try {
    const leads = await HealthInsuranceLead.find().sort({ created_at: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve insurance leads' });
  }
});

module.exports = router;
