import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendEmail.js';
import asyncHandler from 'express-async-handler';
import { uploadProfilePic } from '../utils/pics.js';

// Add a new user

export const addUser = asyncHandler(async (request, response) => {
    upload.single('profilePic')(request, response, async (err) => {
        if (err) {
            return response.status(400).json({ message: 'Error uploading image', error: err.message });
        }

        const { fullname, username, email, phonenumber, dob, address, password, socialMediaLinks } = request.body;
        const profilePic = request.file ? request.file.path : null;

        try {
            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = await User.create({
                fullname,
                username,
                email,
                phonenumber,
                dob,
                address,
                password: hashedPassword,
                profilePic,
                socialMediaLinks
            });

            // Send email with username and password
            const emailSubject = 'Welcome to Our Service';
            const emailText = `Hello ${fullname},\n\nYour account has been created.\nUsername: ${username}\nPassword: ${password}\n\nPlease keep this information safe.`;

            await sendEmail(email, emailSubject, emailText);

            response.status(201).json({ message: 'User added successfully', user: newUser });
        } catch (error) {
            response.status(500).json({ message: 'Server error', error: error.message });
        }
    });
});


// Edit an existing user
export const editUser = asyncHandler(async (request, response) => {
    upload.single('profilePic')(request, response, async (err) => {
        if (err) {
            return response.status(400).json({ message: 'Error uploading image', error: err.message });
        }

        const { username } = req.params;
        const { fullname, email, phonenumber, dob, address, socialMediaLinks } = req.body;
        const profilePic = req.file ? req.file.path : null;

        try {
            const updateData = { fullname, email, phonenumber, dob, address, socialMediaLinks };
            if (profilePic) updateData.profilePic = profilePic;

            const updatedUser = await User.findOneAndUpdate({ username }, updateData, { new: true });

            if (!updatedUser) {
                return response.status(404).json({ message: 'User not found' });
            }

            response.status(200).json({ message: 'User updated successfully', user: updatedUser });
        } catch (error) {
            response.status(500).json({ message: 'Server error', error: error.message });
        }
    });
});

// Display all Users

export const getAllUsers = asyncHandler(async (request,response) => {
    try {
        const user = await User.find({});
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json({message:"Server Error",error:error.message});
    }
});

// Display a single staff

export const getUserById = asyncHandler(async(request,response) => {
    const { username } = request.params;

    try {
        const user = await User.findOne({ username });
        if(!user) {
            return response.status(404).json({message:"User Not Found"});
        }
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json({message:"Server Error",error:error.message});
    }
});


// Delete a Staff

export const deleteUser = asyncHandler (async(request,response) => {
    const { username } = request.params;
    try {
        const deleteUser = await Staff.findOneAndDelete({ username });

        if(!deleteUser) {
            return response.status(404).json({message:"User Not Found"});
        }
        response.status(200).json({message:"User Deleted Successfully"});
    } catch(error) {
        response.status(500).json({message:"Server Error",error:error.message});
    }
});


