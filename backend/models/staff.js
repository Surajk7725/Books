import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
    fullName: {type:String, required:true},
    username: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    phoneNumber: {type:String},
    address: {type:String},
    dob: {type: Date},
    profilePic: {type:String},
    socialMediaLinks: {
        insta: String,
        twitter: String,
        youtube: String,
        linkedin: String
    }
}, {timestamps: true});

const Staff = mongoose.model('Staff',staffSchema);

export default Staff;


