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
});

// Editing the admin member

export const editAdmin = asyncHandler (async (request,response) => {
    const {id} = request.param;

    const {fullname, username, email, password, phoneNumber, dob, address, profilepic, socialMediaLinks} = request.body;

    try {
        const updateAdmin = await Admin.findByIdAndUpdate(id, {
            fullname, username, email, password, phoneNumber, dob, address, profilepic, socialMediaLinks
        }, {new : true});

        if(!updateAdmin){
            response.status(404).json({message:"Admin not found"});
        }

        response.status(200).json({message:"Admin updated successfully",admin:updateAdmin});
    } catch (error) {
        response.status(500).json({message:"Server Error", error:error.message});
    }
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
    const {id} = request.params;
    try {
        const admin = await Admin.findById(id);
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
    const {id} = request.params;
    try {
        const deleteAdmin =await Admin.findByIdAndDelete(id);

        if(!deleteAdmin){
            return response.status(400).json({message:"Admin Not Found"});
        }
        response.status(200).json({message:"Admin Deleted Successfully"});
    } catch (error) {
        response.status(500).json({message:"Server Error", error:error.message});
    }
});

