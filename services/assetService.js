const admin = require('firebase-admin');
const { CustomError } = require('../exceptions/customError');

const addAsset = async (req, res) => {
    const { name, description, depreciation, image, purchaseDate, price } = req.body;
    try {
        const newAsset = {
            name,
            description,
            depreciation,
            image,
            purchaseDate: admin.firestore.Timestamp.fromDate(new Date(purchaseDate)),
            price,
            createdBy: req.user.uid,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };
        const docRef = await admin.firestore().collection('assets').add(newAsset);
        res.json({ message: "Asset added successfully", id: docRef.id });
    } catch (error) {
        console.error("Error adding asset:", error);
        res.status(500).json({ error: "Error adding asset" });
    }
};

const listAssets = async (req, res) => {
    try {
        const snapshot = await admin.firestore().collection('assets').get();
        const assets = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.json({ assets });
    } catch (error) {
        console.error("Error retrieving assets:", error);
        res.status(500).json({ error: "Error retrieving assets" });
    }
};

const getAsset = async (req, res) => {
    const { assetId } = req.params;
    try {
        const doc = await admin.firestore().collection('assets').doc(assetId).get();
        if (!doc.exists) {
            throw new CustomError("Asset not found", 404);
        }
        res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error("Error retrieving asset:", error);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const updateAsset = async (req, res) => {
    const { assetId } = req.params;
    const updates = req.body;
    try {
        await admin.firestore().collection('assets').doc(assetId).update({
            ...updates,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.json({ message: "Asset updated successfully" });
    } catch (error) {
        console.error("Error updating asset:", error);
        res.status(500).json({ error: "Error updating asset" });
    }
};

const deleteAsset = async (req, res) => {
    const { assetId } = req.params;
    try {
        await admin.firestore().collection('assets').doc(assetId).delete();
        res.json({ message: "Asset deleted successfully" });
    } catch (error) {
        console.error("Error deleting asset:", error);
        res.status(500).json({ error: "Error deleting asset" });
    }
};

module.exports = { addAsset, listAssets, getAsset, updateAsset, deleteAsset };
