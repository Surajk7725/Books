import express from 'express';
import { addUser, editUser, getAllUsers, getUserById, deleteUser, getUserBookHistory, getUserDownloadedBooks, updateUserPassword } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', addUser);
router.put('/edit/:username', editUser);
router.get('/display', getAllUsers);
router.get('/display/:username', getUserById);
router.delete('/delete/:username', deleteUser);
router.get('/books-history',authMiddleware,getUserBookHistory);
router.get('/downloaded-books', authMiddleware, getUserDownloadedBooks);
router.put('/update-password/:username', updateUserPassword);


export default router;
