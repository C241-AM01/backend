import express from 'express';

import {
    createAsset,
    getAsset,
    getAssets,
    updateAsset,
    deleteAsset
} from '../Controllers/assetController.js'

const router = express.Router();

router.get('/assets', getAssets);
router.post('/assets/new', createAsset);
router.get('/assets/:id', getAsset);
router.put('/assets/update/:id', updateAsset);
router.delete('/assets/delete/:id', deleteAsset);

export default router;