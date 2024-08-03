import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './dbConnect.js';
import userRoutes from './routers/userRouter.js';
import staffRoutes from './routers/staffRouter.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/staff',staffRoutes);


localhost:5000/api/users/register



const PORT = process.env.PORT || 4000;
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));