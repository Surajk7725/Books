import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './dbConnect.js';
import authRoutes from './routers/authRouters.js';
import userRoutes from './routers/userRouter.js';
import staffRoutes from './routers/staffRouter.js';
import adminRoutes from './routers/adminRouter.js';
import contactRoutes from './routers/contactRouter.js';
import noteRoutes from './routers/noteRouter.js';
import bookRoutes from './routers/bookRouter.js';
import contentRoutes from './routers/contentRouter.js';
import notificationRoutes from './routers/notificationRouter.js';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/uploads/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).json({ message: 'File not found' });
        }
    });
});


app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
}));

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/books',bookRoutes);
app.use('/api/notes',noteRoutes);
app.use('/api/content',contentRoutes);
app.use('/api/staff',staffRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/notifications',notificationRoutes);
app.use('/api/contact',contactRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});