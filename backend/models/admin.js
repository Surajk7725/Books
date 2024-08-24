import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    fullName: {type:String, required:true},
    username: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    address:{type:String},
    phoneNumber: { type: String },
    profilePic: {type:String},
    socialMediaLinks: {
        instagram:String,
        twitter:String,
        youtube:String,
        linkedin:String
    },
    role:{type:String},
    permission: [{type: String}],
}, {timestamps: true}); 

const Admin = mongoose.model('Admin',adminSchema);
export default Admin;
