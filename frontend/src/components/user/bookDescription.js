import React, { useState } from 'react';
import NavBar from '../navbar';
import Footer from './footer';
import RelatedBooks from './relatedBooks';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { HeartIcon, UserIcon, GlobeAltIcon, DocumentTextIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import Comments from './comments';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function BookDescription() {
  const [showMore, setShowMore] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const shareBook = () => {
    const bookUrl = `${window.location.origin}/books`;
    navigator.clipboard.writeText(bookUrl).then(() => {
      toast.success('Book URL copied to clipboard!');
    }).catch(err => {
      toast.error('Failed to copy the text: ', err);
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 container mx-auto p-4 mb-32"> {/* Add margin-bottom here */}
        <div className="bg-white bg-opacity-90 shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row p-6 relative mb-8"> {/* Add margin-bottom */}
          {/* Left side: Book cover and heart icon */}
          <div className="md:w-1/3 relative">
            <img
              src="https://images.gr-assets.com/books/1553383690l/2657.jpg"
              alt="Book Cover"
              className="w-full h-auto md:h-full object-contain rounded-md"
              style={{ maxHeight: '300px' }}
            />
            <BookmarkButton bookmarked={bookmarked} toggleBookmark={toggleBookmark} />
            <div
              className="absolute top-10 right-2 bg-white rounded-full p-1 cursor-pointer"
              onClick={() => shareBook()}
            >
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z" /></svg>
            </div>
            <ToastContainer />
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
              <Link className="bg-blue-500 text-white px-4 py-2 rounded-md">View Document</Link>
              <Link to="/display-books/rating" className="bg-blue-500 text-white px-4 py-2 rounded-md">Rating</Link>
              <Link className="bg-blue-500 text-white px-4 py-2 rounded-md">Download Document</Link>
            </div>
          </div>
        </div>
        <div className="mb-8"> {/* Add margin-bottom */}
          <Comments />
        </div>
        <div> {/* Add margin-bottom */}
          <RelatedBooks category="All Books" />
        </div>
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
