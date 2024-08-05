import Admin from '../models/admin.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import sendEmail from '../utils/sendEmail.js';
import { uploadProfilePic } from '../utils/pics.js';

// Adding a admin member
export const addAdmin = asyncHandler(async (request,response) => {
    uploadProfilePic(request, response, async (err) => {
        if (err) {
            return response.status(400).json({ message: 'Error uploading image', error: err });
        }
    
        const {fullname, username, email, password, phoneNumber, dob, address, socialMediaLinks} = request.body;
        const profilePic = request.file ? request.file.path : null;

        try {
            const hashedPassword = await bcrypt.hash(password,12);

            const newAdmin = await Admin.create({
                fullname,
                username,
                email,
                password : hashedPassword,
                phoneNumber,
                dob,
                address,
                profilePic,
                socialMediaLinks
            });

            // Send email with username and password
            const emailSubject = 'Welcome to Our Service';
            const emailText = `Hello ${fullName},\n\nYour account has been created.\nUsername: ${username}\nPassword: ${password}\n\nPlease keep this information safe.`;

            await sendEmail(email, emailSubject, emailText);

            response.status(201).json({message: "Admin Added Successfully", admin: newAdmin});
        } catch (error) {
            response.status(500).json({message:"Server error", error: error.message});
        }
    });    
});

// Editing the admin member

export const editAdmin = asyncHandler (async (request,response) => {
    uploadProfilePic(request, response, async (err) => {
        if (err) {
            return response.status(400).json({ message: 'Error uploading image', error: err });
        }
        
        const { username } = request.params;

        const {fullname, email, password, phoneNumber, dob, address, socialMediaLinks} = request.body;
        const profilePic = request.file ? request.file.path : null;

        try {
            const updateData = { fullName, email, phoneNumber, dob, address, socialMediaLinks };
            if (profilePic) 
                updateData.profilePic = profilePic;
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 12);
                updateData.password = hashedPassword;
            }

            const updateAdmin = await Admin.findOneAndUpdate({ username }, updateData, {new : true});

            if(!updateAdmin){
                response.status(404).json({message:"Admin not found"});
            }

            response.status(200).json({message:"Admin updated successfully",admin:updateAdmin});
        } catch (error) {
            response.status(500).json({message:"Server Error", error:error.message});
        }
    });
});


//Display All Admin

export const getAllAdmin =asyncHandler(async (request,response) => {
    try {
        const admin = await Admin.find({});
        response.status(200).json(admin);
    } catch (error) {
        response.status(500).json({message:"Server Error", error:error.message});
        
    }
});

//Display a single Admin

export const getAdminById = asyncHandler(async(request,response) => {
    const { username } = request.params;
    try {
        const admin = await Admin.findOne({ username });
        if(!admin) {
            return response.status(400).json({message:"Admin Not Found"});
        }
        response.status(200).json(admin);
    } catch (error) {
        response.status(500).json({message:"Server Error", error:error.message});
    }
});

//Delete a Admin

export const deleteAdmin = asyncHandler(async(request,response) => {
    const { username } = request.params;
    try {
        const deleteAdmin =await Admin.findOneAndDelete({ username });

        if(!deleteAdmin){
            return response.status(400).json({message:"Admin Not Found"});
        }
        response.status(200).json({message:"Admin Deleted Successfully"});
    } catch (error) {
        response.status(500).json({message:"Server Error", error:error.message});
    }
});

