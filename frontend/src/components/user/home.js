import React, { useState, useEffect } from 'react';
import NavBar from '../navbar';
import Footer from '../footer';


function ImageSlider() {
  const images = [
    'https://images7.alphacoders.com/132/1326364.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
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

function Home() {
  return (
    <div>
      <NavBar />
      <ImageSlider />
      <div className="p-8">
        <h2 className="text-3xl font-bold text-black-800 mb-8 text-center">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <img alt="A logo featuring an open book with a green leaf, symbolizing knowledge and growth through reading" className="w-16 h-16 object-cover rounded-full mx-auto mb-4" src="https://placehold.co/100x100" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Book Explorer</h3>
              <p className="text-gray-600">Discover a world of knowledge with our comprehensive library management system. Browse, borrow, and explore a vast collection of books tailored to your interests.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <img alt="A logo featuring a stack of books with a magnifying glass, representing the ability to search and find specific titles" className="w-16 h-16 object-cover rounded-full mx-auto mb-4" src="https://placehold.co/100x100" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">BookFinder</h3>
              <p className="text-gray-600">Effortlessly navigate our extensive library catalog with our powerful search and filtering tools. Find the perfect book for your reading journey.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <img alt="A logo featuring a book with a heart, symbolizing the love and passion for reading" className="w-16 h-16 object-cover rounded-full mx-auto mb-4" src="https://placehold.co/100x100" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Literary Escapes</h3>
              <p className="text-gray-600">Immerse yourself in the world of literature with our intuitive library management system. Track your reading journey effortlessly and uncover captivating literary treasures.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <img alt="A logo featuring an open book with a globe, representing the vast and diverse collection of books from around the world" className="w-16 h-16 object-cover rounded-full mx-auto mb-4" src="https://placehold.co/100x100" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Global Reads</h3>
              <p className="text-gray-600">Embark on a voyage through the realms of storytelling with our richly diverse library collection. Explore narratives that span continents, cultures, and centuries.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <img alt="A logo featuring a book with a clock, symbolizing the ability to manage and track book loans and due dates" className="w-16 h-16 object-cover rounded-full mx-auto mb-4" src="https://placehold.co/100x100" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Reading Organizer</h3>
              <p className="text-gray-600">Streamline your reading experience with our efficient library management tools. From managing loans to tracking due dates, stay organized and focused on your literary adventures.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <img alt="A logo featuring a book with a star, representing the ability to rate and review books" className="w-16 h-16 object-cover rounded-full mx-auto mb-4" src="https://placehold.co/100x100" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">BookRatings</h3>
              <p className="text-gray-600">Share your thoughts and discover new literary gems with our interactive library management system. Rate, review, and recommend books to fellow readers.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <section className="bg-gray-200 py-16 text-center">
          <h1 className="text-4xl font-semibold">Different – Thought Provoking – Fresh – Thoroughly Entertaining</h1>
          <p className="mt-4 text-lg text-gray-700">If you’re tired of reading the same stories over and over, and are open to something a little different, Mark Lages might be the author you’re looking for.</p>
          <div className="mt-8 flex justify-center space-x-4">
            <img src="https://lh3.googleusercontent.com/proxy/X22_rGDzqg3c9yLWfyvxo_mpI3q7ZakAv8kAc1vHY1yPj8XUNYf1GKxPDhS0WPR8pzhxAdUyRGk-fUbjxf79R0L3VuHaiR5kjyW1sS_7Qy4hLbQ" alt="Book 1" className="h-80" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0j4ZQYO2JFoKkSbmG5aa_tO0yBhWl0YtcLUCz5DapnDGpYZnzEIg9EITL_s9FT8WpLgg&usqp=CAU" alt="Book 2" className="h-80" />
            <img src="https://i.pinimg.com/736x/2c/f5/a6/2cf5a651f2e28832bce684326d0dd6a5.jpg" alt="Book 3" className="h-80" />
            <img src="https://i.pinimg.com/474x/c6/b9/cb/c6b9cb9f4cc619d59386f3237e975b1b.jpg" alt="Book 4" className="h-80" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKdqMLjqBdOWwD7Rh4TYvA9P46oxG3HNdjC7RlMLejyYUPEacaA2jlQmOANfnr4UxjjD0&usqp=CAU" alt="Book 5" className="h-80" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsj2ePyvZiZC3ZY5EWRYZKnvMTcsczQ-LEsA&s" alt="Book 6" className="h-80" />
          </div>
        </section>
      </div>

    



      <Footer />
    </div>
  );
}

export default Home;
