import React, { useState } from 'react';
import { Table } from 'antd';
import NavBar from './navbar';
import Footer from './footer';

// Sample data for demonstration purposes
const sampleData = [
  { id: 1, userName: 'Alice', bookTitle: '1984', authorName: 'George Orwell', stars: 4, comments: 'Great book!' },
  { id: 2, userName: 'Bob', bookTitle: 'To Kill a Mockingbird', authorName: 'Harper Lee', stars: 5, comments: 'A must-read!' },
  { id: 3, userName: 'Charlie', bookTitle: 'The Great Gatsby', authorName: 'F. Scott Fitzgerald', stars: 3, comments: 'Interesting read' },
  { id: 4, userName: 'Dave', bookTitle: 'Moby Dick', authorName: 'Herman Melville', stars: 2, comments: 'Not my favorite' },
];

const BookReview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const columns = [
    {
      title: 'Sr.No',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      sorter: (a, b) => a.userName.localeCompare(b.userName),
    },
    {
      title: 'Book Title',
      dataIndex: 'bookTitle',
      key: 'bookTitle',
      sorter: (a, b) => a.bookTitle.localeCompare(b.bookTitle),
    },
    {
      title: 'Author Name',
      dataIndex: 'authorName',
      key: 'authorName',
      sorter: (a, b) => a.authorName.localeCompare(b.authorName),
    },
    {
      title: 'Stars',
      dataIndex: 'stars',
      key: 'stars',
      sorter: (a, b) => a.stars - b.stars,
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
    <NavBar />
    <main className="flex-grow mt-8 mb-8 px-4 md:px-0">
      <div className="max-w-full md:max-w-6xl mx-auto bg-white p-4 md:p-8 rounded-lg shadow-md mb-14 overflow-x-auto">
        <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">User Book Review</h3>
        <div className="overflow-x-auto">
          <Table
            dataSource={sampleData}
            columns={columns}
            pagination={{ current: currentPage, pageSize: itemsPerPage, total: sampleData.length }}
            onChange={handleTableChange}
            rowKey="id"
          />
        </div>
      </div>
    </main>
    <Footer />
  </div>
  

  );
};

export default BookReview;
