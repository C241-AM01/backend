const express = require('express');
const {
  createStatic,
  getStatic,
  updateStatic,
  deleteStatic,
  getAllStatics
} = require('../Controllers/staticController');

const router = express.Router();

// Get all static assets
router.get('/statics', getAllStatics);

// Create a new static asset
router.post('/statics/new', createStatic);

// Get a static asset by ID
router.get('/statics/:assetId', getStatic);

// Update a static asset by ID
router.put('/statics/update/:assetId', updateStatic);

// Delete a static asset by ID
router.delete('/statics/delete/:assetId', deleteStatic);

module.exports = router;
