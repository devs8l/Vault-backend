import express from 'express';
import multer from 'multer';
import { storage } from '../utils/cloudinary.js';
import {
  createNewVehicle,
  getAllNewVehicles,
  createOldVehicle,
  getAllOldVehicles
} from '../controllers/vehicleController.js';

const router = express.Router();
const upload = multer({ storage });

router.post('/new', createNewVehicle);
router.get('/new', getAllNewVehicles);

router.post(
  '/old',
  upload.fields([
    { name: 'rcFile', maxCount: 1 },
    { name: 'policyFile', maxCount: 1 }
  ]),
  createOldVehicle
);
router.get('/old', getAllOldVehicles);

export default router;
