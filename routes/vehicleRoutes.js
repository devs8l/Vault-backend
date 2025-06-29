import express from 'express';
import upload from '../middlewares/upload.js';
import {
  createNewVehicle,
  getAllNewVehicles,
  createOldVehicle,
  getAllOldVehicles,
} from '../controllers/vehicleController.js';

const router = express.Router();

// New Vehicle
router.post('/new', createNewVehicle);
router.get('/new', getAllNewVehicles);

// Old Vehicle with file upload
router.post(
  '/old',
  upload.fields([
    { name: 'rcFile', maxCount: 1 },
    { name: 'policyFile', maxCount: 1 },
  ]),
  createOldVehicle
);
router.get('/old', getAllOldVehicles);

export default router;
