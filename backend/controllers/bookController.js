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
        const { authors, title, genre, category, isbn, publisher, language, description } = request.body;

        const coverImage = request.files.coverImage ? request.files.coverImage[0].path : null;
        const bookFile = request.files.bookFile ? request.files.bookFile[0].path : null;

        const newBook = new Book({
            authors,
            title,
            genre,
            category,
            coverImage,
            isbn,
            publisher,
            language,
            bookFile,
            description,
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
    const { authors, title, genre, description } = request.body;

    const coverImage = request.files?.coverImage ? request.files.coverImage[0].path : null;
    const bookFile = request.files?.bookFile ? request.files.bookFile[0].path : null;

    const user = await User.findById(request.user._id);

    if (!user) {
        response.status(404);
        throw new Error('User not found');
    }

    const newBook = new Book({
        authors,
        title,
        genre,
        description,
        coverImage,
        bookFile,
        user: request.user._id,
        addedByStaff: false
    });

    const createdBook = await newBook.save();

    const notificationText = `Book Title: ${title}, Date: ${new Date().toLocaleDateString()}, Time: ${new Date().toLocaleTimeString()}`;
    sendNotification(request.user._id, notificationText, `link_to_book/${createdBook._id}`);

    response.status(201).json({ message: 'Book added successfully by user', book: createdBook });
});


// Edit Book
export const editBook = asyncHandler(async (request, response) => {
    uploadProfilePic(request, response, async (err) => {
        if (err) {
            return response.status(400).json({ message: 'Error uploading image', error: err });
        }
        const { bookTitle } = request.params; // Use bookTitle instead of id
        const { authors, title, genre, category, isbn, publisher, language, description } = request.body;
        const coverImage = request.file ? request.file.path : '';

        // Find the book by title
        const book = await Book.findOne({ title: bookTitle });

        if (book) {
            // Update the book details
            book.authors = authors || book.authors;
            book.title = title || book.title;
            book.genre = genre || book.genre;
            book.category = category || book.category;
            book.coverImage = coverImage || book.coverImage;
            book.isbn = isbn || book.isbn;
            book.publisher = publisher || book.publisher;
            book.language = language || book.language;
            book.description = description || book.description;

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
    const { title } = request.params;
    const book = await Book.findOne({ title });
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


// Create Book Rating
export const createBookRating = asyncHandler(async (request, response) => {
    const { title, author, rating, comment } = request.body;

    const book = await Book.findOne({ title, authors: author });
    if (!book) {
        return response.status(404).json({ message: 'Book not found' });
    }

    const userId = request.user._id; // Assuming the user ID is in the request object
    const user = await User.findById(userId).select('username');
    if (!user) {
        return response.status(404).json({ message: 'User not found' });
    }

    const newRating = { user: userId, username: user.username, rating, comment };

    book.ratings.push(newRating);
    await book.save();

    response.status(201).json({ message: 'Rating added successfully' });
});

// Display Book Ratings
export const displayBookRatings = asyncHandler(async (request, response) => {
    const { title, author } = request.params;

    const book = await Book.findOne({ title, authors: author }).populate('ratings.user', 'username');
    if (!book) {
        return response.status(404).json({ message: 'Book not found' });
    }

    response.status(200).json(book.ratings);
});

// Add Comment to Book
export const addBookComment = asyncHandler(async (request, response) => {
    const { title, author, comment } = request.body;

    const book = await Book.findOne({ title, authors: author });
    if (!book) {
        return response.status(404).json({ message: 'Book not found' });
    }

    const userId = request.user._id; // Assuming the user ID is in the request object
    const user = await User.findById(userId).select('username');
    if (!user) {
        return response.status(404).json({ message: 'User not found' });
    }

    const newComment = { user: userId, username: user.username, comment };

    book.bookComments.push(newComment);
    await book.save();

    response.status(201).json({ message: 'Comment added successfully' });
});

// Add Reply to Comment
export const addCommentReply = asyncHandler(async (request, response) => {
    const { title, author, commentId, reply } = request.body;

    const book = await Book.findOne({ title, authors: author });
    if (!book) {
        return response.status(404).json({ message: 'Book not found' });
    }

    const comment = book.bookComments.id(commentId);
    if (!comment) {
        return response.status(404).json({ message: 'Comment not found' });
    }

    const userId = request.user._id; // Assuming the user ID is in the request object
    const user = await User.findById(userId).select('username');
    if (!user) {
        return response.status(404).json({ message: 'User not found' });
    }

    const newReply = { user: userId, username: user.username, comment: reply };

    comment.replies.push(newReply);
    await book.save();

    response.status(201).json({ message: 'Reply added successfully' });
});

// Display Book Comments
export const displayBookComments = asyncHandler(async (request, response) => {
    const { title, author } = request.params;

    const book = await Book.findOne({ title, authors: author })
        .populate('bookComments.user', 'username')
        .populate('bookComments.replies.user', 'username');
    if (!book) {
        return response.status(404).json({ message: 'Book not found' });
    }

    response.status(200).json(book.bookComments);
});
