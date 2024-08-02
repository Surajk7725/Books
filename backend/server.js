import express from 'express';
import dotenv from 'dotenv';
import connectDB from './dbConnect.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 4000;
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));