import express from 'express';
import { getNotifications } from '../controllers/notificationsController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/notify', authMiddleware, getNotifications);

export default router;