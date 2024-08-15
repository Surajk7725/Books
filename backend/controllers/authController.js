import User from '../models/user.js';
import Admin from '../models/admin.js';
import Staff from '../models/staff.js';
import bcrypt from 'bcryptjs';
import { encryptToken, decryptToken } from '../utils/crypto.js';
import dotenv from 'dotenv';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';
import generateToken from '../utils/generateToken.js';

dotenv.config();

// Register user logic 
export const registerUser = async (req, res) => {
    const { fullName, username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({ fullName, username, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error during user registration:", error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Login logic
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) user = await Staff.findOne({ username });
        if (!user) user = await Admin.findOne({ username });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        // Determine the role of the user
        const role = user instanceof Admin ? 'admin' : user instanceof Staff ? 'staff' : 'user';
        
        // Generate a token
        const token = generateToken(user._id, role);
        console.log('Generated Token:', token); // Debugging line

        if (!token) {
            return res.status(500).json({ message: 'Token generation failed' });
        }

        res.status(200).json({ message: 'Logged in successfully', token, role, user });
    } catch (error) {
        console.error('Login Error:', error.message); 
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Forget password logic
export const forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        let user = await User.findOne({ email }) || await Staff.findOne({ email }) || await Admin.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const encryptedToken = encryptToken(resetToken);
        console.log(`Generated reset token: ${resetToken}`);
        console.log(`Encrypted reset token: ${encryptedToken}`);
        
        user.resetPasswordToken = encryptedToken; // Store the encrypted token
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetLink = `${process.env.FRONTEND_URL}/update-password/${encryptedToken}`; // FRONTEND_URL should be in your .env file

        await sendEmail(email, 'Password Reset', `Please use the following link to reset your password: ${resetLink}`);

        res.status(200).json({ message: 'Password reset link sent to email' });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update the password
export const resetPassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const { token } = req.params;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Decrypt the token first
        const decryptedToken = decryptToken(token);
        console.log(`Received token: ${token}`);
        console.log(`Decrypted token: ${decryptedToken}`);

        // Find the user by the decrypted token
        let user = await User.findOne({ resetPasswordToken: decryptedToken }) ||
                   await Staff.findOne({ resetPasswordToken: decryptedToken }) ||
                   await Admin.findOne({ resetPasswordToken: decryptedToken });

        if (!user) {
            console.log('No user found with the provided reset token');
            return res.status(400).json({ message: 'Token is invalid or has expired' });
        }

        console.log(`Found user: ${user.email}`);
        console.log(`Token expiry: ${user.resetPasswordExpires}`);
        
        if (user.resetPasswordExpires < Date.now()) {
            console.log('Token has expired');
            return res.status(400).json({ message: 'Token is invalid or has expired' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined; // Clear the token
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error("Error :", error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
