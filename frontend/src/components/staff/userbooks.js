import React, { useState } from 'react';
import { Table, Image, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import NavBar from './navbar';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const sampleData = [
    { id: 1, title: 'Book A', authors: ['Author 1'], genre: 'Fantasy', description: 'Description 1', coverImageUrl: 'https://via.placeholder.com/150', bookFile: 'file1.pdf' },
    { id: 2, title: 'Book B', authors: ['Author 2'], genre: 'Romance', description: 'Description 2', coverImageUrl: 'https://via.placeholder.com/150', bookFile: 'file2.pdf' },
    { id: 3, title: 'Book C', authors: ['Author 3'], genre: 'Science Fiction', description: 'Description 3', coverImageUrl: 'https://via.placeholder.com/150', bookFile: 'file3.pdf' },
    { id: 4, title: 'Book D', authors: ['Author 4'], genre: 'Mystery', description: 'Description 4', coverImageUrl: 'https://via.placeholder.com/150', bookFile: 'file4.pdf' },
    { id: 5, title: 'Book E', authors: ['Author 5'], genre: 'Horror', description: 'Description 5', coverImageUrl: 'https://via.placeholder.com/150', bookFile: 'file5.pdf' },
    { id: 6, title: 'Book F', authors: ['Author 6'], genre: 'Biography', description: 'Description 6', coverImageUrl: 'https://via.placeholder.com/150', bookFile: 'file6.pdf' },
    { id: 7, title: 'Book G', authors: ['Author 7'], genre: 'Thriller', description: 'Description 7', coverImageUrl: 'https://via.placeholder.com/150', bookFile: 'file7.pdf' },
    { id: 8, title: 'Book H', authors: ['Author 8'], genre: 'Historical Fiction', description: 'Description 8', coverImageUrl: 'https://via.placeholder.com/150', bookFile: 'file8.pdf' },
    { id: 9, title: 'Book I', authors: ['Author 9'], genre: 'Dystopian', description: 'Description 9', coverImageUrl: 'https://via.placeholder.com/150', bookFile: 'file9.pdf' },
    { id: 10, title: 'Book J', authors: ['Author 10'], genre: 'Fantasy', description: 'Description 10', coverImageUrl: 'https://via.placeholder.com/150', bookFile: 'file10.pdf' },
];

const UserBooks = () => {
    const [data, setData] = useState(sampleData);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Sr.No',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
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
            render: authors => authors.join(', '),
            sorter: (a, b) => a.authors[0].localeCompare(b.authors[0]),
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
            dataIndex: 'coverImageUrl',
            key: 'coverImageUrl',
            render: coverImageUrl => coverImageUrl ? <Image src={coverImageUrl} alt="cover" height={100} /> : 'No image',
        },
        {
            title: 'Book File',
            dataIndex: 'bookFile',
            key: 'bookFile',
            render: bookFile => <a href={bookFile} target="_blank" rel="noopener noreferrer">View File</a>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className="flex flex-col space-y-2">
                    <Button
                        icon={<PlusOutlined />}
                        onClick={() => navigate('/staff-addbook')}
                        type="primary"
                        className="w-full"
                    >
                        Add
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemove(record.id)}
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

    const handleRemove = (id) => {
        setData(prevData => {
            const newData = prevData.filter(item => item.id !== id);
            if (newData.length === prevData.length) {
                toast.error('Item not found');
            } else {
                toast.success('Successfully deleted');
            }
            return newData;
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar />
            <main className="flex-grow mt-8 mb-8">
                <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md mb-14">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Book List</h2>
                    <Table
                        dataSource={data}
                        columns={columns}
                        pagination={{ current: currentPage, pageSize: itemsPerPage, total: data.length }}
                        onChange={handleTableChange}
                        rowKey="id"
                    />
                </div>
                <Footer />
            </main>
            <ToastContainer />
        </div>
    );
};

export default UserBooks;
