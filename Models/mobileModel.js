// /Models/mobileModel.js
const admin = require('firebase-admin');
const database = require('../database');

// Create a new mobile asset
async function createMobileAsset(assetData) {
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
}

// Read a mobile asset by ID
async function getMobileAsset(assetId) {
  const snapshot = await database.ref('assets/' + assetId).once('value');
  return snapshot.val();
}

// Update a mobile asset by ID
async function updateMobileAsset(assetId, newData) {
  newData.updatedAt = admin.database.ServerValue.TIMESTAMP;
  await database.ref('assets/' + assetId).update(newData);
  return { id: assetId, ...newData };
}

// Delete a mobile asset by ID
async function deleteMobileAsset(assetId) {
  await database.ref('assets/' + assetId).remove();
  return { id: assetId };
}

// Query all mobile assets
async function queryMobileAssets() {
  const snapshot = await database.ref('assets').once('value');
  const assets = [];
  snapshot.forEach(childSnapshot => {
    assets.push({ id: childSnapshot.key, ...childSnapshot.val() });
  });
  return assets;
}

module.exports = {
  createMobileAsset,
  getMobileAsset,
  updateMobileAsset,
  deleteMobileAsset,
  queryMobileAssets
};
