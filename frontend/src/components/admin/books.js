import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@heroicons/react/outline';
import axiosInstance from '../axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const baseURL = process.env.REACT_APP_API_URL;

const Books = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const booksPerPage = 12;
  const navigate = useNavigate();

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

  // Filtered books based on search term
  const filteredBooks = data.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination based on filtered books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const viewBook = (bookTitle) => {
    const formattedTitle = bookTitle.replace(/-/g, ' ');
    navigate(`/admin/books/view/${formattedTitle}`);
  };


  return (
    <div className="justify-center items-center min-h-screen mb-2 ml-2 mt-4 md:ml-10">
      <ToastContainer />
      <div className="text-start -mt-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 ml-4 mb-4 md:mb-0">Books</h1>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/admin/home">Dashboard</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Books</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative flex w-full justify-end items-center space-x-2">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <SearchIcon className="h-6 w-6 text-gray-500" />
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-24">
        {/* Render books */}
        {currentBooks.map(book => (
          <div key={book._id} className="max-w-sm rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
              <img
                alt={`Cover of ${book.title}`}
                src={book.coverImage ? `${baseURL}${book.coverImage.replace(/\\/g, '/')}` : 'default-image-path.jpg'}
                className="w-full h-48 object-contain"
              />
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
        <ul className="flex justify-center space-x-2">
          {[...Array(Math.ceil(filteredBooks.length / booksPerPage)).keys()].map(page => (
            <li key={page}>
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
  );
};

export default Books;
