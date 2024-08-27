import React, { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import NavBar from '../staff/navbar';
import Footer from './footer';


function EditBook({ match }) {
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
    const [bookDescription, setBookDescription] = useState('');

    // useEffect(() => {
    //     // Fetch the book data based on the ID from match.params.id
    //     // and populate the state variables with the data
    //     // This is just a placeholder, replace with actual fetch logic
    //     const fetchBookData = async () => {
    //         // Replace this with actual data fetching logic
    //         const bookData = {
    //             title: 'Sample Book',
    //             authors: ['Author 1', 'Author 2'],
    //             genre: 'Fantasy',
    //             description: 'Short description',
    //             coverImageUrl: 'http://example.com/cover.jpg',
    //             isbn: '123456789',
    //             publisher: 'Sample Publisher',
    //             language: 'English',
    //             bookDescription: 'Detailed book description',
    //         };

    //         setTitle(bookData.title);
    //         setAuthors(bookData.authors);
    //         setGenre(bookData.genre);
    //         setDescription(bookData.description);
    //         setCoverImageUrl(bookData.coverImageUrl);
    //         setIsbn(bookData.isbn);
    //         setPublisher(bookData.publisher);
    //         setLanguage(bookData.language);
    //         setBookDescription(bookData.bookDescription);
    //     };

    //     fetchBookData();
    // }, [match.params.id]);

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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log({ title, authors, genre, category,  coverImage, coverImageUrl, bookFile, isbn, publisher, language, bookDescription });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar />
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
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="genre">
                                Genre
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select a category</option>
                                <option value="Fantasy">Kids</option>
                                <option value="Romance">Popular</option>
                                <option value="Biography">Academics</option>
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
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="bookDescription">
                                Book Description
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="bookDescription"
                                rows="5"
                                value={bookDescription}
                                onChange={(e) => setBookDescription(e.target.value)}
                                placeholder="Enter detailed book description"
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="cover-image">
                                Cover Image <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center">
                                <input
                                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                    id="cover-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                <span className="text-gray-500">or</span>
                                <input
                                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                                    id="cover-image-url"
                                    type="text"
                                    value={coverImageUrl}
                                    onChange={(e) => setCoverImageUrl(e.target.value)}
                                    placeholder="Enter image URL"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="book-file">
                                Book File <span className="text-red-500">*</span>
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="book-file"
                                type="file"
                                onChange={(e) => setBookFile(e.target.files[0])}
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

export default EditBook;
