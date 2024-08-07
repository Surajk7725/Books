import asyncHandler from 'express-async-handler';
import Book from '../models/books.js';
import User from '../models/user.js';
import sendNotification from '../utils/sendNotification.js';
import { uploadProfilePic } from '../utils/pics.js';


// Add Book by Staff
export const addBookByStaff = asyncHandler(async (request, response) => {
    uploadProfilePic(request, response, async (err) => {
        if (err) {
            return response.status(400).json({ message: 'Error uploading image', error: err });
        }
        const { authors, title, genre, category, isbn, publisher, language, bookDescription } = request.body;
        const coverImage = request.file ? request.file.path : null;
        const newBook = new Book({
            authors,
            title,
            genre,
            category,
            coverImage,
            isbn,
            publisher,
            language,
            bookDescription,
            addedByStaff: true
        });

        const createdBook = await newBook.save();

        // Send notification (assuming this is a general notification system)
        const notificationText = `Book Title: ${title}, Date: ${new Date().toLocaleDateString()}, Time: ${new Date().toLocaleTimeString()}`;
        sendNotification(notificationText, `link_to_book/${createdBook._id}`);

        response.status(201).json({ message: 'Book added successfully', book: createdBook });
    });
});

// Add Book by User
export const addBookByUser = asyncHandler(async (request, response) => {
    const { authors, title, genre, category, isbn, publisher, language, bookDescription, username } = request.body;
    const coverImage = request.file ? request.file.path : null;
    const user = await User.findOne({ username });
    if (!user) {
        return response.status(404).json({ message: 'User not found' });
    }

    const newBook = new Book({
        authors,
        title,
        genre,
        category,
        coverImage,
        isbn,
        publisher,
        language,
        bookDescription,
        createdBy: user._id,
        addedByStaff: false
    });

    const createdBook = await newBook.save();

    // Send notification
    const notificationText = `Book Title: ${title}, Date: ${new Date().toLocaleDateString()}, Time: ${new Date().toLocaleTimeString()}`;
    sendNotification(user._id, notificationText, `link_to_book/${createdBook._id}`);

    response.status(201).json({ message: 'Book added successfully by user', book: createdBook });
});


// Edit Book
export const editBook = asyncHandler(async (request, response) => {
    uploadProfilePic(request, response, async (err) => {
        if (err) {
            return response.status(400).json({ message: 'Error uploading image', error: err });
        }
        const { id } = request.params;
        const { authors, title, genre, category, isbn, publisher, language, bookDescription } = request.body;
        const coverImage = request.file ? request.file.path : '';

        const book = await Book.findById(id);
        if (book) {
            book.authors = authors || book.authors;
            book.title = title || book.title;
            book.genre = genre || book.genre;
            book.category = category || book.category;
            book.coverImage = coverImage || book.coverImage;
            book.isbn = isbn || book.isbn;
            book.publisher = publisher || book.publisher;
            book.language = language || book.language;
            book.bookDescription = bookDescription || book.bookDescription;

            const updatedBook = await book.save();
            response.json({ message: 'Book updated successfully', book: updatedBook });
        } else {
            response.status(404).json({ message: 'Book not found' });
        }
    });
});

// Display All Books
export const displayAllBooks = asyncHandler(async (request, response) => {
    const books = await Book.find();
    response.json(books);
});


// Display Particular Book
export const displayParticularBook = asyncHandler(async (request, response) => {
    const { id } = request.params;
    const book = await Book.findById(id);
    if (book) {
        response.json(book);
    } else {
        response.status(404).json({ message: 'Book not found' });
    }
});


// Delete Book
export const deleteBook = asyncHandler(async (request, response) => {
    const { id } = request.params;
    const book = await Book.findById(id);
    if (book) {
        await book.remove();
        response.json({ message: 'Book deleted successfully' });
    } else {
        response.status(404).json({ message: 'Book not found' });
    }
});

// Display Only Bookmarked Books of Particular User
export const displayBookmarkedBooks = asyncHandler(async (request, response) => {
    const { username } = request.params;
    const user = await User.findOne({ username }).populate('bookmarks');
    if (user) {
        response.json(user.bookmarks);
    } else {
        response.status(404).json({ message: 'User not found' });
    }
});


// Display All User Added Books
export const displayUserAddedBooks = asyncHandler(async (request, response) => {
    const books = await Book.find({ addedByStaff: false }).populate('createdBy', 'username email');
    response.json(books);
});

