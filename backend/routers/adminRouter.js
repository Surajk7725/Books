import express from 'express';
import { addAdmin, deleteAdmin, editAdmin, getAdminById, getAdminDashboardStats, getAllAdmin, getBookDetails, getStaffHistory, getUserHistory, updateAdminPassword } from '../controllers/adminController.js';


const router = express.Router();

router.post('/add',addAdmin);
router.put('/update/:username',editAdmin);
router.get('/display',getAllAdmin);
router.get('/display/:username',getAdminById);
router.delete('/delete/:username',deleteAdmin);
router.put('/update-password/:username', updateAdminPassword);
router.get('/counts', getAdminDashboardStats);
router.get('/user-history', getUserHistory);
router.get('/staff-history', getStaffHistory);
router.get('/book-history', getBookDetails);


export default router;