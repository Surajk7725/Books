import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Staff from '../models/staff.js';
import Admin from '../models/admin.js';

const authMiddleware = async (request, response, next) => {
    const token = request.cookies.token || request.headers.authorization?.split(' ')[1];

    if (!token) {
        return response.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password')
                   || await Staff.findById(decoded.id).select('-password')
                   || await Admin.findById(decoded.id).select('-password');

        if (!user) {
            return response.status(401).json({ message: 'User not found' });
        }

        request.user = user;
        request.role = decoded.role;
        console.log('User authenticated:', user); // Debugging line

        next();
    } catch (error) {
        console.error('Authentication Error:', error.message); // Debugging line
        response.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;


// Creating authentication middleware to verify user, staff, and admin.
