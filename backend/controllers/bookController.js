import asyncHandler from 'express-async-handler';
import Book from '../models/books.js';
import User from '../models/user.js';
import mongoose from 'mongoose';
import sendNotification from '../utils/sendNotification.js';


// Add Book by Staff
export const addBookByStaff = asyncHandler(async (request, response) => {
    const { authors, title, genre, category, isbn, publisher, language, description, coverImageUrl } = request.body;

    const coverImage = request.files?.coverImage ? request.files.coverImage[0].path : null;
    const bookFile = request.files?.bookFile ? request.files.bookFile[0].path : null;

    if (!title || !genre || !description) {
        return response.status(400).json({ message: 'Title, genre, and description are required fields.' });
    }

    const newBook = new Book({
        authors,
        title,
        genre,
        category,
        coverImage,
        coverImageUrl,
        isbn,
        publisher,
        language,
        bookFile,
        description,
        addedByStaff: true
    });

    try {
        const createdBook = await newBook.save();
        const notificationText = `Book Title: ${title}, Date: ${new Date().toLocaleDateString()}, Time: ${new Date().toLocaleTimeString()}`;
        sendNotification(notificationText, `link_to_book/${createdBook._id}`);
        response.status(201).json({ message: 'Book added successfully', book: createdBook });
    } catch (error) {
        response.status(400).json({ message: 'Error adding book.', error: error.message });
    }
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

// New function to update book as added by staff
export const markBookAsAddedByStaff = asyncHandler(async (request, response) => {
    const { bookId } = request.body; 

    const book = await Book.findById(bookId);

    if (!book) {
        response.status(404);
        throw new Error('Book not found');
    }

    book.addedByStaff = true;
    const updatedBook = await book.save();
    
    response.status(200).json({ message: 'Book marked as added by staff', book: updatedBook });
});


// Edit Book
export const editBook = asyncHandler(async (request, response) => {
        const { bookTitle } = request.params; 
        const { authors, title, genre, category, isbn, publisher, language, description } = request.body;
        
        const coverImage = request.files?.coverImage ? request.files.coverImage[0].path : null;
        const bookFile = request.files?.bookFile ? request.files.bookFile[0].path : null;

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


// Display All Books
export const displayAllBooks = asyncHandler(async (request, response) => {
    try {
        const books = await Book.find({ addedByStaff: true });
        response.json(books);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});


// Controller to display books by category using route parameters
export const displayBooksByCategory = asyncHandler(async (request, response) => {
    const { category } = request.params; 

    const validCategories = ['Kids', 'Popular', 'Academics'];
    if (!validCategories.includes(category)) {
        return response.status(400).json({ message: 'Invalid category provided.' });
    }

    try {
        const books = await Book.find({'category': category });
        response.json(books);
    } catch (error) {
        response.status(500).json({ message: 'Error fetching books by category.', error: error.message });
    }
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
    if (!id) {
        return response.status(400).json({ message: 'Book ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({ message: 'Invalid book ID' });
    }

    const result = await Book.findByIdAndDelete(id); 
    
    if (result) {
        response.json({ message: 'Book deleted successfully' });
    } else {
        response.status(404).json({ message: 'Book not found' });
    }
});


// Add to bookmarks
export const addBookmark = asyncHandler(async (req, res) => {
    const { bookId } = req.body;
    const username = req.user.username; 

    const user = await User.findOne({ username });
    const book = await Book.findById(bookId);

    if (!user || !book) {
        return res.status(404).json({ message: 'User or Book not found' });
    }

    // Check if the book is already bookmarked
    if (!user.bookmarks.includes(bookId)) {
        user.bookmarks.push(bookId);
        book.bookmarkedBy.push(user._id);

        await user.save();
        await book.save();

        return res.status(200).json({ message: 'Book added to bookmarks' });
    } else {
        return res.status(400).json({ message: 'Book is already bookmarked' });
    }
});

// Remove from bookmarks
export const removeBookmark = asyncHandler(async (req, res) => {
    const { bookId } = req.body;
    const username = req.user.username; // Get username from authenticated user

    const user = await User.findOne({ username });
    const book = await Book.findById(bookId);

    if (!user || !book) {
        return res.status(404).json({ message: 'User or Book not found' });
    }

    // Check if the book is in the user's bookmarks
    if (user.bookmarks.includes(bookId)) {
        user.bookmarks.pull(bookId);
        book.bookmarkedBy.pull(user._id);

        await user.save();
        await book.save();

        return res.status(200).json({ message: 'Book removed from bookmarks' });
    } else {
        return res.status(400).json({ message: 'Book is not in the bookmarks' });
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
    const { title, rating, review, username } = request.body;

    const book = await Book.findOne({ title });
    if (!book) {
        return response.status(404).json({ message: 'Book not found' });
    }

    const userId = request.user._id; 
    const user = await User.findById(userId).select('username');
    if (!user) {
        return response.status(404).json({ message: 'User not found' });
    }

    const newRating = { 
      user: userId, 
      username: user.username, 
      rating, 
      comment: review  // Ensure this field is correctly referenced
    };

    book.ratings.push(newRating);
    await book.save();

    response.status(201).json({ message: 'Rating added successfully' });
});

// Average Rating of a Book
export const getBookAverageRating = asyncHandler(async (request, response) => {
    const { title } = request.params;
  
    const book = await Book.findOne({ title });
  
    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }
  
    const ratings = book.ratings;
  
    // Calculate the average rating
    const averageRating = ratings.length > 0
      ? (ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length).toFixed(2)
      : 0;
  
    response.status(200).json({ averageRating });
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
