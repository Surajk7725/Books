import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid'; // Assuming a star icon is available
import Footer from './footer';
import NavBar from '../navbar';

// Define a sample book for demonstration
const sampleBook = {
  id: 1,
  title: 'To Kill a Mockingbird',
  author: 'Harper Lee',
  imageUrl: 'https://images.gr-assets.com/books/1553383690l/2657.jpg'
};

const Rating = () => {
  const [rating, setRating] = useState(0); // State to hold the numeric rating (0 means unrated)
  const [review, setReview] = useState(''); // State to hold the review text

  const handleStarClick = (starRating) => {
    setRating(starRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSave = () => {
    setRating(0);
    setReview('');
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-start mt-10 mx-4">
        {/* Transparent Card Container */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex w-full md:w-4/5 mb-10">
          {/* Book Image (left side, centered) */}
          <div className="w-1/2 bg-gray-100 flex justify-center items-center">
            <img
              src={sampleBook.imageUrl}
              alt={`Cover of ${sampleBook.title}`}
              className="w-full rounded-lg shadow-lg"
              style={{ maxWidth: '300px', maxHeight: '450px' }}
            />
          </div>
          {/* Rating Form and Details (right side) */}
          <div className="w-1/2 px-6 py-4">
            <h2 className="text-2xl font-bold mb-4">{sampleBook.title}</h2>
            <p className="text-lg mb-2">Author: {sampleBook.author}</p>
            {/* Star Rating */}
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-8 w-8 cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
            {/* Rating Input */}
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
            {/* Review Text */}
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Review Text:</label>
              <textarea
                value={review}
                onChange={handleReviewChange}
                className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full h-40 resize-none"
              />
            </div>
            {/* Save Button */}
            <button
              onClick={handleSave}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      {/* Footer with margin top for space */}
      <Footer className="mt-14" />
    </div>
  );
};

export default Rating;
