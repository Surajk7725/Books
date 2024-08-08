import express from 'express';
import { addUser, editUser, getAllUsers, getUserById, deleteUser, getUserBookHistory, getUserDownloadedBooks, updateUserPassword } from '../controllers/userController.js';
import { protect } from '../middleware/noteMiddleware.js';

const router = express.Router();

router.post('/add', addUser);
router.put('/edit/:username', editUser);
router.get('/display', getAllUsers);
router.get('/display/:username', getUserById);
router.delete('/delete/:username', deleteUser);
router.get('/books-history',protect,getUserBookHistory);
router.get('/downloaded-books', protect, getUserDownloadedBooks);
router.put('/update-password', updateUserPassword);


export default router;
