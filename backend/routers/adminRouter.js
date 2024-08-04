import express from 'express';
import { addAdmin, deleteAdmin, editAdmin, getAdminById, getAllAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.post('/add',addAdmin);
router.put('/updated/:username',editAdmin);
router.get('/display',getAllAdmin);
router.get('/display/:username',getAdminById);
router.delete('/delete/:username',deleteAdmin);


export default router;