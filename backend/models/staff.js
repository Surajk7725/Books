import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phoneNumber: {type: String},
    address: {type: String},
    dob: {type: Date},
    profilePic: { type: String },
    socialMediaLinks: {
        insta: String,
        twitter: String,
        youtube: String,
        linkedin: String
    },
    professionalDetails: {
        jobTitle: {type: String},
        startDate: {type: Date},
        employeeID: {type: String}
    },
    qualifications: {
        highestEducation: {type: String},
        degrees: {type: String},
        professionalAffiliations: {type: String}
    },
    workExperience: {
        previousPosition: {type: String},
        yearsExperience: {type: Number}
    },
    skills: {
        languagesSpoken: [String],
        computerSkills: [String]
    },

    loginCount: { type: Number, default: 0 },
    logoutCount: { type: Number, default: 0 },
}, {timestamps: true});

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
