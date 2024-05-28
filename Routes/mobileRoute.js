// /Routes/mobileRoute.js
const express = require('express');
const {
  createAsset,
  getAsset,
  updateAsset,
  deleteAsset,
  getAllAssets
} = require('../Controllers/mobileController');

const router = express.Router();

// Create a new mobile asset
router.post('/assets', createAsset);

// Get a mobile asset by ID
router.get('/assets/:assetId', getAsset);

// Update a mobile asset by ID
router.put('/assets/:assetId', updateAsset);

// Delete a mobile asset by ID
router.delete('/assets/:assetId', deleteAsset);

// Query all mobile assets
router.get('/assets', getAllAssets);

module.exports = router;
