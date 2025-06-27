const express = require('express');
const multer = require('multer');
const {
    createNewVehicle,
    getAllNewVehicles,
    createOldVehicle,
    getAllOldVehicles
} = require('../controllers/vehicleController');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'rcFile') {
            cb(null, 'uploads/rc/');
        } else {
            cb(null, 'uploads/policy/');
        }
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

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
