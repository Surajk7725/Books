import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { useParams } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/outline';
import NavBar from '../staff/navbar';
import Footer from './footer';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function EditBook() {
    const { title: routeTitle } = useParams();
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

    const baseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axiosInstance.get(`/books/display/${encodeURIComponent(routeTitle)}`);
                const bookData = response.data;

                setTitle(bookData.title);
                setAuthors(bookData.authors);
                setGenre(bookData.genre);
                setCategory(bookData.category);
                setCoverImageUrl(bookData.coverImageUrl);
                setIsbn(bookData.isbn);
                setPublisher(bookData.publisher);
                setLanguage(bookData.language);
                setDescription(bookData.description);
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };

        fetchBookData();
    }, [routeTitle]);


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
        formData.append('authors', JSON.stringify(authors));
        formData.append('genre', genre);
        formData.append('category', category);
    
        if (coverImage) formData.append('coverImage', coverImage);
        formData.append('coverImageUrl', coverImageUrl); 
        if (bookFile) formData.append('bookFile', bookFile);
    
        formData.append('isbn', isbn);
        formData.append('publisher', publisher);
        formData.append('language', language);
        formData.append('description', description);
    
        try {
            await axiosInstance.put(`/books/edit/${title}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });
            toast.success('Book updated successfully!');
        } catch (error) {
            toast.error('Error updating book.');
            console.error('Error updating book:', error);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar />
            <ToastContainer />
            <main className="flex-grow mt-8 mb-8">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Book</h2>
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
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
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
                                required
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
                                Language
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
                                Book Description
                            </label>
                            <textarea
                                id="bookDescription"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter book description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
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
                            {coverImage && (
                                <p className="mt-2 text-gray-600">{coverImage}</p> 
                            )}
                            {coverImageUrl && (
                                <img
                                    src={coverImageUrl}
                                    alt="Cover"
                                    className="mt-2 w-32 h-32 object-cover"
                                />
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="bookFile">
                                Book File
                            </label>
                            <input
                                type="file"
                                id="bookFile"
                                accept=".pdf,.epub"
                                onChange={handleBookFileUpload}  
                            />
                            {bookFile && (
                                <p className="mt-2 text-gray-600">{bookFile}</p> 
                            )}
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Update Book
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default EditBook;
