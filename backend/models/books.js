import mongoose from 'mongoose';

const bookCommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    comment: { type: String, required: true },
    replies: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        username: { type: String, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

const bookSchema = new mongoose.Schema({
    authors: [{ type: String, required: true }],
    title: { type: String, required: true },
    genre: { type: String, required: true },
    category: { type: String },
    coverImage: { type: String, default: '' },
    coverImageUrl: { type: String, default: '' },
    bookFile: { type: String, default: '' },
    isbn: { type: String },
    publisher: { type: String },
    language: { type: String},
    description: { type: String, required: true },
    bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    addedByStaff: { type: Boolean, default: false },
    addedDate: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }, // Added by a staff member
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }, // Last edited by a staff member
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }, // Deleted by a staff member
    ratings: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String }
    }],
    bookComments: [bookCommentSchema]
}, {
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
