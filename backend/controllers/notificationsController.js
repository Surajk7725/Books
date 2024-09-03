import Notification from "../models/notification.js";
import asyncHandler from 'express-async-handler';

export const getNotifications = asyncHandler(async (request, response) => {
    try {
        const notifications = await Notification.find().sort({ _id: -1 });
        response.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        response.status(500).json({ message: 'Error fetching notifications.', error: error.message });
    }
});
