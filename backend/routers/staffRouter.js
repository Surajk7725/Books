import express from 'express';
import { addStaff, deleteStaff, editStaff, getAllStaff, getStaffById } from '../controllers/staffController.js';

const router = express.Router();

router.post('/add',addStaff);
router.put('/update/:id',editStaff);
router.get('/display',getAllStaff);
router.get('/display/:id',getStaffById);
router.delete('/:id',deleteStaff);


export default router;