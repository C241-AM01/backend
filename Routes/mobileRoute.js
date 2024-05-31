const express = require('express');
const {
  createMobile,
  getMobile,
  updateMobile,
  deleteMobile,
  getAllMobiles
} = require('../Controllers/mobileController');
// const { authenticateJWT, authorizeRole } = require('../Controllers/authController');

const router = express.Router();

// Get all mobile assets
router.get('/mobiles', getAllMobiles);

// Create a new mobile asset
router.post('/mobiles/new', createMobile);

// Get a mobile asset by ID
router.get('/mobiles/:assetId', getMobile);

// Update a mobile asset by ID
router.put('/mobiles/update/:assetId', updateMobile);

// Delete a mobile asset by ID
router.delete('/mobiles/delete/:assetId', deleteMobile);

module.exports = router;
