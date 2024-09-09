import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { PlusCircleIcon } from '@heroicons/react/outline';
import NavBar from '../navbar';
import Footer from './footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BookForm() {
    const [authors, setAuthors] = useState(['']);
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [bookFile, setBookFile] = useState(null);
    const [category, setCategory] = useState('');
    const [language, setLanguage] = useState('');

    const addAuthorField = () => {
        setAuthors([...authors, '']);
    };

    const handleAuthorChange = (index, value) => {
        const newAuthors = [...authors];
        newAuthors[index] = value;
        setAuthors(newAuthors);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setCoverImage(file);
    };

    const handleBookFileUpload = (e) => {
        const file = e.target.files[0];
        setBookFile(file);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('genre', genre);
        formData.append('description', description);
        formData.append('category', category);
        if (coverImage) formData.append('coverImage', coverImage);
        if (bookFile) formData.append('bookFile', bookFile);

        authors.forEach((author, index) => {
            formData.append(`authors[${index}]`, author);
        });

        try {
            const response = await axiosInstance.post('/books/user/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            toast.success('Book added successfully!');

            setTitle('');
            setAuthors(['']);
            setGenre('');
            setCoverImage(null);
            setDescription('');
            setBookFile(null);
            setCategory('');

        } catch (error) {
            toast.error('Error adding book. Please try again.');
            console.error('Error adding book:', error.response ? error.response.data : error.message);
        }        
    };
    

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar />
            <main className="flex-grow mt-8 mb-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Book</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="title"
                                type="text"
                                placeholder="Enter book title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="author">
                                Author(s) <span className="text-red-500">*</span>
                            </label>
                            {authors.map((author, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                                        value={author}
                                        placeholder="Enter author name"
                                        onChange={(e) => handleAuthorChange(index, e.target.value)}
                                        required
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                className="flex items-center text-blue-500 hover:text-blue-700 mt-2"
                                onClick={addAuthorField}
                            >
                                <PlusCircleIcon className="w-5 h-5 mr-1" /> Add Author
                            </button>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="genre">
                                Genre
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="genre"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            >
                                <option value="">Select a genre</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Romance">Romance</option>
                                <option value="Biography">Biography</option>
                                <option value="Horror">Horror</option>
                                <option value="Science Fiction">Science Fiction</option>
                                <option value="Education">Education</option>
                                <option value="Mystery">Mystery</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Historical Fiction">Historical Fiction</option>
                                <option value="Dystopian">Dystopian</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="genre">
                                Category
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select a category</option>
                                <option value="Kids">Kids</option>
                                <option value="Popular">Popular</option>
                                <option value="Academics">Academics</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="language">
                                Language <span className="text-red-500">*</span>
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="language"
                                type="text"
                                placeholder="Enter language"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter book description"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="coverImage">
                                Cover Image
                            </label>
                            <input
                                type="file"
                                id="coverImage"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="bookFile">
                                Book File
                            </label>
                            <input
                                type="file"
                                id="bookFile"
                                accept=".pdf, .epub, .mobi"
                                onChange={handleBookFileUpload}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add Book
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
            <ToastContainer />
        </div>
    );
}

export default BookForm;
