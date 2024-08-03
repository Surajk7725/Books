import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';
import generateToken from '../utils/generateToken.js';

// Register user logic 
export const registerUser = async (req, res) => {
    const { fullname, username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({ fullname, username, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login logic
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username }) || await Staff.findOne({ username }) || await Admin.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const role = user instanceof User ? 'user' : user instanceof Staff ? 'staff' : 'admin';
        const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true }).status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
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

        const token = generateToken(user._id, 'passwordReset');
        const resetLink = `${req.protocol}://${req.get('host')}/api/users/reset-password/${token}`;

        await sendEmail(email, 'Password Reset', `Please use the following link to reset your password: ${resetLink}`);

        res.status(200).json({ message: 'Password reset link sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Reset password logic
export const resetPassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const { token } = req.params;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        let user = await User.findById(userId) || await Staff.findById(userId) || await Admin.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
