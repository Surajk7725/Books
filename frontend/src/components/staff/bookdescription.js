import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../staff/navbar';
import Footer from './footer';
import { UserIcon, GlobeAltIcon, DocumentTextIcon } from '@heroicons/react/outline';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Book_Description() {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const handleEditBook = () => {
    navigate('/staff-editbook');
  };

  const handleDeleteBook = () => {
    toast.success("Book Deleted Successfully");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 container mx-auto p-4 mt-24 mb-32"> 
        <div className="bg-white bg-opacity-90 shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row p-6 relative mb-8"> {/* Add margin-bottom */}
          {/* Left side: Book cover */}
          <div className="md:w-1/3 relative">
            <img
              src="https://images.gr-assets.com/books/1553383690l/2657.jpg"
              alt="Book Cover"
              className="w-full h-auto md:h-full object-contain rounded-md"
              style={{ maxHeight: '300px' }}
            />
          </div>
          {/* Right side: Book details */}
          <div className="md:w-2/3 mt-4 md:mt-0 md:ml-6 flex flex-col">
            <h1 className="text-2xl font-bold">To Kill a Mockingbird</h1>
            <div className="flex items-center mt-2">
              <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
              <p className="text-lg">Harper Lee</p>
            </div>
            <div className="flex items-center mt-2">
              <GlobeAltIcon className="h-5 w-5 text-gray-500 mr-2" />
              <p className="text-lg">Language: English</p>
            </div>
            <div className="flex items-center mt-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md mr-2">4.5 ⭐️</span>
              <span className="text-gray-600">(12,345 reviews)</span>
            </div>
            <div className="mt-4">
              <DocumentTextIcon className="h-5 w-5 text-gray-500 mr-2 inline" />
              <span className="text-lg font-bold">Description:</span>
              <p className={`mt-2 ${showMore ? '' : 'line-clamp-3'}`}>
                "To Kill a Mockingbird," written by Harper Lee and published in 1960, is a seminal American novel set in the Deep South during the 1930s. It explores themes of racial injustice, moral growth, and the loss of innocence through the eyes of Scout Finch, a young girl navigating the complexities of her small Alabama town. The story unfolds as Scout's father, lawyer Atticus Finch, defends a black man falsely accused of raping a white woman. Through poignant storytelling and vivid characters, including the mysterious Boo Radley, Lee addresses profound issues of prejudice and empathy, making "To Kill a Mockingbird" a timeless classic and a powerful commentary on societal ethics and human behavior.
              </p>
              <button onClick={() => setShowMore(!showMore)} className="text-blue-500 mt-2">
                {showMore ? 'Show less' : 'Read more'}
              </button>
            </div>
            <div className="mt-6 flex space-x-4">
              <button onClick={handleEditBook} className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit Book</button>
              <button onClick={handleDeleteBook} className="bg-blue-500 text-white px-4 py-2 rounded-md">Delete Book</button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Book_Description;
