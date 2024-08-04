import express from 'express';
import { addStaff, deleteStaff, editStaff, getAllStaff, getStaffById } from '../controllers/staffController.js';

const router = express.Router();

router.post('/add',addStaff);
router.put('/update/:username',editStaff);
router.get('/display',getAllStaff);
router.get('/display/:username',getStaffById);
router.delete('/delete/:username',deleteStaff);


export default router;