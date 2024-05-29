const {
    createStaticAsset,
    getStaticAsset,
    updateStaticAsset,
    deleteStaticAsset,
    queryStaticAssets
  } = require('../Models/staticModel');
  
  // Create a new Static asset
  async function createStatic(req, res) {
    try {
      const assetData = req.body;
      const asset = await createStaticAsset(assetData);
      res.json(asset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // Get a Static asset by ID
  async function getStatic(req, res) {
    try {
      const assetId = req.params.assetId;
      const asset = await getStaticAsset(assetId);
      res.json(asset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // Update a Static asset by ID
  async function updateStatic(req, res) {
    try {
      const assetId = req.params.assetId;
      const newData = req.body;
      const updatedAsset = await updateStaticAsset(assetId, newData);
      res.json(updatedAsset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // Delete a Static asset by ID
  async function deleteStatic(req, res) {
    try {
      const assetId = req.params.assetId;
      const deletedAsset = await deleteStaticAsset(assetId);
      res.json(deletedAsset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // Query all Static assets
  async function getAllStatics(req, res) {
    try {
      const assets = await queryStaticAssets();
      res.json(assets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  module.exports = {
    createStatic,
    getStatic,
    updateStatic,
    deleteStatic,
    getAllStatics
  };
  