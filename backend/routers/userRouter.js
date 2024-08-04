import express from 'express';
import { addUser, editUser, getAllUsers, getUserById, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/add', addUser);
router.put('/edit/:username', editUser);
router.get('/display', getAllUsers);
router.get('/display/:username', getUserById);
router.delete('/delete/:username', deleteUser);

export default router;
