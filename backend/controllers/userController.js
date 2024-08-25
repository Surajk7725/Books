import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendEmail.js';
import asyncHandler from 'express-async-handler';
import { uploadProfilePic } from '../utils/pics.js';

// Add a new user
export const addUser = asyncHandler(async (request, response) => {
    uploadProfilePic(request, response, async (err) => {
        if (err) {
            return response.status(400).json({ message: 'Error uploading image', error: err });
        }

        const { fullName, username, email, phoneNumber, dob, address, password, socialMediaLinks } = request.body;
        const profilePic = request.file ? request.file.path : null;

        try {
            const hashedPassword = await bcrypt.hash(password, 12);
            const parsedSocialMediaLinks = socialMediaLinks ? JSON.parse(socialMediaLinks) : {};

            const newUser = await User.create({
                fullName,
                username,
                email,
                phoneNumber,
                dob,
                address,
                password: hashedPassword,
                profilePic,
                socialMediaLinks: parsedSocialMediaLinks,
            });

            // Send email with username and password
            const emailSubject = 'Welcome to Our Service';
            const emailText = `Hello ${fullName},\n\nYour account has been created.\nUsername: ${username}\nPassword: ${password}\n\nPlease keep this information safe.`;

            await sendEmail(email, emailSubject, emailText);

            response.status(201).json({ message: 'User added successfully', user: newUser });
        } catch (error) {
            response.status(500).json({ message: 'Server error', error: error.message });
        }
    });
});


// Edit an existing user
export const editUser = asyncHandler(async (request, response) => {
    uploadProfilePic(request, response, async (err) => {
        if (err) {
            return response.status(400).json({ message: 'Error uploading image', error: err });
        }

        const { username } = request.params;
        const { fullName, email, phoneNumber, dob, address, socialMediaLinks } = request.body;
        const profilePic = request.file ? request.file.path : null;

        try {
            const existingUser = await User.findOne({ username });

            if (!existingUser) {
                return response.status(404).json({ message: 'User not found' });
            }

            const updateData = {
                fullName: fullName || existingUser.fullName,
                email: email || existingUser.email,
                phoneNumber: phoneNumber || existingUser.phoneNumber,
                dob: dob || existingUser.dob,
                address: address || existingUser.address,
                socialMediaLinks: socialMediaLinks ? JSON.parse(socialMediaLinks) : existingUser.socialMediaLinks,
                profilePic: profilePic || existingUser.profilePic,
            };

            const updatedUser = await User.findOneAndUpdate({ username }, updateData, { new: true });

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

// Display a single user

export const getUserById = asyncHandler(async (request, response) => {
    const { username } = request.params;

    if (!username) {
        return response.status(400).json({ message: "Username is required" });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log("User not found");
            return response.status(404).json({ message: "User Not Found" });
        }
        response.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        response.status(500).json({ message: "Server Error", error: error.message });
    }
});


// Delete a User

export const deleteUser = asyncHandler (async(request,response) => {
    const { username } = request.params;
    try {
        const deleteUser = await User.findOneAndDelete({ username });

        if(!deleteUser) {
            return response.status(404).json({message:"User Not Found"});
        }
        response.status(200).json({message:"User Deleted Successfully"});
    } catch(error) {
        response.status(500).json({message:"Server Error",error:error.message});
    }
});


// Book's History

export const getUserBookHistory = asyncHandler(async (request, response) => {
    const userId = request.user._id; 

    const user = await User.findById(userId).populate('bookHistory.book');
    if (!user) {
        return response.status(404).json({ message: 'User not found' });
    }

    const bookHistory = user.bookHistory.map(entry => ({
        bookName: entry.book.title,
        authorName: entry.book.authors.join(', '),
        viewedAt: entry.viewedAt
    }));

    response.json(bookHistory);
});

// Display only downloaded books

export const getUserDownloadedBooks = asyncHandler(async (request, response) => {
    const userId = request.user._id; 

    const user = await User.findById(userId).populate('downloadedBooks.book');
    if (!user) {
        return response.status(404).json({ message: 'User not found' });
    }

    const downloadedBooks = user.downloadedBooks.map(entry => ({
        bookImage: entry.book.coverImageUrl || entry.book.coverImage,
        bookName: entry.book.title,
        authorName: entry.book.authors.join(', '),
        rating: entry.book.ratings.length > 0 ? (entry.book.ratings.reduce((sum, rating) => sum + rating.rating, 0) / entry.book.ratings.length).toFixed(2) : 'No ratings',
        description: entry.book.bookDescription,
    }));

    response.json(downloadedBooks);
});


// Update the Password
export const updateUserPassword = asyncHandler(async (request, response) => {
    try {
        const { username } = request.params;
        const { oldPassword, newPassword } = request.body;

        const user = await User.findOne({ username });

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        const isMatch = bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return response.status(400).json({ message: 'Incorrect old password' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        response.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        response.status(500).json({ message: 'Server error', error });
    }
});

