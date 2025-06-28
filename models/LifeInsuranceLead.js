const mongoose = require('mongoose');

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

module.exports = mongoose.model('LifeInsuranceLead', lifeInsuranceLeadSchema);
