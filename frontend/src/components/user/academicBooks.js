import React, { useState, useEffect } from 'react';
import { SearchIcon, HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import NavBar from '../navbar';
import Footer from './footer';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authcontext';

const baseURL = process.env.REACT_APP_API_URL;

function AcademicBooks() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);
  const [username, setUsername] = useState('');
  const booksPerPage = 12;
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);


  useEffect(() => {
    const fetchBooksAndBookmarks = async () => {
      try {
        // Fetch kids books data
        const bookResponse = await axiosInstance.get('/books/visible/Academics');
        if (bookResponse.data && Array.isArray(bookResponse.data)) {
          setBooks(bookResponse.data);
        } else {
          setBooks([]);
          toast.error('Unexpected data format from the server.');
        }

        // Fetch bookmarked books if username exists
        if (username) {
          const bookmarkResponse = await axiosInstance.get(`/books/user/${username}/bookmarks`);
          if (bookmarkResponse.data && Array.isArray(bookmarkResponse.data)) {
            setBookmarkedBooks(bookmarkResponse.data.map(book => book._id));
          } else {
            setBookmarkedBooks([]);
            toast.error('Unexpected data format for bookmarks.');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setBooks([]);
        toast.error('Failed to fetch data. Please try again later.');
      }
    };

    fetchBooksAndBookmarks();
  }, [username]);

  // Toggle bookmark status
  const toggleBookmark = async (bookId) => {
    const isBookmarked = bookmarkedBooks.includes(bookId);

    try {
      if (isBookmarked) {
        await axiosInstance.post('/books/unbookmark', { bookId, username });
        setBookmarkedBooks(prev => prev.filter(id => id !== bookId));
        toast.success('Book removed from your wishlist.');
      } else {
        await axiosInstance.post('/books/bookmark', { bookId, username });
        setBookmarkedBooks(prev => [...prev, bookId]);
        toast.success('Book added to your wishlist.');
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error.response ? error.response.data : error.message);
      toast.error(`Failed to ${isBookmarked ? 'remove' : 'add'} bookmark. Please try again later.`);
    }
  };


  // Filtered books based on search term
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination based on filtered books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const shareBook = (bookTitle) => {
    const formattedTitle = bookTitle.replace(/-/g, ' ');
    const bookUrl = `${window.location.origin}/display-books/${formattedTitle}/description`;
    navigator.clipboard.writeText(bookUrl)
      .then(() => {
        toast.success('Book URL copied to clipboard!');
      })
      .catch(err => {
        toast.error('Failed to copy the text: ', err);
      });
  };

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
                  {bookmarkedBooks.includes(book._id) ? (
                    <HeartIconSolid className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6 text-gray-500" />
                  )}
                </div>
                <div
                  className="absolute top-10 right-2 bg-white rounded-full p-1 cursor-pointer"
                  onClick={() => shareBook(book.title)}
                >
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z" /></svg>
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
  )
}

export default AcademicBooks;
