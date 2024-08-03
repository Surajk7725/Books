import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Staff from '../models/staffModel.js';
import Admin from '../models/adminModel.js';

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password')
                   || await Staff.findById(decoded.id).select('-password')
                   || await Admin.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        req.role = decoded.role;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;

// Creating authentication middleware to verify user, staff, and admin.
