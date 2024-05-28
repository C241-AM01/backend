// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { createMobileAsset } = require('./asset');
const { getMobileAsset } = require('./asset');
const { updateMobileAsset } = require('./asset');
const { deleteMobileAsset } = require('./asset');
const { queryMobileAssets } = require('./asset');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes

// Create a new mobile asset
app.post('/assets', async (req, res) => {
  try {
    const assetData = req.body;
    const asset = await createMobileAsset(assetData);
    res.json(asset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a mobile asset by ID
app.get('/assets/:assetId', async (req, res) => {
  try {
    const assetId = req.params.assetId;
    const asset = await getMobileAsset(assetId);
    res.json(asset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a mobile asset by ID
app.put('/assets/:assetId', async (req, res) => {
  try {
    const assetId = req.params.assetId;
    const newData = req.body;
    const updatedAsset = await updateMobileAsset(assetId, newData);
    res.json(updatedAsset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a mobile asset by ID
app.delete('/assets/:assetId', async (req, res) => {
  try {
    const assetId = req.params.assetId;
    console.log(`Deleting asset with ID: ${assetId}`);
    const deletedAsset = await deleteMobileAsset(assetId);
    console.log(`Deleted asset: ${JSON.stringify(deletedAsset)}`);
    res.json(deletedAsset);
  } catch (error) {
    console.error(`Error deleting asset: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Query all mobile assets
app.get('/assets', async (req, res) => {
  try {
    const assets = await queryMobileAssets();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
