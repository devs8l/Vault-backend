const mongoose = require('mongoose');

const healthInsuranceLeadSchema = new mongoose.Schema({
  policy_type: { type: String, enum: ['new', 'renew'], required: true },
  adults: { type: Number, default: 0 },
  children: { type: Number, default: 0 },
  existing_disease: { type: String },
  insurer: { type: String },
  preferred_insurer: { type: String },
  current_insurer: { type: String },
  claim_status: { type: String, enum: ['yes', 'no'], default: null },
  tenure: { type: Number },
  eldest_age: { type: Number },
  pincode: { type: String, maxlength: 10 },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true, maxlength: 14 },
  policy_file: { type: String }, // Store file path or URL
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HealthInsuranceLead', healthInsuranceLeadSchema);