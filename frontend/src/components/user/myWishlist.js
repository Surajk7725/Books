// import React, { useState } from 'react';
// import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
// import { SearchIcon } from '@heroicons/react/outline';
// import NavBar from '../navbar';
// import Footer from './footer';
// import { booksData } from './allBooks';
// import { kidsData } from './kidsBooks';
// import { popularData } from './popularBooks';
// import { academicData } from './academicBooks';

// const MyWishlist = ({ bookmarkedBooks, toggleBookmark }) => {
//   // Combine all bookmarkable data into one array
//   const allData = [...booksData, ...kidsData, ...popularData, ...academicData];
//   const bookmarkedData = allData.filter(book => bookmarkedBooks.includes(book.id));

//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const booksPerPage = 12;

//   // Filtered bookmarked data based on search term
//   const filteredBookmarkedData = bookmarkedData.filter(book =>
//     book.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Calculate pagination based on filtered bookmarked data
//   const indexOfLastBook = currentPage * booksPerPage;
//   const indexOfFirstBook = indexOfLastBook - booksPerPage;
//   const currentBooks = filteredBookmarkedData.slice(indexOfFirstBook, indexOfLastBook);

//   // Change page
//   const paginate = pageNumber => setCurrentPage(pageNumber);

//   return (
//     <div>
//       <NavBar />
//       <div className="container mx-auto px-4 py-6 relative">

//         {/* Search bar */}
//         <div className="absolute top-4 right-4 flex items-center space-x-2 sm:space-x-4">
//           <input
//             type="text"
//             placeholder="Search books..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-32 sm:w-48 md:w-64 lg:w-80 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <SearchIcon className="h-6 w-6 text-gray-500" />
//         </div>
        
//         <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
//         {filteredBookmarkedData.length === 0 ? (
//           <p className="text-center">No books bookmarked.</p>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {currentBooks.map(book => (
//               <div key={book.id} className="max-w-sm rounded-lg overflow-hidden shadow-lg">
//                 <div className="relative">
//                   <img
//                     alt={`Cover of ${book.title}`}
//                     src={book.imageUrl}
//                     className="w-full h-48 object-contain"
//                   />
//                   <div
//                     className="absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer"
//                     onClick={() => toggleBookmark(book.id)}
//                   >
//                     <HeartIconSolid className="h-6 w-6 text-red-500" />
//                   </div>
//                 </div>
//                 <div className="px-6 py-4">
//                   <div className="font-bold text-xl mb-2 text-center">{book.title}</div>
//                   <div className="flex justify-between">
//                     <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
//                       Rating
//                     </button>
//                     <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors duration-300">
//                       View Book
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         <div className="mt-6">
//           <ul className="flex justify-center">
//             {[...Array(Math.ceil(filteredBookmarkedData.length / booksPerPage)).keys()].map(page => (
//               <li key={page} className="mx-2">
//                 <button
//                   onClick={() => paginate(page + 1)}
//                   className={`px-3 py-1 rounded-md ${
//                     currentPage === page + 1 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
//                   }`}
//                 >
//                   {page + 1}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default MyWishlist;
