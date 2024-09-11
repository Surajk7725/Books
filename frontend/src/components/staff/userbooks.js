import React, { useState, useEffect } from 'react';
import { Table, Image, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import NavBar from './navbar';
import Footer from './footer';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import 'react-toastify/dist/ReactToastify.css';

const baseURL = process.env.REACT_APP_API_URL;

const UserBooks = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        axiosInstance.get('/books/user/display')
            .then(response => {
                if (response.data && Array.isArray(response.data)) {
                    setData(response.data);
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

    const handleAddByStaff = (id) => {
        axiosInstance.post('/books/user2staff-books', { bookId: id })
            .then(response => {
                if (response.status === 200) {
                    setData(prevData => prevData.map(book => {
                        if (book._id === id) {
                            return { ...book, addedByStaff: true };
                        }
                        return book;
                    }));
                    toast.success('Book successfully marked as added by staff');
                } else {
                    toast.error('Failed to mark the book as added by staff.');
                }
            })
            .catch(error => {
                console.error('Error marking book as added by staff:', error);
                toast.error('Error occurred. Please try again later.');
            });
    };

    const handleRemove = (id) => {
        if (!id) {
            toast.error('Invalid book ID');
            return;
        }
    
        axiosInstance.delete(`/books/delete/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setData(prevData => {
                        const newData = prevData.filter(item => item._id !== id);
                        toast.success('Successfully deleted');
                        return newData;
                    });
                } else {
                    toast.error('Failed to delete the book. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error deleting book:', error);
                toast.error('Error deleting the book. Please try again later.');
            });
    };


    const columns = [
        {
            title: 'Sr.No',
            key: 'srno',
            render: (_, __, index) => currentPage * itemsPerPage - itemsPerPage + index + 1,
            sorter: (a, b) => a._id.localeCompare(b._id),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Author(s)',
            dataIndex: 'authors',
            key: 'authors',
            render: (authors) => (Array.isArray(authors) ? authors.join(', ') : ''),
            sorter: (a, b) => (a.authors[0] || '').localeCompare(b.authors[0] || ''),
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
            sorter: (a, b) => a.genre.localeCompare(b.genre),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Cover Image',
            dataIndex: 'coverImage',
            key: 'coverImage',
            render: coverImage => coverImage ? <Image src={`${baseURL}${coverImage.replace('\\', '/')}`} alt="cover" height={100} /> : 'No image',
        },
        {
            title: 'Book File',
            dataIndex: 'bookFile',
            key: 'bookFile',
            render: bookFile => bookFile ? <a href={`${baseURL}${bookFile.replace('\\', '/')}`} target="_blank" rel="noopener noreferrer">View File</a> : 'No file',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className="flex flex-col space-y-2">
                     <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        className="w-full"
                        onClick={() => handleAddByStaff(record._id)}
                        disabled={record.addedByStaff} 
                    >
                        Add
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemove(record._id)}
                        danger
                        className="w-full"
                    >
                        Remove
                    </Button>
                </div>
            ),
        },
    ];

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
    };

    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar />
            <main className="flex-grow mt-4 mb-4 md:mt-8 md:mb-8 px-4 md:px-0">
                <div className="max-w-full md:max-w-6xl mx-auto bg-white p-4 md:p-8 rounded-lg shadow-md mb-6 md:mb-14 mt-4 md:mt-8 overflow-x-auto">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">Book List</h2>
                    <Table
                        dataSource={data}
                        columns={columns}
                        pagination={{ current: currentPage, pageSize: itemsPerPage, total: data.length }}
                        onChange={handleTableChange}
                        rowKey="_id"
                    />
                </div>
            </main>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default UserBooks;
