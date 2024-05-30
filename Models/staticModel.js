const admin = require('firebase-admin');
const database = require('../database');

// Convert to date format
function getLocalizedDateString() {
  const date = new Date();
  return date.toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour12: false }); 
}

// Create a new Static asset
async function createStaticAsset(assetData) {
  const ref = await database.ref('statics').push();
  const localizedDate = getLocalizedDateString();
  await ref.set({
    id_as: ref.key,
    name_as: assetData.name_as,
    description_as: assetData.description_as,
    depreciationRate_as: assetData.depreciationRate_as,
    photo_as: assetData.photo_as,
    price_as: assetData.price_as,
    QRcode_as: assetData.QRcode_as,
    SKU_as: assetData.SKU_as,
    purchaseDate_as: assetData.purchaseDate_as,
    createdAt: localizedDate,
    updatedAt: localizedDate
  });
  return { id_as: ref.key, ...assetData, createdAt: localizedDate, updatedAt: localizedDate };
}

// Read a Static asset by ID
async function getStaticAsset(assetId) {
  const snapshot = await database.ref('statics/' + assetId).once('value');
  const asset = snapshot.val();
  if (asset) {
    asset.createdAt = new Date(asset.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour12: false });
    asset.updatedAt = new Date(asset.updatedAt).toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour12: false });
  }
  return asset;
}

// Update a Static asset by ID
async function updateStaticAsset(assetId, newData) {
  const localizedDate = getLocalizedDateString();  
  newData.updatedAt = localizedDate;
  await database.ref('statics/' + assetId).update(newData);
  return { id_as: assetId, ...newData, updatedAt: localizedDate };
}

// Delete a Static asset by ID
async function deleteStaticAsset(assetId) {
  await database.ref('statics/' + assetId).remove();
  return { id_as: assetId };
}

// Query all Static assets
async function queryStaticAssets() {
  const snapshot = await database.ref('statics').once('value');
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
  createStaticAsset,
  getStaticAsset,
  updateStaticAsset,
  deleteStaticAsset,
  queryStaticAssets
};
