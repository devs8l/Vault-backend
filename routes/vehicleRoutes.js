const express = require('express');
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const {
  createNewVehicle,
  getAllNewVehicles,
  createOldVehicle,
  getAllOldVehicles
} = require('../controllers/vehicleController');

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

module.exports = router;
