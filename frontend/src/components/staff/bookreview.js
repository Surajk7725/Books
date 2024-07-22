import React, { useState } from 'react';
import NavBar from './navbar';
import Footer from '../footer';

// Sample data for demonstration purposes
const sampleData = [
  { id: 1, userName: 'Alice', bookTitle: '1984', authorName: 'George Orwell', stars: 4, rating: 4.5, comments: 'Great book!'},
  { id: 2, userName: 'Bob', bookTitle: 'To Kill a Mockingbird', authorName: 'Harper Lee', stars: 5, rating: 5.0, comments: 'A must-read!'},
  { id: 3, userName: 'Charlie', bookTitle: 'The Great Gatsby', authorName: 'F. Scott Fitzgerald', stars: 3, rating: 3.8, comments: 'Interesting read'},
  { id: 4, userName: 'Dave', bookTitle: 'Moby Dick', authorName: 'Herman Melville', stars: 2, rating: 2.5, comments: 'Not my favorite'},
  // Add more data as needed
];

const BookReview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const itemsPerPage = 5;
  const totalPages = Math.ceil(sampleData.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...sampleData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sampleData, sortConfig]);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortIcon = ({ field }) => (
    <span onClick={() => handleSort(field)} className="cursor-pointer ml-2">
      {sortConfig.key === field ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '↕'}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />
      <main className="flex-grow mt-8 mb-8">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md mb-14">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Reading History</h3>
        <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">
                  Sr.No
                  <SortIcon field="id" />
                </th>
                <th className="py-3 px-6 text-left">
                  User Name
                  <SortIcon field="userName" />
                </th>
                <th className="py-3 px-6 text-left">
                  Book Title
                  <SortIcon field="bookTitle" />
                </th>
                <th className="py-3 px-6 text-left">
                  Author Name
                  <SortIcon field="authorName" />
                </th>
                <th className="py-3 px-6 text-left">
                  Stars
                  <SortIcon field="stars" />
                </th>
                <th className="py-3 px-6 text-left">
                  Rating
                  <SortIcon field="rating" />
                </th>
                <th className="py-3 px-6 text-left">
                  Comments
                  <SortIcon field="comments" />
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {paginatedData.map((row) => (
                <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{row.id}</td>
                  <td className="py-3 px-6 text-left">{row.userName}</td>
                  <td className="py-3 px-6 text-left">{row.bookTitle}</td>
                  <td className="py-3 px-6 text-left">{row.authorName}</td>
                  <td className="py-3 px-6 text-left">{row.stars}</td>
                  <td className="py-3 px-6 text-left">{row.rating}</td>
                  <td className="py-3 px-6 text-left">{row.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center py-2">
          <button
            onClick={handlePrevPage}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
      </main>
    </div>
  );
};

export default BookReview;
