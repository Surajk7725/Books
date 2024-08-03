import express from 'express';
import { registerUser, loginUser, forgetPassword, resetPassword } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forget-password', forgetPassword);
router.post('/reset-password/:token', resetPassword);

// Add other user routes (addUser, etc.)

export default router;
