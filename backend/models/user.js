import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phonenumber: { type: String, required: true },
    dob: { type: Date },
    address: { type: String },
    password: { type: String},
    profilePic: { type: String },
    socialMediaLinks: {
        insta: String,
        twitter: String,
        youtube: String,
        linkedin: String
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
