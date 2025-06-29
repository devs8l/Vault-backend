/*const mongoose = require('mongoose');

const oldVehicleSchema = new mongoose.Schema({
    fullName: String,
    mobileNumber: String,
    emailId: String,
    pinCode: String,
    rcFileName: String,
    policyFileName: String,
    vehicleCategory: String,
    registrationNumber: String,
    registrationYear: String,
    prevPolicyExpiry: String,
    previousClaims: String,
    fuelType: String,
    coverageType: String,
    preferredCompanies: [String],
    selectedAddOns: [String],
}, { timestamps: true });

module.exports = mongoose.model('OldVehicle', oldVehicleSchema);

export default oldVehicleSchema;*/

import mongoose from 'mongoose';

const oldVehicleSchema = new mongoose.Schema({
  fullName: String,
  mobileNumber: String,
  emailId: String,
  pinCode: String,
  rcFileName: String,
  policyFileName: String,
  vehicleCategory: String,
  registrationNumber: String,
  registrationYear: String,
  prevPolicyExpiry: String,
  previousClaims: String,
  fuelType: String,
  coverageType: String,
  preferredCompanies: [String],
  selectedAddOns: [String],
}, { timestamps: true });

const OldVehicle = mongoose.model('OldVehicle', oldVehicleSchema);
export default OldVehicle;
