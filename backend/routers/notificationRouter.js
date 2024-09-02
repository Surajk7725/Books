import express from 'express';
import { getNotifications } from '../controllers/notificationsController.js';

const router = express.Router();

router.get('/notifiy', getNotifications);

export default router;