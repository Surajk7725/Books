import mongoose from 'mongoose';

const bookDownloadSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    downloadedAt: { type: Date, default: Date.now }
});

const bookHistorySchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    viewedAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    dob: { type: String },
    address: { type: String },
    password: { type: String},
    profilePic: { type: String },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],  
    socialMediaLinks: {
        instagram: String,
        twitter: String,
        youtube: String,
        linkedin: String
    },
    downloadedBooks: [bookDownloadSchema],
    bookHistory: [bookHistorySchema],

    loginCount: { type: Number, default: 0 },
    logoutCount: { type: Number, default: 0 },
    readBooks: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
            count: { type: Number, default: 0 }
        }
    ],
    
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
