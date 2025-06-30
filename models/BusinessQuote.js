import mongoose from "mongoose";

const businessQuoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  business_name: { type: String },
  mobile_number: { type: String, required: true, maxlength: 14 },
  product_type: { type: String, enum: ['retail', 'service', 'manufacturing'], required: true },
  email: { type: String },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('BusinessQuote', businessQuoteSchema);
