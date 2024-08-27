import React, { useState, useRef } from 'react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import NavBar from '../staff/navbar';
import Footer from './footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../axiosInstance';

function AddBook() {
    const [authors, setAuthors] = useState(['']);
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [category, setCategory] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [bookFile, setBookFile] = useState(null);
    const [isbn, setIsbn] = useState('');
    const [publisher, setPublisher] = useState('');
    const [language, setLanguage] = useState('');
    const [description, setDescription] = useState('');

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

    // Refs for file inputs
    const coverImageInputRef = useRef(null);
    const bookFileInputRef = useRef(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('genre', genre);
        formData.append('category', category);
        formData.append('isbn', isbn);
        formData.append('publisher', publisher);
        formData.append('language', language);
        formData.append('description', description);
        formData.append('coverImageUrl', coverImageUrl);
        if (coverImage) formData.append('coverImage', coverImage);
        if (bookFile) formData.append('bookFile', bookFile);

        authors.forEach((author, index) => {
            formData.append(`authors[${index}]`, author);
        });

        try {
            const response = await axiosInstance.post('/books/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success(response.data.message);

            // Reset form fields
            setTitle('');
            setAuthors(['']);
            setGenre('');
            setCategory('');
            setCoverImage(null);
            setCoverImageUrl('');
            setBookFile(null);
            setIsbn('');
            setPublisher('');
            setLanguage('');
            setDescription('');

             // Clear file input values
             if (coverImageInputRef.current) coverImageInputRef.current.value = '';
             if (bookFileInputRef.current) bookFileInputRef.current.value = '';

        } catch (error) {
            toast.error(error.response?.data?.message || 'Error adding book.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar />
            <ToastContainer />
            <main className="flex-grow mt-8 mb-8">
                <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Add Book</h2>
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
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="isbn">
                                ISBN
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="isbn"
                                type="text"
                                placeholder="Enter ISBN"
                                value={isbn}
                                onChange={(e) => setIsbn(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="publisher">
                                Publisher
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="publisher"
                                type="text"
                                placeholder="Enter publisher"
                                value={publisher}
                                onChange={(e) => setPublisher(e.target.value)}
                                required
                            />
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
                                Book Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                rows="5"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter detailed book description"
                                required
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="coverImage">
                                Cover Image <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-col sm:flex-row items-center">
                                <input
                                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 sm:mb-0 sm:mr-2"
                                    id="coverImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    ref={coverImageInputRef}
                                />
                                <span className="text-gray-500">or</span>
                                <input
                                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2 sm:mt-0 sm:ml-2"
                                    id="cover-image-url"
                                    type="text"
                                    value={coverImageUrl}
                                    onChange={(e) => setCoverImageUrl(e.target.value)}
                                    placeholder="Enter image URL"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="bookFile">
                                Book File <span className="text-red-500">*</span>
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="bookFile"
                                type="file"
                                onChange={handleBookFileUpload}
                                ref={bookFileInputRef}
                                accept=".pdf,.doc,.docx"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>

    );
}

export default AddBook;