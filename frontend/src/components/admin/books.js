import React, { useState, useMemo } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@heroicons/react/outline';

// Sample books data
const booksData = [
  { id: 1, title: 'To Kill a Mockingbird', imageUrl: 'https://images.gr-assets.com/books/1553383690l/2657.jpg' },
  { id: 2, title: '1984', imageUrl: 'https://images.gr-assets.com/books/1348990566l/5470.jpg' },
  { id: 3, title: 'The Great Gatsby', imageUrl: 'https://images.gr-assets.com/books/1490528560l/4671.jpg' },
  { id: 4, title: 'Pride and Prejudice', imageUrl: 'https://images.gr-assets.com/books/1320399351l/1885.jpg' },
  { id: 5, title: 'The Catcher in the Rye', imageUrl: 'https://images.gr-assets.com/books/1398034300l/5107.jpg' },
  { id: 6, title: 'The Lord of the Rings', imageUrl: 'https://images.gr-assets.com/books/1411114164l/33.jpg' },
  { id: 7, title: 'The Hobbit', imageUrl: 'https://images.gr-assets.com/books/1546071216l/5907.jpg' },
  { id: 8, title: 'Moby Dick', imageUrl: 'https://images.gr-assets.com/books/1327940656l/153747.jpg' },
  { id: 9, title: 'War and Peace', imageUrl: 'https://images.gr-assets.com/books/1413215930l/656.jpg' },
  { id: 10, title: 'The Odyssey', imageUrl: 'https://images.gr-assets.com/books/1390173285l/1381.jpg' },
  { id: 11, title: 'Jane Eyre', imageUrl: 'https://images.gr-assets.com/books/1327867269l/10210.jpg' },
  { id: 12, title: 'Wuthering Heights', imageUrl: 'https://images.gr-assets.com/books/1388212715l/6185.jpg' },
  { id: 13, title: 'The Picture of Dorian Gray', imageUrl: 'https://images.gr-assets.com/books/1424596966l/5297.jpg' },
  { id: 14, title: 'One Hundred Years of Solitude', imageUrl: 'https://images.gr-assets.com/books/1327881361l/320.jpg' },
  { id: 15, title: 'The Hitchhiker\'s Guide to the Galaxy', imageUrl: 'https://images.gr-assets.com/books/1327656754l/11.jpg' },
  { id: 16, title: 'The Alchemist', imageUrl: 'https://images.gr-assets.com/books/1483412266l/865.jpg' },
  { id: 17, title: 'Catch-22', imageUrl: 'https://images.gr-assets.com/books/1359882576l/168668.jpg' },
  { id: 18, title: 'Slaughterhouse-Five', imageUrl: 'https://images.gr-assets.com/books/1440319389l/4981.jpg' },
  { id: 19, title: 'The Handmaid\'s Tale', imageUrl: 'https://images.gr-assets.com/books/1498057733l/38447.jpg' },
];

const Books = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const booksPerPage = 12;

  // Filtered books based on search term
  const filteredBooks = useMemo(
    () => booksData.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [searchTerm]
  );

  // Calculate pagination based on filtered books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container -mt-8 mb-8  mx-auto px-4 py-6 relative">
      {/* Heading */}
      <div className="text-start -mt-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 ml-4">Books</h1>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/admin/home">Dashboard</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Books</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      {/* Search bar */}
      <div className="absolute mt-24 top-4 right-4 flex items-center space-x-2">
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
          <div key={book.id} className="max-w-sm rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
              <img
                alt={`Cover of ${book.title}`}
                src={book.imageUrl}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-center">{book.title}</div>
              <div className="flex justify-center">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors duration-300"
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
  );
};

export default Books;
