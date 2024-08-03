import express from 'express';
import { addAdmin, deleteAdmin, editAdmin, getAdminById, getAllAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.post('/add',addAdmin);
router.put('/updated/:id',editAdmin);
router.get('/display',getAllAdmin);
router.get('/display/:id',getAdminById);
router.delete('/:id',deleteAdmin);


export default router;