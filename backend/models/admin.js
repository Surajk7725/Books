import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    fullname: {type:String, required:true},
    username: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    Phonenumber: {type:String},
    dob: {type:string},
    profilepic: {type:string},
    socialMediaLinks: {
        insta:String,
        twitter:String,
        youtube:String,
        linkedin:String
    }

}, {timestamps: true}); 

const Admin = mongoose.model('Admin',adminSchema);
export default Admin;