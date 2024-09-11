import React, { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/solid'; 
import Footer from './footer';
import NavBar from '../navbar';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../axiosInstance';
import { useAuth } from '../authcontext';


const Rating = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [book, setBook] = useState(null);
  const { title } = useParams();
  const [username, setUsername] = useState('');

  const baseURL = process.env.REACT_APP_API_URL;

  const { user } = useAuth();

    useEffect(() => {
        if (user) {
            setUsername(user.username);
        }
    }, [user]);

  // Fetch book data on component mount
  useEffect(() => {
    axiosInstance.get(`/books/display/${title}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
        toast.error('Failed to fetch book data.');
      });
  }, [title]);

  const handleStarClick = (starRating) => {
    setRating(starRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSave = async () => {
    const ratingData = {
      title: book?.title,
      rating,
      review, 
      username,
    };

    try {
      const response = await axiosInstance.patch('/books/rating', ratingData);
      toast.success('Rating saved successfully!');
      setRating(0);
      setReview('');
    } catch (error) {
      console.error('Error saving rating:', error.response?.data || error.message);
      toast.error('Failed to save rating.');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-start mt-10 mx-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex w-full md:w-4/5 mb-10">
          {book ? (
            <>
              <div className="w-1/2 bg-gray-100 flex justify-center items-center">
                <img
                  src={book.coverImage ? `${baseURL}${book.coverImage.replace(/\\/g, '/')}` : 'default-image-path.jpg'}
                  alt="Book Cover"
                  className="w-full h-auto md:h-full object-contain rounded-md"
                  style={{ maxHeight: '500px' }}
                />
              </div>
              <div className="w-1/2 px-6 py-4">
                <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
                <p className="text-lg mb-2">Author: {book.author}</p>
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-8 w-8 cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      onClick={() => handleStarClick(star)}
                    />
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Rating (required):</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Review Text:</label>
                  <textarea
                    value={review}
                    onChange={handleReviewChange}
                    className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full h-40 resize-none"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <p>Loading book details...</p>
          )}
        </div>
      </div>
      {/* Footer with margin top for space */}
      <Footer className="mt-14" />
      <ToastContainer />
    </div>
  );
};

export default Rating;
