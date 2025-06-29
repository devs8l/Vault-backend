const NewVehicle = require('../models/NewVehicle');
const OldVehicle = require('../models/OldVehicle');

// Create New Vehicle
exports.createNewVehicle = async (req, res) => {
  try {
    const vehicle = new NewVehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All New Vehicles
exports.getAllNewVehicles = async (req, res) => {
  const vehicles = await NewVehicle.find();
  res.json(vehicles);
};

// Create Old Vehicle with Cloudinary uploads
exports.createOldVehicle = async (req, res) => {
  try {
    const rcFileUrl = req.files?.rcFile?.[0]?.path || '';
    const policyFileUrl = req.files?.policyFile?.[0]?.path || '';

    const vehicleData = {
      ...req.body,
      rcFileName: rcFileUrl,
      policyFileName: policyFileUrl
    };

    const vehicle = new OldVehicle(vehicleData);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Old Vehicles
exports.getAllOldVehicles = async (req, res) => {
  const vehicles = await OldVehicle.find();
  res.json(vehicles);
};
