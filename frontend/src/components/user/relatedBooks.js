import React, { useState } from 'react';
import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';

const RelatedBooks = ({ category }) => {
  const relatedBooks = [
    { id: 1, title: 'To Kill a Mockingbird', imageUrl: 'https://images.gr-assets.com/books/1553383690l/2657.jpg' },
    { id: 2, title: '1984', imageUrl: 'https://images.gr-assets.com/books/1348990566l/5470.jpg' },
    { id: 3, title: 'The Great Gatsby', imageUrl: 'https://images.gr-assets.com/books/1490528560l/4671.jpg' },
    { id: 4, title: 'Pride and Prejudice', imageUrl: 'https://images.gr-assets.com/books/1320399351l/1885.jpg' },
    { id: 5, title: 'The Catcher in the Rye', imageUrl: 'https://images.gr-assets.com/books/1398034300l/5107.jpg' },
    { id: 6, title: 'The Lord of the Rings', imageUrl: 'https://images.gr-assets.com/books/1411114164l/33.jpg' },
    { id: 7, title: 'The Hobbit', imageUrl: 'https://images.gr-assets.com/books/1546071216l/5907.jpg' },
    { id: 8, title: 'Moby Dick', imageUrl: 'https://images.gr-assets.com/books/1327940656l/153747.jpg' },
  ];

  const [bookmarked, setBookmarked] = useState([]);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
          {/* Render books */}
          {relatedBooks.map(book => (
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
                  {bookmarked.includes(book.id) ? (
                    <HeartIconSolid className="h-6 w-6 text-red-500" />
                    ) : (
                    <HeartIcon className="h-6 w-6 text-gray-500" />
                  )}
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center">{book.title}</div>
                <div className="flex">
                  <button className="bg-gray-300 ml-20 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors duration-300">
                    View Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default RelatedBooks;
