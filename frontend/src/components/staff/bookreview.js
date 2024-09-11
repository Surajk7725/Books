import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import NavBar from './navbar';
import Footer from './footer';
import axiosInstance from '../axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BookReview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const itemsPerPage = 5;

  // Fetch book ratings data from the API
  useEffect(() => {
    axiosInstance.get('/books/display')
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          const reviews = response.data.flatMap(book => 
            book.ratings.map(rating => ({
              username: rating.username,
              title: book.title,
              authors: book.authors.join(', '),
              rating: rating.rating,
              review: rating.comment,
            }))
          );
          setData(reviews);
        } else {
          setData([]);
          toast.error('Unexpected data format from the server.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setData([]);
        toast.error('Failed to fetch data. Please try again later.');
      });
  }, []);
  
  const columns = [
    {
      title: 'Sr.No',
      dataIndex: 'srNo',
      key: 'srNo',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: 'Book Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Author Name',
      dataIndex: 'authors',
      key: 'authors',
      sorter: (a, b) => a.authors.localeCompare(b.authors),
    },
    {
      title: 'Stars',
      dataIndex: 'rating',
      key: 'rating',
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: 'Comments',
      dataIndex: 'review',
      key: 'review',
    },
  ];
  
  

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />
      <ToastContainer />
      <main className="flex-grow mt-8 mb-8 px-4 md:px-0">
        <div className="max-w-full md:max-w-6xl mx-auto bg-white p-4 md:p-8 rounded-lg shadow-md mb-14 overflow-x-auto">
          <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">User Book Review</h3>
          <div className="overflow-x-auto">
            <Table
              dataSource={data} // Use the fetched data
              columns={columns}
              pagination={{ current: currentPage, pageSize: itemsPerPage, total: data.length }}
              onChange={handleTableChange}
              rowKey="_id"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookReview;