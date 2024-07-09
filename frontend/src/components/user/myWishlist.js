import React from 'react';
import NavBar from '../navbar';
import Footer from '../footer';

const MyWishlist = ({ wishlist }) => {
  return (
    <div>
        <NavBar />
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map(book => (
            <li key={book.id} className="max-w-sm rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img
                  alt={`Cover of ${book.title}`}
                  src="https://placehold.co/600x400"
                  className="w-full h-48 object-cover"
                />
                {/* Add remove from wishlist button */}
                <button className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                  Remove
                </button>
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center">{book.title}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
      <Footer />
    </div>
  );
};

export default MyWishlist;
