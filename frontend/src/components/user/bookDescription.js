import React, { useState } from 'react';
import NavBar from '../navbar';
import Footer from '../footer';
import RelatedBooks from './relatedBooks';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { HeartIcon, UserIcon, GlobeAltIcon, DocumentTextIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

function BookDescription() {
  const [showMore, setShowMore] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 container mx-auto p-4 mb-32"> {/* Add margin-bottom here */}
        <div className="bg-white bg-opacity-90 shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row p-6 relative">
          {/* Left side: Book cover and heart icon */}
          <div className="md:w-1/3 relative">
            <img
              src="https://images.gr-assets.com/books/1553383690l/2657.jpg"
              alt="Book Cover"
              className="w-full h-auto md:h-full object-contain rounded-md"
              style={{ maxHeight: '300px' }}
            />
            <BookmarkButton bookmarked={bookmarked} toggleBookmark={toggleBookmark} />
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
        <RelatedBooks category="All Books"/>
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
