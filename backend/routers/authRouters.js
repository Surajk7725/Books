import express from 'express';
import { registerUser, loginUser, forgetPassword, resetPassword, getMe } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getMe);
router.post('/forget-password', forgetPassword);
router.post('/update-password', resetPassword);



export default router;
