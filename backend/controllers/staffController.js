import Staff from '../models/staff.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import sendEmail from '../utils/sendEmail.js';
import { uploadProfilePic } from '../utils/pics.js';
import User from '../models/user.js';
import Book from '../models/books.js';


// Adding a Staff Member
export const addStaff = asyncHandler(async (request, response) => {
    uploadProfilePic(request, response, async (err) => {
        if (err) {
            return response.status(400).json({ message: 'Error uploading image', error: err });
        }

        const { 
            fullName, username, email, password, phoneNumber, dob, address, socialMediaLinks, 
            professionalDetails, qualifications, workExperience, skills 
        } = request.body;
        const profilePic = request.file ? request.file.path : null;

        try {
            const hashedPassword = await bcrypt.hash(password, 12);

            // Parsing the JSON strings into objects
            const parsedSocialMediaLinks = socialMediaLinks ? JSON.parse(socialMediaLinks) : {};
            const parsedProfessionalDetails = professionalDetails ? JSON.parse(professionalDetails) : {};
            const parsedQualifications = qualifications ? JSON.parse(qualifications) : {};
            const parsedWorkExperience = workExperience ? JSON.parse(workExperience) : {};
            const parsedSkills = skills ? JSON.parse(skills) : { languagesSpoken: [], computerSkills: [] };

            const newStaff = await Staff.create({
                fullName,
                username,
                email,
                password: hashedPassword,
                phoneNumber,
                dob,
                address,
                profilePic,
                socialMediaLinks: parsedSocialMediaLinks,
                professionalDetails: parsedProfessionalDetails, 
                qualifications: parsedQualifications, 
                workExperience: parsedWorkExperience, 
                skills: parsedSkills,
            });

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

// Editing a Staff Member
export const editStaff = asyncHandler(async (request, response) => {
    uploadProfilePic(request, response, async (err) => {
      if (err) {
        return response.status(400).json({ message: 'Error uploading image', error: err.message });
      }
  
      const { username } = request.params;
      const {
        fullName,
        email,
        password,
        phoneNumber,
        dob,
        address,
        socialMediaLinks,
        professionalDetails,
        qualifications,
        workExperience,
        skills,
      } = request.body;
  
      const profilePic = request.file ? request.file.path : null;
  
      try {
        const existingStaff = await Staff.findOne({ username });
  
        if (!existingStaff) {
          return response.status(404).json({ message: 'Staff not found' });
        }
  
        const parsedSocialMediaLinks = socialMediaLinks ? JSON.parse(socialMediaLinks) : existingStaff.socialMediaLinks;
        const parsedProfessionalDetails = professionalDetails ? JSON.parse(professionalDetails) : existingStaff.professionalDetails;
        const parsedQualifications = qualifications ? JSON.parse(qualifications) : existingStaff.qualifications;
        const parsedWorkExperience = workExperience ? JSON.parse(workExperience) : existingStaff.workExperience;
        const parsedSkills = skills ? JSON.parse(skills) : existingStaff.skills;
  
        const updateData = {
          fullName: fullName || existingStaff.fullName,
          email: email || existingStaff.email,
          phoneNumber: phoneNumber || existingStaff.phoneNumber,
          dob: dob || existingStaff.dob,
          address: address || existingStaff.address,
          socialMediaLinks: parsedSocialMediaLinks,
          professionalDetails: parsedProfessionalDetails,
          qualifications: parsedQualifications,
          workExperience: parsedWorkExperience,
          skills: parsedSkills,
          profilePic: profilePic || existingStaff.profilePic,
        };
  
        if (password) {
          const salt = await bcrypt.genSalt(12);
          const hashedPassword = await bcrypt.hash(password, salt);
          updateData.password = hashedPassword;
        }
  
        const updatedStaff = await Staff.findOneAndUpdate({ username }, updateData, { new: true });
  
        return response.status(200).json({
          message: 'Staff updated successfully',
          staff: updatedStaff,
        });
      } catch (error) {
        console.error('Error updating staff:', error);
        return response.status(500).json({ message: 'Server Error', error: error.message });
      }
    });
  });
  

// Display all Staff

export const getAllStaff = asyncHandler(async (request, response) => {
    try {
        const staff = await Staff.find({});
        response.status(200).json(staff);
    } catch (error) {
        response.status(500).json({message:"Server Error",error:error.message});
    }
});

// Display a Single Staff Member

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

// Delete a Staff Member

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

// Update the Password
export const updateStaffPassword = asyncHandler(async (request, response) => {
    try {
        const { username } = request.params;
        const { oldPassword, newPassword } = request.body;

        const staff = await Staff.findOne({ username });

        if (!staff) {
            return response.status(404).json({ message: 'Staff not found' });
        }

        const isMatch = bcrypt.compare(oldPassword, staff.password);
        if (!isMatch) {
            return response.status(400).json({ message: 'Incorrect old password' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        staff.password = hashedPassword;
        await staff.save();

        response.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        response.status(500).json({ message: 'Server error', error });
    }
});

// Display User's Full Book History

export const getUserBookHistory = asyncHandler(async (req, res) => {
    const { username } = req.params;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get the user's read books, wishlisted books, and downloaded books
        const readBooks = user.readBooks || [];
        const wishlistedBooks = user.wishlistedBooks || [];
        const downloadedBooks = user.downloadedBooks || [];

        // Count the number of books in each category
        const readBooksCount = readBooks.length;
        const wishlistedBooksCount = wishlistedBooks.length;
        const downloadedBooksCount = downloadedBooks.length;

        // Fetch book details for each category from the Book model (optional, if you have a separate Book model)
        const readBooksDetails = await Book.find({ _id: { $in: readBooks } });
        const wishlistedBooksDetails = await Book.find({ _id: { $in: wishlistedBooks } });
        const downloadedBooksDetails = await Book.find({ _id: { $in: downloadedBooks } });

        // Response with user's book history
        res.status(200).json({
            user: {
                username: user.username,
                fullName: user.fullName,
                profileImage: user.profileImage,
            },
            bookHistory: {
                readBooks: {
                    count: readBooksCount,
                    books: readBooksDetails,
                },
                wishlistedBooks: {
                    count: wishlistedBooksCount,
                    books: wishlistedBooksDetails,
                },
                downloadedBooks: {
                    count: downloadedBooksCount,
                    books: downloadedBooksDetails,
                },
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});