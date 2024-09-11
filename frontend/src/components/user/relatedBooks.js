import React, { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const RelatedBooks = ({ category }) => {
  const [data, setData] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_API_URL;

  // Fetch books data from server on component mount
  useEffect(() => {
    axiosInstance.get('/books/display')
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setData([]);
          toast.error('Unexpected data format from the server.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setData([]);
        toast.error('Failed to fetch data. Please try again later.');
      });
  }, []);

  const viewBook = (bookTitle) => {
    const normalizedTitle = bookTitle.replace(/-/g, ' ');
    navigate(`/display-books/${normalizedTitle}/description`);
  };

  const toggleBookmark = (id) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter(bookId => bookId !== id));
    } else {
      setBookmarked([...bookmarked, id]);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Related Books</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
        {/* Render books */}
        {data.slice(0, 8).map(book => (  // Display only first 8 books
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
                {bookmarked.includes(book._id) ? (
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
      <ToastContainer />
    </div>
  );
};

export default RelatedBooks;
