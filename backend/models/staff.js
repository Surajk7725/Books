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
        instagram: String,
        twitter: String,
        youtube: String,
        linkedin: String
    },
    professionalDetails: {
        jobTitle:  String,
        startDate:  String,
        employeeId:  String
    },
    qualifications: {
        highestEducation: String,
        degrees: String,
        professionalAffiliations:  String
    },
    workExperience: {
        previousPosition:  String,
        yearsExperience:  Number
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
