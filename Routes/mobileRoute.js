import express from 'express';
import {
    createMobile,
    getMobile,
    getMobiles,
    updateMobile,
    deleteMobile
} from '../Controllers/mobileController.js';

const router = express.Router();

router.get('/mobiles', getMobiles);
router.post('/mobiles/new', createMobile);
router.get('/mobiles/:id', getMobile);
router.put('/mobiles/update/:id', updateMobile);
router.delete('/mobiles/delete/:id', deleteMobile);

export default router;
