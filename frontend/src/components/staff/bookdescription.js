import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../staff/navbar';
import Footer from './footer';
import { UserIcon, GlobeAltIcon, DocumentTextIcon } from '@heroicons/react/outline';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../axiosInstance'; 

function Book_Description() {
  const [showMore, setShowMore] = useState(false);
  const [bookData, setBookData] = useState(null); 
  const [averageRating, setAverageRating] = useState(0);
  const { title } = useParams(); 
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axiosInstance.get(`/books/display/${title}`)
      .then(response => {
        setBookData(response.data); 
      })
      .catch(error => {
        console.error('There was an error fetching the book data:', error);
        toast.error('Failed to fetch book data.');
      });

      // Fetch average rating
      axiosInstance.get(`/books/average-rating/${title}`)
      .then(response => {
        if (response.data && response.data.averageRating !== undefined) {
          setAverageRating(response.data.averageRating);
        } else {
          console.error('Unexpected response format:', response.data);
          toast.error('Unexpected response format for average rating.');
        }
      })
      .catch(error => {
        console.error('There was an error fetching the average rating:', error);
        toast.error('Failed to fetch average rating.');
      });
  }, [title]); 

  const editBook = (title) => {
    const normalizedTitle = title.replace(/-/g, ' ');
    navigate(`/staff-editbook/${normalizedTitle}`);
  };

  const handleRemove = (id) => {
    if (!id) {
      toast.error('Invalid book ID');
      return;
    }

    axiosInstance.delete(`/books/delete/${id}`)
      .then(response => {
        if (response.status === 200) {
          toast.success('Successfully deleted');
          navigate('/books'); // Navigate back to books list after deletion
        } else {
          toast.error('Failed to delete the book. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error deleting book:', error);
        toast.error('Error deleting the book. Please try again later.');
      });
  };

  if (!bookData) return <div>Loading...</div>; // Add loading state

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 container mx-auto p-4 mt-24 mb-32"> 
        <div className="bg-white bg-opacity-90 shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row p-6 relative mb-8"> 
          {/* Left side: Book cover */}
          <div className="md:w-1/3 relative">
            <img
              src={bookData.coverImage ? `${baseURL}${bookData.coverImage.replace(/\\/g, '/')}` : 'default-image-path.jpg'}
              alt="Book Cover"
              className="w-full h-auto md:h-full object-contain rounded-md"
              style={{ maxHeight: '300px' }}
            />
          </div>
          {/* Right side: Book details */}
          <div className="md:w-2/3 mt-4 md:mt-0 md:ml-6 flex flex-col">
            <h1 className="text-2xl font-bold">{bookData.title}</h1> 
            <div className="flex items-center mt-2">
              <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
              <p className="text-lg">{bookData.authors}</p> 
            </div>
            <div className="flex items-center mt-2">
              <GlobeAltIcon className="h-5 w-5 text-gray-500 mr-2" />
              <p className="text-lg">Language: {bookData.language}</p> 
            </div>
            <div className="flex items-center mt-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md mr-2">{averageRating} ⭐️</span> 
            </div>
            <div className="mt-4">
              <DocumentTextIcon className="h-5 w-5 text-gray-500 mr-2 inline" />
              <span className="text-lg font-bold">Description:</span>
              <p className={`mt-2 ${showMore ? '' : 'line-clamp-3'}`}>
                {bookData.description} 
              </p>
              <button onClick={() => setShowMore(!showMore)} className="text-blue-500 mt-2">
                {showMore ? 'Show less' : 'Read more'}
              </button>
            </div>
            <div className="mt-6 flex space-x-4">
              <button onClick={() => editBook(bookData.title)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit Book</button>
              <button onClick={() => handleRemove(bookData._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete Book</button>
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
