const NewVehicle = require('../models/NewVehicle');
const OldVehicle = require('../models/OldVehicle');

exports.createNewVehicle = async (req, res) => {
    try {
        const vehicle = new NewVehicle(req.body);
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllNewVehicles = async (req, res) => {
    const vehicles = await NewVehicle.find();
    res.json(vehicles);
};

exports.createOldVehicle = async (req, res) => {
    try {
        const { rcFile, policyFile } = req.files;
        const data = {
            ...req.body,
            rcFileName: rcFile?.[0]?.filename,
            policyFileName: policyFile?.[0]?.filename
        };
        const vehicle = new OldVehicle(data);
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllOldVehicles = async (req, res) => {
    const vehicles = await OldVehicle.find();
    res.json(vehicles);
};
