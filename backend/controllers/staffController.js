import Staff from '../models/staff.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import sendEmail from '../utils/sendEmail.js';
import { uploadProfilePic } from '../utils/pics.js';

//Adding a Staff Member

export const addStaff = asyncHandler(async (request, response) => {
    uploadProfilePic(request, response, async (err) => {
        if (err) {
            return response.status(400).json({ message: 'Error uploading image', error: err });
        }

        const { fullName, username, email, password, phoneNumber, dob, address, socialMediaLinks } = request.body;
        const profilePic = request.file ? request.file.path : null;

        try {
            const hashedPassword = await bcrypt.hash(password, 12);

            const newStaff = await Staff.create({
                fullName,
                username,
                email,
                password: hashedPassword,
                phoneNumber,
                dob,
                address,
                profilePic,
                socialMediaLinks
            });

            // Send email with username and password
            const emailSubject = 'Welcome to Our BookHub';
            const emailText = `Hello ${fullName},\n\nYour account has been created.\nUsername: ${username}\nPassword: ${password}\n\nPlease keep this information safe.`;

            try {
                await sendEmail(email, emailSubject, emailText);
            } catch (emailError) {
                console.error('Error sending welcome email:', emailError);
                return response.status(500).json({ message: 'Staff added but email not sent', error: emailError.message });
            }

            response.status(201).json({ message: 'Staff Added Successfully', staff: newStaff });
        } catch (error) {
            response.status(500).json({ message: "Server error", error: error.message });
        }
    });
});

// Editing a staff member

export const editStaff = asyncHandler(async (request, response) => {
    uploadProfilePic(request, response, async (err) => {
        if (err) {
            return response.status(400).json({ message: 'Error uploading image', error: err });
        }

        const { username } = request.params;
        const { fullName, email, password, phoneNumber, dob, address, socialMediaLinks } = request.body;
        const profilePic = request.file ? request.file.path : null;

        try {
            const updateData = { fullName, email, phoneNumber, dob, address, socialMediaLinks };
            if (profilePic) 
                updateData.profilePic = profilePic;
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 12);
                updateData.password = hashedPassword;
            }

            const updateStaff = await Staff.findOneAndUpdate({ username }, updateData, { new: true });

            if (!updateStaff) {
                return response.status(404).json({ message: "Staff not found" });
            }

            response.status(200).json({ message: "Staff updated successfully", staff: updateStaff });
        } catch (error) {
            response.status(500).json({ message: "Server Error", error: error.message });
        }
    });
});


// Display all Staff

export const getAllStaff = asyncHandler(async (request,response) => {
    try {
        const staff = await Staff.find({});
        response.status(200).json(staff);
    } catch (error) {
        response.status(500).json({message:"Server Error",error:error.message});
    }
});

// Display a single staff

export const getStaffById = asyncHandler(async(request,response) => {
    const { username } = request.params;

    try {
        const staff = await Staff.findOne({ username });
        if(!staff) {
            return response.status(404).json({message:"Staff Not Found"});
        }
        response.status(200).json(staff);
    } catch (error) {
        response.status(500).json({message:"Server Error",error:error.message});
    }
});


// Delete a Staff

export const deleteStaff = asyncHandler (async(request,response) => {
    const { username } = request.params;
    try {
        const deleteStaff = await Staff.findOneAndDelete({ username });

        if(!deleteStaff) {
            return response.status(404).json({message:"Staff Not Found"});
        }
        response.status(200).json({message:"Staff Deleted Successfully"});
    } catch(error) {
        response.status(500).json({message:"Server Error",error:error.message});
    }
});


