import React, { useState } from 'react';
import { Table } from 'antd';
import NavBar from './navbar';
import Footer from './footer';


// Sample data for demonstration purposes
const sampleData = [
  { id: 1, userName: 'Alice', bookTitle: '1984', stars: 4, comments: 'Great book!', status: 'Accepted' },
  { id: 2, userName: 'Bob', bookTitle: 'To Kill a Mockingbird', stars: 5, comments: 'A must-read!', status: 'Accepted' },
  { id: 3, userName: 'Charlie', bookTitle: 'The Great Gatsby', stars: 3, comments: 'Interesting read', status: 'Reject' },
  { id: 4, userName: 'Dave', bookTitle: 'Moby Dick', stars: 2, comments: 'Not my favorite', status: 'Reject' },
];

const NovelData = () => {
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
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <span className={text === 'Accepted' ? 'text-green-500' : 'text-red-500'}>{text}</span>
      ),
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
    <NavBar />
    <main className="flex-grow mt-8 mb-8 px-4 md:px-0"> {/* Add horizontal padding for mobile */}
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md mb-14 overflow-x-auto">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Reading History</h3>
        <Table
          dataSource={sampleData}
          columns={columns}
          pagination={{ current: currentPage, pageSize: itemsPerPage, total: sampleData.length }}
          onChange={handleTableChange}
          rowKey="id"
        />
      </div>
    </main>
    <Footer />
  </div>
  

  );
};

export default NovelData;
