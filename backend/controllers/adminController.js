import Admin from '../models/admin.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import sendEmail from '../utils/sendEmail.js';
import { uploadProfilePic } from '../utils/pics.js';
import User from '../models/user.js';
import Staff from '../models/staff.js';
import Book from '../models/books.js';

// Adding a admin member
export const addAdmin = asyncHandler(async (request,response) => {
    uploadProfilePic(request, response, async (err) => {
        if (err) {
            return response.status(400).json({ message: 'Error uploading image', error: err });
        }
    
        const {fullName, username, email, password, phoneNumber, address, socialMediaLinks,role,permission} = request.body;
        const profilePic = request.file ? request.file.path : null;
        try {
            const hashedPassword = await bcrypt.hash(password,12);

            const newAdmin = await Admin.create({
                fullName,
                username,
                email,
                password : hashedPassword,
                phoneNumber,
                address,
                profilePic,
                socialMediaLinks,
                role,
                permission
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

        const {fullName, email, password, phoneNumber, address, socialMediaLinks,role,permission} = request.body;
        const profilePic = request.file ? request.file.path : null;

        try {
            const existingUser = await Admin.findOne({ username });

            if (!existingUser) {
                return response.status(404).json({ message: 'User not found' });
            }

            const updateData = {
                fullName: fullName || existingUser.fullName,
                email: email || existingUser.email,
                phoneNumber: phoneNumber || existingUser.phoneNumber,
                role: role || existingUser.role,
                permission: permission || existingUser.permission,
                address: address || existingUser.address,
                socialMediaLinks: socialMediaLinks || existingUser.socialMediaLinks,
                profilePic: profilePic || existingUser.profilePic,
            };

            const updatedAdmin = await Admin.findOneAndUpdate({ username }, updateData, { new: true });

            response.status(200).json({ message: 'Admin updated successfully', user: updatedAdmin });
        }catch (error) {
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

// Update the Password
export const updateAdminPassword = asyncHandler(async (request, response) => {
    try {
        const { username } = request.params;
        const { oldPassword, newPassword } = request.body;

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return response.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) {
            return response.status(400).json({ message: 'Incorrect old password' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        admin.password = hashedPassword;
        await admin.save();

        response.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        response.status(500).json({ message: 'Server error', error });
    }
});

// Controller to get the total counts of users, staffs, books, and admins
export const getAdminDashboardStats = asyncHandler(async (request, response) => {
    try {
        
        const totalUsers = await User.countDocuments(); // Get the total number of users        
        const totalStaff = await Staff.countDocuments(); // Get the total number of staff        
        const totalBooks = await Book.countDocuments(); // Get the total number of books        
        const totalAdmins = await Admin.countDocuments(); // Get the total number of admins
        
        response.status(200).json({
            totalUsers,
            totalStaff,
            totalBooks,
            totalAdmins
        });
    } catch (error) {
        response.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Admin controller to get user history
export const getUserHistory = asyncHandler(async (req, res) => {
    const { username } = req.params;

    try {
        // Find the user by username and populate their book-related data
        const user = await User.findOne({ username })
            .populate({
                path: 'readBooks.bookId',
                select: 'title coverImage'
            })
            .populate({
                path: 'wishlistedBooks.bookId',
                select: 'title coverImage'
            })
            .populate({
                path: 'downloadedBooks.bookId',
                select: 'title coverImage'
            });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Count the login and logout events
        const loginCount = user.loginCount || 0;
        const logoutCount = user.logoutCount || 0;

        // Count the books in each category
        const readBooksCount = user.readBooks.length;
        const wishlistedBooksCount = user.wishlistedBooks.length;
        const downloadedBooksCount = user.downloadedBooks.length;

        // Get top 3 read books by the user
        const topReadBooks = user.readBooks
            .sort((a, b) => b.count - a.count) // Sort by the count of how many times the book was read
            .slice(0, 3) // Get top 3
            .map(rb => ({
                bookName: rb.bookId.title, // Book title from populated book data
                bookImage: rb.bookId.coverImage // Book cover image from populated book data
            }));

        // Response with user history
        res.status(200).json({
            user: {
                username: user.username,
                fullName: user.fullName,
                profileImage: user.profileImage,
                loginCount,
                logoutCount
            },
            bookStatistics: {
                readBooksCount,
                wishlistedBooksCount,
                downloadedBooksCount,
                topReadBooks
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Admin controller to get staff history
export const getStaffHistory = asyncHandler(async (req, res) => {
    const { username } = req.params; // Assuming you're using staffId as the identifier

    try {
        // Find the staff by ID
        const staff = await Staff.findOne({username});
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        // Count the login and logout events
        const loginCount = staff.loginCount || 0;
        const logoutCount = staff.logoutCount || 0;

        // Count the number of books added by the staff
        const addedBooksCount = await Book.countDocuments({ createdBy: username });

        // Count the number of books edited by the staff
        const editedBooksCount = await Book.countDocuments({ updatedBy: username });

        // Count the number of books deleted by the staff
        const deletedBooksCount = await Book.countDocuments({ deletedBy: username });

        // Response with staff history
        res.status(200).json({
            staff: {

                fullName: staff.fullName,
                username: staff.username,
                loginCount,
                logoutCount
            },
            bookActions: {
                addedBooksCount,
                editedBooksCount,
                deletedBooksCount
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Controller function to display book details, total views, bookmarks, downloads, and top readers
export const getBookDetails = asyncHandler(async (request, response) => {
    const { bookId } = request.params;

    // Find the book by ID
    const book = await Book.findById(bookId);

    if (!book) {
        return response.status(404).json({ message: 'Book not found' });
    }

    // Extract book details
    const { title, authors, genre, bookDescription, coverImageUrl } = book;

    // Count total views, bookmarks, and downloads
    const totalViews = await User.countDocuments({ 'bookHistory.book': bookId });
    const totalBookmarks = await User.countDocuments({ bookmarks: bookId });
    const totalDownloads = await User.countDocuments({ 'downloadedBooks.book': bookId });

    // Find the top three users who read this book the most (based on the readBooks count)
    const topReaders = await User.aggregate([
        { $match: { 'readBooks.bookId': mongoose.Types.ObjectId(bookId) } },
        { $unwind: '$readBooks' },
        { $match: { 'readBooks.bookId': mongoose.Types.ObjectId(bookId) } },
        { $sort: { 'readBooks.count': -1 } },
        { $limit: 3 },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'userDetails'
            }
        },
        {
            $project: {
                fullName: { $arrayElemAt: ['$userDetails.fullName', 0] },
                username: { $arrayElemAt: ['$userDetails.username', 0] },
                readCount: '$readBooks.count'
            }
        }
    ]);

    // Prepare the response data
    const responseData = {
        bookDetails: {
            title,
            authors,
            genre,
            description: bookDescription,
            coverImageUrl
        },
        totalViews,
        totalBookmarks,
        totalDownloads,
        topReaders
    };

    response.json(responseData);
});