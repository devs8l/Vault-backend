import NewVehicle from '../models/NewVehicle.js';
import OldVehicle from '../models/OldVehicle.js';

// Create New Vehicle
export const createNewVehicle = async (req, res) => {
  try {
    const vehicle = new NewVehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All New Vehicles
export const getAllNewVehicles = async (req, res) => {
  try {
    const vehicles = await NewVehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Old Vehicle with Cloudinary uploads
export const createOldVehicle = async (req, res) => {
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
export const getAllOldVehicles = async (req, res) => {
  try {
    const vehicles = await OldVehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
