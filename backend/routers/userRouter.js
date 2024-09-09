import express from 'express';
import { addUser, editUser, getAllUsers, getUserById, deleteUser, saveBookView, getUserBookHistory, updateUserPassword } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', addUser);
router.put('/update/:username', editUser);
router.get('/display', getAllUsers);
router.get('/display/:username', getUserById);
router.delete('/delete/:username', deleteUser);
router.post('/save-history',authMiddleware,saveBookView);
router.get('/books-history/:username',authMiddleware,getUserBookHistory);
router.put('/update-password/:username', updateUserPassword);


export default router;
