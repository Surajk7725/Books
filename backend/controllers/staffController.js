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


// Editing a staff member

export const editStaff = asyncHandler (async (request,response) => {
    const {id} = request.params;

    const {fullName, username, email, password, phoneNumber, dob, address, profilePic, socialMediaLinks} = request.body;

    try {
        const updateStaff = await Staff.findByIdAndUpdate(id, {
            fullName, username, email, password, phoneNumber, dob, address, profilePic, socialMediaLinks
        },{new : true});

        if(!updateStaff) {
            response.status(404).json({message:"Staff not found"});
        }

        response.status(200).json({message:"Staff updated successfully",staff:updateStaff});
    } catch (error) {
        response.status(500).json({message:"Server Error",error:error.message});
    }
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
    const {id} = request.params;

    try {
        const staff = await Staff.findById(id);
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
    const {id} = request.params;
    try {
        const deleteStaff = await Staff.findByIdAndDelete(id);

        if(!deleteStaff) {
            return response.status(404).json({message:"Staff Not Found"});
        }
        response.status(200).json({message:"Staff Deleted Successfully"});
    } catch(error) {
        response.status(500).json({message:"Server Error",error:error.message});
    }
});


