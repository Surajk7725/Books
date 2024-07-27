import React, { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import NavBar from '../navbar';
import Footer from './footer';

function BookForm() {
    const [authors, setAuthors] = useState(['']);
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [bookFile, setBookFile] = useState(null);

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
        console.log({ title, authors, genre, description, coverImage, coverImageUrl, bookFile });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar />
            <main className="flex-grow mt-8 mb-8">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
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
                                <option value="Mystery">Mystery</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Historical Fiction">Historical Fiction</option>
                                <option value="Dystopian">Dystopian</option>
                            </select>
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
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="cover-image">
                                Cover Image
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

export default BookForm;
