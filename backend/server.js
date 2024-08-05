import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './dbConnect.js';
import authRoutes from './routers/authRouter.js';
import userRoutes from './routers/userRouter.js';
import staffRoutes from './routers/staffRouter.js';
import adminRoutes from './routers/adminRouter.js';
import contactRoutes from './routers/contactRouter.js';
import noteRoutes from './routers/noteRouter.js';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/user-notes', noteRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact-issues', contactRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));