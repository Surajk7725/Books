import express from 'express';
import { addAdmin } from '../controllers/adminController';

const router = express.Router();

router.post('/add',addAdmin);

export default router;