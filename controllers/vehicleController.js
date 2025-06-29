/*const NewVehicle = require('../models/NewVehicle');
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
*/

import NewVehicle from '../models/NewVehicle.js';
import OldVehicle from '../models/OldVehicle.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

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
  const vehicles = await NewVehicle.find();
  res.json(vehicles);
};

// Create Old Vehicle with Cloudinary uploads
export const createOldVehicle = async (req, res) => {
  try {
    let rcFileUrl = '';
    let policyFileUrl = '';

    // Upload files if they exist
    if (req.files?.rcFile?.[0]) {
      rcFileUrl = (await uploadToCloudinary(req.files.rcFile[0].buffer, 'vehicle_rc_files')).secure_url;
    }
    if (req.files?.policyFile?.[0]) {
      policyFileUrl = (await uploadToCloudinary(req.files.policyFile[0].buffer, 'vehicle_policy_files')).secure_url;
    }

    const vehicleData = {
      ...req.body,
      rcFileName: rcFileUrl,
      policyFileName: policyFileUrl,
    };

    const vehicle = new OldVehicle(vehicleData);
    await vehicle.save();

    res.status(201).json(vehicle);
  } catch (error) {
    console.error('Old Vehicle Upload Error:', error);
    res.status(400).json({ error: error.message });
  }
};

// Get All Old Vehicles
export const getAllOldVehicles = async (req, res) => {
  const vehicles = await OldVehicle.find();
  res.json(vehicles);
};
