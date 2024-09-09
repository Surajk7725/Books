import mongoose from 'mongoose';

// Recursive comment schema for nested replies
const replySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String },
    profilePic: { type: String },  
    comment: { type: String },
    replies: [{ type: mongoose.Schema.Types.Mixed }],  
    createdAt: { type: Date, default: Date.now }  
});

const bookCommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String },
    comment: { type: String },
    replies: [replySchema],  // Nested replies within the main comment
    createdAt: { type: Date, default: Date.now }
});

const bookSchema = new mongoose.Schema({
    authors: [{ type: String, required: true }],
    title: { type: String },
    genre: { type: String },
    category: { type: String },
    coverImage: { type: String, default: '' },
    coverImageUrl: { type: String, default: '' },
    bookFile: { type: String, default: '' },
    isbn: { type: String },
    publisher: { type: String },
    language: { type: String },
    description: { type: String },
    bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    addedByStaff: { type: Boolean, default: false },
    addedDate: { type: Date, default: Date.now },
    ratings: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: { type: String },
        rating: { type: Number },
        comment: { type: String }
    }],
    bookComments: [bookCommentSchema] 
}, {
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
