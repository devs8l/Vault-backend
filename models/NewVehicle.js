import mongoose from "mongoose";

const newVehicleSchema = new mongoose.Schema({
    fullName: String,
    mobileNumber: String,
    emailId: String,
    pinCode: String,
    vehicleCategory: String,
    vehicleBrand: String,
    vehicleModel: String,
    fuelType: String,
    registrationYear: String,
    coverageType: String,
    preferredCompanies: [String],
    selectedAddOns: [String],
}, { timestamps: true });

export default mongoose.model('NewVehicle', newVehicleSchema);
