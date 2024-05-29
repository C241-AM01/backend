const admin = require('firebase-admin');
const database = require('../database');

// Create a new Static asset
async function createStaticAsset(assetData) {
  const ref = await database.ref('statics').push();
  await ref.set({
    id_as: ref.key,
    name_as: assetData.name_as,
    description_as: assetData.description_as,
    depreciationRate_as: assetData.depreciationRate_as,
    photo_as: assetData.photo_as,
    price_as: assetData.price_as,
    purchaseDate_as: purchaseDate_as,
    QRcode_as: assetData.QRcode_as,
    SKU_as: assetData.SKU_as,
    createdAt: admin.database.ServerValue.TIMESTAMP,
    updatedAt: admin.database.ServerValue.TIMESTAMP
  });
  return { id: ref.key, ...assetData };
}

// Read a Static asset by ID
async function getStaticAsset(assetId) {
  const snapshot = await database.ref('statics/' + assetId).once('value');
  return snapshot.val();
}

// Update a Static asset by ID
async function updateStaticAsset(assetId, newData) {
  newData.updatedAt = admin.database.ServerValue.TIMESTAMP;
  await database.ref('statics/' + assetId).update(newData);
  return { id_as: assetId, ...newData };
}

// Delete a Static asset by ID
async function deleteStaticAsset(assetId) {
  await database.ref('statics/' + assetId).remove();
  return { id_as: assetId };
}

// Query all Static assets
async function queryStaticAssets() {
  const snapshot = await database.ref('statics').once('value');
  const statics = [];
  snapshot.forEach(childSnapshot => {
    statics.push({ id_as: childSnapshot.key, ...childSnapshot.val() });
  });
  return statics;
}

module.exports = {
  createStaticAsset,
  getStaticAsset,
  updateStaticAsset,
  deleteStaticAsset,
  queryStaticAssets
};
