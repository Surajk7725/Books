import React, { useState } from 'react';
import NavBar from './navbar';
import Footer from '../footer';

const sampleData = [
    { title: 'Book A', authors: ['Author 1'], genre: 'Fantasy', description: 'Description 1', coverImageUrl: '', bookFile: 'File 1' },
    { title: 'Book B', authors: ['Author 2'], genre: 'Romance', description: 'Description 2', coverImageUrl: '', bookFile: 'File 2' },
    { title: 'Book C', authors: ['Author 3'], genre: 'Science Fiction', description: 'Description 3', coverImageUrl: '', bookFile: 'File 3' },
    { title: 'Book D', authors: ['Author 4'], genre: 'Mystery', description: 'Description 4', coverImageUrl: '', bookFile: 'File 4' },
    { title: 'Book E', authors: ['Author 5'], genre: 'Horror', description: 'Description 5', coverImageUrl: '', bookFile: 'File 5' },
    { title: 'Book F', authors: ['Author 6'], genre: 'Biography', description: 'Description 6', coverImageUrl: '', bookFile: 'File 6' },
    { title: 'Book G', authors: ['Author 7'], genre: 'Thriller', description: 'Description 7', coverImageUrl: '', bookFile: 'File 7' },
    { title: 'Book H', authors: ['Author 8'], genre: 'Historical Fiction', description: 'Description 8', coverImageUrl: '', bookFile: 'File 8' },
    { title: 'Book I', authors: ['Author 9'], genre: 'Dystopian', description: 'Description 9', coverImageUrl: '', bookFile: 'File 9' },
    { title: 'Book J', authors: ['Author 10'], genre: 'Fantasy', description: 'Description 10', coverImageUrl: '', bookFile: 'File 10' },
];

const UserBooks = () => {
    const [bookList, setBookList] = useState(sampleData);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'ascending' });

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        setBookList((prevList) =>
            [...prevList].sort((a, b) => {
                if (a[key] < b[key]) {
                    return direction === 'ascending' ? -1 : 1;
                }
                if (a[key] > b[key]) {
                    return direction === 'ascending' ? 1 : -1;
                }
                return 0;
            })
        );
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = bookList.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(bookList.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar />
            <main className="flex-grow mt-8 mb-8">
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md mb-14">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Book List</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('title')}>Title</th>
                                <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('authors')}>Author(s)</th>
                                <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('genre')}>Genre</th>
                                <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('description')}>Description</th>
                                <th className="py-3 px-6 text-left">Cover Image</th>
                                <th className="py-3 px-6 text-left">Book File</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {currentItems.map((book, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{book.title}</td>
                                    <td className="py-3 px-6 text-left">{book.authors.join(', ')}</td>
                                    <td className="py-3 px-6 text-left">{book.genre}</td>
                                    <td className="py-3 px-6 text-left">{book.description}</td>
                                    <td className="py-3 px-6 text-left">
                                        {book.coverImageUrl ? (
                                            <img src={book.coverImageUrl} alt={book.title} className="h-10" />
                                        ) : (
                                            'No image'
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-left">{book.bookFile}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-4">
                        {pageNumbers.map((number) => (
                            <button
                                key={number}
                                className={`mx-1 px-3 py-1 border ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                                onClick={() => paginate(number)}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default UserBooks;
