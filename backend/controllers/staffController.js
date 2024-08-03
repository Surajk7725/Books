import Staff from '../models/staff.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import sendEmail from '../utils/sendEmail.js';

//Adding a Staff Member

export const addStaff = asyncHandler(async (request,response) => {
    const {fullName, username, email, password} = request.body;

    try {
        const hashedPassword = await bcrypt.hash(password,12);

        const staff = await Staff.create({
            fullName, 
            username,
            email,
            password : hashedPassword
        });

        await sendEmail(email, 'Your Staff Account Credentials', `Username: ${username}\nPassword: ${password}`);

        response.status(201).json({message:'Staff Added Successfully'});
    } catch (error) {
        response.status(500).json({message:"Server error", error: error.message});
    }
});

