import firebase from '../firebase.js';
import Asset from '../Models/assetModel.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

// Create asset function
export const createAsset = async (req, res, next) => {
    try {
      const data = req.body;
      await addDoc(collection(db, 'assets'), data);
      res.status(200).send('asset created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
};

// Get all asset function
export const getAssets = async (req, res, next) => {
    try {
      const assets = await getDocs(collection(db, 'assets'));
      const assetArray = [];
  
      if (assets.empty) {
        res.status(400).send('No Assets found');
      } else {
        assets.forEach((doc) => {
          const asset = new Asset(
            doc.id,
            doc.data().name_as,
            doc.data().description_as,
            doc.data().depreciationRate_as,
            doc.data().photo_as,
            doc.data().price_as,
            doc.data().purchaseDate_as,
            doc.data().QRcode_as,
          );
          assetArray.push(asset);
        });
  
        res.status(200).send(assetArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
};

//   Get asset by id function
export const getAsset = async (req, res, next) => {
    try {
      const id = req.params.id;
      const asset = doc(db, 'assets', id);
      const data = await getDoc(asset);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('asset not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
};

// Update asset by id function
export const updateAsset = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const asset = doc(db, 'assets', id);
      await updateDoc(asset, data);
      res.status(200).send('asset updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
};

// delete asset function
export const deleteAsset = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'assets', id));
      res.status(200).send('asset deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  