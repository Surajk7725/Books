import React, { useState, useEffect } from 'react';
import { SearchIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../staff/navbar';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const baseURL = process.env.REACT_APP_API_URL;

function Kids_Books() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const booksPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get('/books/visible/Kids');
        setBooks(response.data);
      } catch (err) {
        console.error(err.message);
        toast.error('Failed to fetch books.');
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleRemove = (id) => {
    if (!id) {
      toast.error('Invalid book ID');
      return;
    }

    axiosInstance.delete(`/books/delete/${id}`)
      .then(response => {
        if (response.status === 200) {
          setBooks(prevBooks => prevBooks.filter(item => item._id !== id));
          toast.success('Successfully deleted');
        } else {
          toast.error('Failed to delete the book. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error deleting book:', error);
        toast.error('Error deleting the book. Please try again later.');
      });
  };

  const editBook = (title) => {
    // Replace spaces with hyphens and convert to lowercase
    const normalizedTitle = title.replace(/-/g, ' ');
    navigate(`/staff-editbook/${normalizedTitle}`);
  };

  const viewBook = (bookTitle) => {
    const normalizedTitle = bookTitle.replace(/-/g, ' ');
    navigate(`/staff-allbooks/${normalizedTitle}/description`);
  };


  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 py-6 relative">
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
                  onClick={() => editBook(book.title)}
                >
                  <PencilAltIcon className="h-6 w-6 text-gray-500" />
                </div>
                <div
                  className="absolute top-10 right-2 bg-white rounded-full p-1 cursor-pointer"
                  onClick={() => handleRemove(book._id)}
                >
                  <TrashIcon className="h-6 w-6 text-gray-500" />
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
      <ToastContainer />
    </div>
  );
}

export default Kids_Books;
