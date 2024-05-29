const admin = require('firebase-admin');
const database = require('../database');

// Create a new mobile asset
async function createMobileAsset(assetData) {
  const ref = await database.ref('mobiles').push();
  await ref.set({
    id_am: ref.key,
    name_am: assetData.name,
    latitude: assetData.latitude,
    longitude: assetData.longitude,
    createdAt: admin.database.ServerValue.TIMESTAMP,
    updatedAt: admin.database.ServerValue.TIMESTAMP
  });
  return { id_am: ref.key, ...assetData };
}

// Read a mobile asset by ID
async function getMobileAsset(assetId) {
  const snapshot = await database.ref('mobiles/' + assetId).once('value');
  return snapshot.val();
}

// Update a mobile asset by ID
async function updateMobileAsset(assetId, newData) {
  newData.updatedAt = admin.database.ServerValue.TIMESTAMP;
  await database.ref('mobiles/' + assetId).update(newData);
  return { id_am: assetId, ...newData };
}

// Delete a mobile asset by ID
async function deleteMobileAsset(assetId) {
  await database.ref('mobiles/' + assetId).remove();
  return { id_am: assetId };
}

// Query all mobile assets
async function queryMobileAssets() {
  const snapshot = await database.ref('mobiles').once('value');
  const mobiles = [];
  snapshot.forEach(childSnapshot => {
    mobiles.push({ id_am: childSnapshot.key, ...childSnapshot.val() });
  });
  return mobiles;
}

module.exports = {
  createMobileAsset,
  getMobileAsset,
  updateMobileAsset,
  deleteMobileAsset,
  queryMobileAssets
};
