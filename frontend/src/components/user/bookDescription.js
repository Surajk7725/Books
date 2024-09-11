import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance'; 
import NavBar from '../navbar';
import Footer from './footer';
import RelatedBooks from './relatedBooks';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { HeartIcon, UserIcon, GlobeAltIcon, DocumentTextIcon } from '@heroicons/react/outline';
import { Link, useParams } from 'react-router-dom'; 
import CommentCard from './comments';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function BookDescription() {
  const [showMore, setShowMore] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookData, setBookData] = useState(null); 
  const [averageRating, setAverageRating] = useState(0);
  const { title } = useParams(); 

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

  const toggleBookmark = async () => {
    try {
      setBookmarked(!bookmarked);
      await axiosInstance.post(`/books/bookmark/${bookData._id}`, { bookmarked: !bookmarked });
      toast.success(bookmarked ? "Book removed from bookmarks" : "Bookmarked successfully");
    } catch (error) {
      console.error("Error bookmarking the book:", error);
      toast.error("Failed to bookmark the book");
    }
  };
  

  const shareBook = (bookTitle) => {
    const formattedTitle = bookTitle.replace(/-/g, ' ');
    const bookUrl = `${window.location.origin}/display-books/${formattedTitle}/description`;
    navigator.clipboard.writeText(bookUrl)
      .then(() => {
        toast.success('Book URL copied to clipboard!');
      })
      .catch(err => {
        toast.error('Failed to copy the text: ', err);
      });
  };


  const handleDownload = () => {
    const filePath = bookData.bookFile ? `${baseURL}${bookData.bookFile.replace(/\\/g, '/')}` : null;
    if (filePath) {
      window.open(filePath, '_blank');
    } else {
      toast.error('No document available for download.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <ToastContainer />
      <div className="flex-1 container mx-auto p-4 mb-32">
        {bookData ? ( 
          <>
            <div className="bg-white bg-opacity-90 shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row p-6 relative mb-8">
              <div className="md:w-1/3 relative">
                <img
                  src={bookData.coverImage ? `${baseURL}${bookData.coverImage.replace(/\\/g, '/')}` : 'default-image-path.jpg'}
                  alt="Book Cover"
                  className="w-full h-auto md:h-full object-contain rounded-md"
                  style={{ maxHeight: '300px' }}
                />
                <BookmarkButton bookmarked={bookmarked} toggleBookmark={toggleBookmark} />
                <div
                  className="absolute top-10 right-2 bg-white rounded-full p-1 cursor-pointer"
                  onClick={() => shareBook(bookData.title)} 
                >
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z" /></svg>
                </div>
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
                  <Link to={`/display-books/rating/${title}`} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Rating
                  </Link>
                  <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    View Document
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <CommentCard bookTitle={bookData.title} bookAuthor={bookData.authors} />
            </div>
            <div>
              <RelatedBooks category="All Books" />
            </div>
          </>
        ) : (
          <p>Loading book details...</p> 
        )}
      </div>
      <Footer />
    </div>
  );
}

// BookmarkButton component
function BookmarkButton({ bookmarked, toggleBookmark }) {
  return (
    <div className="absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer" onClick={toggleBookmark}>
      {bookmarked ? (
        <HeartIconSolid className="h-6 w-6 text-red-500" />
      ) : (
        <HeartIcon className="h-6 w-6 text-gray-500" />
      )}
    </div>
  );
}

export default BookDescription;



