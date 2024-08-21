import express from 'express';
import { registerUser, loginUser, forgetPassword, resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forget-password', forgetPassword);
router.post('/update-password', resetPassword);


export default router;
