import Notification from "../models/notification.js";
import asyncHandler from 'express-async-handler';

export const getNotifications = asyncHandler(async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ _id: -1 }); // Get the latest notifications first
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications.', error: error.message });
    }
});