const admin = require('firebase-admin');
const database = require('../database');

// Convert to date format
function getLocalizedDateString() {
  const date = new Date();
  return date.toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour12: false }); 
}

// Create a new mobile asset
async function createMobileAsset(assetData) {
  const ref = await database.ref('mobiles').push();
  const localizedDate = getLocalizedDateString();
  await ref.set({
    id_am: ref.key,
    name_am: assetData.name_am,
    latitude: assetData.latitude,
    longitude: assetData.longitude,
    createdAt: admin.database.ServerValue.TIMESTAMP,
    updatedAt: admin.database.ServerValue.TIMESTAMP
  });
  return { id_am: ref.key, ...assetData, createdAt: localizedDate, updatedAt: localizedDate };
}

// Read a mobile asset by ID
async function getMobileAsset(assetId) {
  const snapshot = await database.ref('mobiles/' + assetId).once('value');
  const asset = snapshot.val();
  if (asset) {
    asset.createdAt = new Date(asset.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour12: false });
    asset.updatedAt = new Date(asset.updatedAt).toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour12: false });
  }
  return asset;
}

// Update a mobile asset by ID
async function updateMobileAsset(assetId, newData) {
  const localizedDate = getLocalizedDateString();
  newData.updatedAt = localizedDate;
  await database.ref('mobiles/' + assetId).update(newData);
  return { id_am: assetId, ...newData, updatedAt: localizedDate };
}

// Delete a mobile asset by ID
async function deleteMobileAsset(assetId) {
  await database.ref('mobiles/' + assetId).remove();
  return { id_am: assetId };
}

// Query all mobile assets
async function queryMobileAssets() {
  const snapshot = await database.ref('mobiles').once('value');
  const assets = [];
  snapshot.forEach(childSnapshot => {
    const asset = childSnapshot.val();
    asset.createdAt = new Date(asset.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour12: false });
    asset.updatedAt = new Date(asset.updatedAt).toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour12: false });
    assets.push({ id: childSnapshot.key, ...asset });
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
