import React, { useState } from 'react';
import { SearchIcon, HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../navbar';
import Footer from '../footer';


export const booksData = [
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


const AllBooks = ({bookmarkedBooks, toggleBookmark}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const booksPerPage = 12;

  // Filtered books based on search term
  const filteredBooks = booksData.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination based on filtered books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const shareBook = (bookId) => {
    const bookUrl = `${window.location.origin}/books/${bookId}`;
    navigator.clipboard.writeText(bookUrl).then(() => {
      toast.success('Book URL copied to clipboard!');
    }).catch(err => {
      toast.error('Failed to copy the text: ', err);
    });
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
                  onClick={() => toggleBookmark(book.id)}
                >
                  {bookmarkedBooks.includes(book.id) ? (
                    <HeartIconSolid className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6 text-gray-500" />
                  )}
                </div>
                <div
                  className="absolute top-10 right-2 bg-white rounded-full p-1 cursor-pointer"
                  onClick={() => shareBook(book.id)}
                >
                 <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z"/></svg>
                </div>
                <ToastContainer />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center">{book.title}</div>
                <div className="flex">
                  
                  <button className="bg-gray-300 ml-24 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors duration-300">
                    View Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* share option */}



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
  );
}

export default AllBooks;