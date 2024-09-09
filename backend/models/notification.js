import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    message: String,
    link: String,
    date: String,
    time: String
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
