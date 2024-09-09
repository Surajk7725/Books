import User from '../models/user.js';
import Admin from '../models/admin.js';
import Staff from '../models/staff.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
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

        const role = user instanceof Admin ? 'admin' : user instanceof Staff ? 'staff' : 'user';

        const token = generateToken(user._id, role);

        if (!token) {
            return res.status(500).json({ message: 'Token generation failed' });
        }

        res.status(200).json({ message: 'Logged in successfully', token, role, user });
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Fetch logged-in user's data
export const getMe = async (request, response) => {
    try {
      const user = request.user;
      const role = request.role;
      response.status(200).json({ user, role });
    } catch (error) {
      console.error('Fetch user error:', error.message);
      response.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Forget password logic
export const forgetPassword = async (req, res) => {
    const { email } = req.body;
    console.log("Received email:", email);

    try {
        let user = await User.findOne({ email }) || await Staff.findOne({ email }) || await Admin.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        const resetLink = `http://localhost:3000/update-password`;
        await sendEmail(email, 'Password Reset', `Your password reset request has been received. Please use the following link to reset your password: ${resetLink}`);

        res.status(200).json({ message: 'Password reset instructions sent to email' });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Update the password
export const resetPassword = async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        let user = await User.findOne({ email }) || await Staff.findOne({ email }) || await Admin.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};