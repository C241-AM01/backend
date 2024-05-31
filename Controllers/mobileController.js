// /Controllers/mobileController.js
const {
    createMobileAsset,
    getMobileAsset,
    updateMobileAsset,
    deleteMobileAsset,
    queryMobileAssets
  } = require('../Models/mobileModel');
  
  // Create a new mobile asset
  async function createMobile(req, res) {
    try {
      const assetData = req.body;
      const asset = await createMobileAsset(assetData);
      res.json(asset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // Get a mobile asset by ID
  async function getMobile(req, res) {
    try {
      const assetId = req.params.assetId;
      const asset = await getMobileAsset(assetId);
      res.json(asset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // Update a mobile asset by ID
  async function updateMobile(req, res) {
    try {
      const assetId = req.params.assetId;
      const newData = req.body;
      const updatedAsset = await updateMobileAsset(assetId, newData);
      res.json(updatedAsset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // Delete a mobile asset by ID
  async function deleteMobile(req, res) {
    try {
      const assetId = req.params.assetId;
      const deletedAsset = await deleteMobileAsset(assetId);
      res.json(deletedAsset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // Query all mobile assets
  async function getAllMobiles(req, res) {
    try {
      const assets = await queryMobileAssets();
      res.json(assets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  module.exports = {
    createMobile,
    getMobile,
    updateMobile,
    deleteMobile,
    getAllMobiles
  };
  