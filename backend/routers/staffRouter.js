import express from 'express';
import { addStaff } from '../controllers/staffController';

const router = express.Router();

router.post('/add',addStaff);

export default router;