import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    authors: [{ type: String, required: true }],
    title: { type: String, required: true },
    genre: { type: String, required: true },
    category: { type: String, required: true },
    coverImage: { type: String, default: '' },
    coverImageUrl: { type: String, default: '' },
    bookFile: { type: String, default: '' },
    isbn: { type: String, required: true },
    publisher: { type: String, required: true },
    language: { type: String, required: true },
    bookDescription: { type: String, required: true },
    bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    addedByStaff: { type: Boolean, default: false },
    addedDate: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
