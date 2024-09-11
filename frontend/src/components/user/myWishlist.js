import React, { useState, useEffect } from 'react';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { SearchIcon, HeartIcon } from '@heroicons/react/outline';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../navbar';
import Footer from './footer';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authcontext';

const baseURL = process.env.REACT_APP_API_URL;

const MyWishlist = () => {
    const [bookmarkedBooks, setBookmarkedBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [username, setUsername] = useState('');
    const booksPerPage = 12;
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user && user.username) {
            setUsername(user.username);
        }
    }, [user]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            if (!username) return; // Do nothing if username is not set

            try {
                const response = await axiosInstance.get(`/books/user/${username}/bookmarks`);

                // Ensure response data is in the expected format
                if (response.data && Array.isArray(response.data)) {
                    setBookmarkedBooks(response.data); // Set state directly with book objects
                } else {
                    setBookmarkedBooks([]);
                    toast.error('Unexpected data format for bookmarks.');
                }
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
                setBookmarkedBooks([]);
                toast.error('Failed to fetch bookmarks. Please try again later.');
            }
        };

        fetchBookmarks();
    }, [username]);

    const toggleBookmark = async (bookId) => {
        const isBookmarked = bookmarkedBooks.some(book => book._id === bookId);

        try {
            if (isBookmarked) {
                await axiosInstance.post('/books/unbookmark', { bookId, username });
                setBookmarkedBooks(prev => prev.filter(book => book._id !== bookId));
                toast.success('Book removed from your wishlist.');
            } else {
                await axiosInstance.post('/books/bookmark', { bookId, username });
                setBookmarkedBooks(prev => [...prev, { _id: bookId }]); // Append a new book object
                toast.success('Book added to your wishlist.');
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error.response ? error.response.data : error.message);
            toast.error(`Failed to ${isBookmarked ? 'remove' : 'add'} bookmark. Please try again later.`);
        }
    };

    const filteredBooks = bookmarkedBooks.filter(book => {
        return book && book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const viewBook = (bookTitle) => {
        const normalizedTitle = bookTitle.replace(/-/g, ' ');
        navigate(`/display-books/${normalizedTitle}/description`);
    };

    return (
        <div>
            <NavBar />
            <ToastContainer />
            <div className="container mx-auto px-4 py-6 relative">
                {/* Search bar */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <SearchIcon className="h-6 w-6 text-gray-500" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
                    {/* Render books */}
                    {currentBooks.map(book => (
                        <div key={book._id} className="max-w-sm rounded-lg overflow-hidden shadow-lg">
                            <div className="relative">
                                <img
                                    alt={`Cover of ${book.title}`}
                                    src={book.coverImage ? `${baseURL}${book.coverImage.replace(/\\/g, '/')}` : 'default-image-path.jpg'}
                                    className="w-full h-48 object-contain"
                                />
                                <div
                                    className="absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer"
                                    onClick={() => toggleBookmark(book._id)}
                                >
                                    {bookmarkedBooks.some(b => b._id === book._id) ? (
                                        <HeartIconSolid className="h-6 w-6 text-red-500" />
                                    ) : (
                                        <HeartIcon className="h-6 w-6 text-gray-500" />
                                    )}
                                </div>
                            </div>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2 text-center">{book.title}</div>
                                <div className="flex justify-center">
                                    <button
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors duration-300"
                                        onClick={() => viewBook(book.title)}
                                    >
                                        View Book
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-6">
                    <ul className="flex justify-center">
                        {[...Array(Math.ceil(filteredBooks.length / booksPerPage)).keys()].map(page => (
                            <li key={page} className="mx-2">
                                <button
                                    onClick={() => paginate(page + 1)}
                                    className={`px-3 py-1 rounded-md ${currentPage === page + 1 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                        }`}
                                >
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MyWishlist;

