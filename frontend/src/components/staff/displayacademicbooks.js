import React, { useState } from 'react';
import { SearchIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../staff/navbar';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';

export const academicData = [
    { id: 301, title: "Campbell Biology", imageUrl: "https://rukminim2.flixcart.com/image/750/900/jbdys280/book/6/5/8/campbell-biology-original-imafyhh9nwvdn2gj.jpeg?q=20&crop=false" },
    { id: 302, title: "Organic Chemistry", imageUrl: "https://m.media-amazon.com/images/I/61XeLR07VFL._AC_UF1000,1000_QL80_.jpg" },
    { id: 303, title: "Principles of Economics", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/03/Alfred_Marshall_-_Principles_of_Economics_%281890%29.JPG" },
    { id: 304, title: "Psychology", imageUrl: "https://5.imimg.com/data5/SELLER/Default/2020/8/IN/BJ/NY/94559699/human-psychology-books.jpg" },
    { id: 305, title: "Engineering Mechanics: Dynamics", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-1Qb5XmzUTjJBnrEWuZjaTbK4N7vcYqv6hQ&s" },
    { id: 306, title: "Fundamentals of Corporate Finance", imageUrl: "https://m.media-amazon.com/images/I/61oV1G3iZNL._AC_UF1000,1000_QL80_.jpg" },
    { id: 307, title: "Introduction to Algorithms", imageUrl: "https://m.media-amazon.com/images/I/81PnkB-2AiL._AC_UF1000,1000_QL80_.jpg" },
];


function Academic_Books() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const booksPerPage = 12;
  const navigate = useNavigate();

  // Filtered books based on search term
  const filteredBooks = academicData.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination based on filtered books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const deleteBook = () => {
    toast.success('Deleted Book Successfully');
  };

  const editBook = () => {
    navigate('/staff-editbook'); // Use navigate instead of history.push
  };

  return (
    <div>
      <NavBar />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
          {/* Render books */}
          {currentBooks.map(book => (
            <div key={book.id} className="max-w-sm rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img
                  alt={`Cover of ${book.title}`}
                  src={book.imageUrl}
                   className="w-full h-48 object-contain"
                />
                <div
                  className="absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer"
                  onClick={editBook}
                >
                  <PencilAltIcon className="h-6 w-6 text-gray-500" />
                </div>
                <div
                  className="absolute top-10 right-2 bg-white rounded-full p-1 cursor-pointer"
                  onClick={deleteBook}
                >
                  <TrashIcon className="h-6 w-6 text-gray-500" />
                </div>
                <ToastContainer />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center">{book.title}</div>
                <div className="flex justify-center">
                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors duration-300">
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
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page + 1 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
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

export default Academic_Books;
