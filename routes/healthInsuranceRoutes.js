import express from 'express';
import multer from 'multer';
import HealthInsuranceLead from '../models/HealthInsuranceLead.js';
import { storage } from '../utils/cloudinary.js';

const router = express.Router();
const upload = multer({ storage });

// POST: Create Health Insurance Lead
router.post('/', upload.single('policy_file'), async (req, res) => {
  try {
    const leadData = {
      ...req.body,
      policy_type: req.body.policy_type || 'new',
    };

    if (req.file) {
      leadData.policy_file = req.file.path;
    }

    const lead = new HealthInsuranceLead(leadData);
    const saved = await lead.save();

    res.status(201).json({ success: true, id: saved._id, policy_type: saved.policy_type });
  } catch (err) {
    console.error(err);
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

export default router;
