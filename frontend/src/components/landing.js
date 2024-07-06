import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Slide4 from './images/slide4.jpg';
import Slide5 from './images/slide5.jpg';
import Slide6 from './images/slide6.jpg';
import Slide7 from './images/slide7.jpg';
import { ChevronDownIcon, BookOpenIcon, ClipboardCheckIcon, MailIcon, PencilIcon  } from '@heroicons/react/outline';
import Footer from './footer';

function ImageSlider() {
  const images = [Slide4, Slide5, Slide6, Slide7];
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, [currentIndex, images.length]);

  return (
    <div className='h-[500px] bg-center bg-cover transition-all duration-500 relative' style={{ backgroundImage: `url(${images[currentIndex]})` }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white bg-black bg-opacity-50 p-4 rounded-lg shadow-lg">
          Explore a World of Books
        </h1>
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle

  return (
    <div className="flex flex-col min-h-screen relative">
 <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <div className="text-2xl font-bold mr-4">BookHub</div>
        </div>

        {/* Mobile Login and Signup buttons */}
        <div className="flex items-center justify-center md:hidden space-x-4">
          <button
            className="px-4 py-2 bg-transparent text-gray-700 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300"
            onClick={() => navigate('/login')}
          >
            <span className="mr-2">🔑</span>
            Login
          </button>
          <button
            className="px-4 py-2 bg-transparent text-gray-700 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300"
            onClick={() => navigate('/signup')}
          >
            <span className="mr-2">✍️</span>
            Sign Up
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
          </svg>
        </button>

        <div className="hidden md:flex md:space-x-6 flex-grow justify-center">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out"
            >
              <span className="flex items-center">
                <BookOpenIcon className="h-5 w-5" /> 
                <span className="ml-2">Books</span>
              </span>
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                <Link to="/books/kids" className="block px-4 py-2 hover:bg-gray-100">Kids</Link>
                <Link to="/books/popular" className="block px-4 py-2 hover:bg-gray-100">Popular</Link>
                <Link to="/books/recommendations" className="block px-4 py-2 hover:bg-gray-100">Recommendations</Link>
              </div>
            )}
          </div>
          <Link to="#" className="text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out"><span className="flex items-center">
              <ClipboardCheckIcon className="h-5 w-5" /> Queries</span>
          </Link>
          <Link to="#" className="text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out"><span className="flex items-center">
              <PencilIcon className="h-5 w-5" /> Write A Note</span>
          </Link>
          <Link to="/contactus" className="text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out"><span className="flex items-center">
              <MailIcon className="h-5 w-5" /> Contact Us</span>
          </Link>
        </div>

        {/* Desktop Login and Signup buttons */}
        <div className="hidden md:flex md:space-x-4">
          <button
            className="px-4 py-2 bg-transparent text-gray-700 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300"
            onClick={() => navigate('/login')}
          >
            <span className="mr-2">🔑</span>
            Login
          </button>
          <button
            className="px-4 py-2 bg-transparent text-gray-700 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300"
            onClick={() => navigate('/signup')}
          >
            <span className="mr-2">✍️</span>
            Sign Up
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white text-gray-800 py-2 px-4 mt-4 rounded-lg shadow-md relative">
          <div className="flex flex-col space-y-2">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="block py-2 w-full flex items-center text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out"
              >
                <span className="flex items-center">
                  <BookOpenIcon className="h-5 w-5" /> 
                  <span className="ml-2">Books</span>
                </span>
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-full bg-white text-black rounded-md shadow-lg">
                  <Link to="/books/kids" className="block px-4 py-2 hover:bg-gray-100">Kids</Link>
                  <Link to="/books/popular" className="block px-4 py-2 hover:bg-gray-100">Popular</Link>
                  <Link to="/books/recommendations" className="block px-4 py-2 hover:bg-gray-100">Recommendations</Link>
                </div>
              )}
            </div>
            <Link to="#" className="block py-2 text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out"><span className="flex items-center">
              <ClipboardCheckIcon className="h-5 w-5" /> Queries</span>
            </Link>
            <Link to="#" className="block py-2 text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out"><span className="flex items-center">
              <PencilIcon className="h-5 w-5" /> Write A Note</span>
            </Link>
            <Link to="/contactus" className="block py-2 text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out"><span className="flex items-center">
              <MailIcon className="h-5 w-5" /> Contact Us</span>
            </Link>
          </div>
        </div>
      )}
    </header>

      <div className='flex-grow'>
        <ImageSlider />

        <section className='flex flex-col md:flex-row items-center my-12 px-4'>
          <img src='https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='w-full md:w-1/3 rounded' alt='Library'/>
          <div className='mt-4 md:mt-0 md:ml-8'>
            <h2 className='text-2xl font-bold text-center'>About Us</h2>
            <p className='mt-4 text-gray-700 text-justify'>
            Welcome to BookHub, your ultimate destination for exploring and downloading books across a myriad of genres tailored for both kids and adults. Immerse yourself in our vast collection where literary treasures await discovery at every turn. Whether you're seeking thrilling adventures, heartwarming tales, or educational resources, BookHub is your gateway to a world of captivating stories. Enjoy personalized recommendations curated just for you, making it easier than ever to find your next favorite read. Embrace the joy of reading with BookHub, where every page offers an opportunity to expand your imagination and enrich your mind.
            Navigate our user-friendly platform to seamlessly browse through new releases, timeless classics, and hidden gems that cater to every reading preference. At BookHub, we are committed to fostering a love for literature by providing easy access to a diverse library of books that inspire, educate, and entertain. 
            </p>
          </div>
        </section>

        <section className='my-12 px-4'>
          <h2 className='text-2xl font-bold text-center mb-8'>Book Categories</h2>
          <div className='flex flex-wrap justify-center gap-4'>
            {['Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction', 'Mystery', 'Educational'].map(category => (
              <button key={category} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300'>{category}</button>
            ))}
          </div>
        </section>

        <section className='my-12 px-4'>
          <h2 className='text-2xl font-bold text-center mb-8'>Featured Books</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {['Book 1', 'Book 2', 'Book 3'].map((book, index) => (
              <div key={index} className='bg-white rounded-lg shadow-md overflow-hidden'>
                <img className='h-48 w-full object-cover' src={`https://placekitten.com/400/200?image=${index}`} alt={book}/>
                <div className='p-4'>
                <h3 className='text-xl font-semibold mb-2'>{book}</h3>
                  <p className='text-gray-700 text-justify'>A brief description of {book}.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='my-12 px-4'>
          <h2 className='text-2xl font-bold text-center mb-8'>Recommended Books</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {['Book 4', 'Book 5', 'Book 6'].map((book, index) => (
              <div key={index} className='bg-white rounded-lg shadow-md overflow-hidden'>
                <img className='h-48 w-full object-cover' src={`https://placekitten.com/400/200?image=${index + 3}`} alt={book}/>
                <div className='p-4'>
                  <h3 className='text-xl font-semibold mb-2'>{book}</h3>
                  <p className='text-gray-700 text-justify'>A brief description of {book}.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='my-12 px-4'>
          <h2 className='text-2xl font-bold text-center mb-8'>Downloadable Books</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {['Book 7', 'Book 8', 'Book 9'].map((book, index) => (
              <div key={index} className='bg-white rounded-lg shadow-md overflow-hidden'>
                <img className='h-48 w-full object-cover' src={`https://placekitten.com/400/200?image=${index + 6}`} alt={book}/>
                <div className='p-4'>
                  <h3 className='text-xl font-semibold mb-2'>{book}</h3>
                  <p className='text-gray-700 text-justify'>A brief description of {book}.</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
