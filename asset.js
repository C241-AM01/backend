// asset.js
const admin = require('firebase-admin');
const database = require('./database');

// Create a new mobile asset
async function createMobileAsset(assetData) {
  try {
    const ref = await database.ref('assets').push();
    await ref.set({
      id: ref.key,
      name: assetData.name,
      latitude: assetData.latitude,
      longitude: assetData.longitude,
      createdAt: admin.database.ServerValue.TIMESTAMP,
      updatedAt: admin.database.ServerValue.TIMESTAMP
    });
    return { id: ref.key, ...assetData };
  } catch (error) {
    throw new Error('Failed to create mobile asset');
  }
}

// Read a mobile asset by ID
async function getMobileAsset(assetId) {
  try {
    const snapshot = await database.ref('assets/' + assetId).once('value');
    return snapshot.val();
  } catch (error) {
    throw new Error('Failed to get mobile asset');
  }
}

// Update a mobile asset by ID
async function updateMobileAsset(assetId, newData) {
  try {
    newData.updatedAt = admin.database.ServerValue.TIMESTAMP;
    await database.ref('assets/' + assetId).update(newData);
    return { id: assetId, ...newData };
  } catch (error) {
    throw new Error('Failed to update mobile asset');
  }
}

// Delete a mobile asset by ID
async function deleteMobileAsset(assetId) {
  try {
    console.log(`Attempting to delete asset: ${assetId}`);
    await database.ref('assets/' + assetId).remove();
    console.log(`Successfully deleted asset: ${assetId}`);
    return { id: assetId };
  } catch (error) {
    console.error(`Failed to delete asset: ${error.message}`);
    throw new Error('Failed to delete mobile asset');
  }
}

// Query all mobile assets
async function queryMobileAssets() {
  try {
    const snapshot = await database.ref('assets').once('value');
    const assets = [];
    snapshot.forEach(childSnapshot => {
      assets.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });
    return assets;
  } catch (error) {
    throw new Error('Failed to query mobile assets');
  }
}

module.exports = {
  createMobileAsset,
  getMobileAsset,
  updateMobileAsset,
  deleteMobileAsset,
  queryMobileAssets
};
