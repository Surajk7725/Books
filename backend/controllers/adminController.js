import Admin from '../models/admin.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import sendEmail from '../utils/sendEmail.js';

// Adding a admin member
export const addAdmin = asyncHandler(async (request,response) => {
    const {fullname, username, email, password} = request.body;

    try {
        const hashedPassword = await bcrypt.hash(password,12);

        const admin = await Admin.create({
            fullname,
            username,
            email,
            password : hashedPassword
        });

        await sendEmail(email, 'Your Admin Account Credentials', `Username: ${username}\nPassword: ${password}`);

        response.status(201).json({message: "Admin Added Successfully"});
    } catch (error) {
        response.status(500).json({message:"Server error", error: error.message});
    }
})