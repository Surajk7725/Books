import express from 'express';
import { addStaff } from '../controllers/staffController.js';

const router = express.Router();

router.post('/add',addStaff);

export default router;