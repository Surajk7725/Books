import Notification from "../models/notification.js";

const sendNotification = async (text, link) => {
    try {
        const newNotification = new Notification({
            message: text,
            link,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        });
        await newNotification.save();
        console.log(`Notification: ${text}, Link: ${link}`);
    } catch (error) {
        console.error('Error saving notification:', error.message);
    }
};

export default sendNotification;
