
import React, { useState } from 'react';
import NavBar from '../navbar';
import Footer from '../footer';

function ImageSlider() {
  const images = [
    'https://images7.alphacoders.com/132/1326364.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
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
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">BookLove</h3>
              <p className="text-gray-600">Indulge in your love for literature with our user-friendly library management system. Easily track your reading progress and discover new literary gems.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <img alt="A logo featuring an open book with a globe, representing the vast and diverse collection of books from around the world" className="w-16 h-16 object-cover rounded-full mx-auto mb-4" src="https://placehold.co/100x100" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">WorldOfBooks</h3>
              <p className="text-gray-600">Embark on a literary journey across cultures and continents with our globally-inspired library management system. Explore a diverse collection of books from around the world.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <img alt="A logo featuring a book with a clock, symbolizing the ability to manage and track book loans and due dates" className="w-16 h-16 object-cover rounded-full mx-auto mb-4" src="https://placehold.co/100x100" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">BookKeeper</h3>
              <p className="text-gray-600">Stay organized and on top of your reading with our efficient library management system. Easily manage book loans, renewals, and due dates.</p>
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

      <div className="p-8">
        <h2 className="text-3xl font-bold text-black-800 mb-8 text-center">User Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            <p className="text-gray-600">"An absolute page-turner! I couldn't put it down until the very end. The plot was well-crafted and the characters were so relatable. Highly recommended!"</p>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            <p className="text-gray-600">"This book touched my heart. The storyline was emotional and beautifully written. It's a book that stays with you long after you've finished reading."</p>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            <p className="text-gray-600">"A fantastic read! The author did an amazing job creating a vivid and immersive world. I felt like I was right there with the characters."</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-3xl font-bold text-black-800 mb-8 text-center">Author Spotlights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Author 1</h3>
              <p className="text-gray-600">Author 1 is known for their captivating storytelling and unique voice. With several bestsellers under their belt, they continue to enchant readers with every new release.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Author 2</h3>
              <p className="text-gray-600">A master of suspense, Author 2's novels are filled with unexpected twists and turns. Their ability to keep readers guessing until the last page is truly remarkable.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Author 3</h3>
              <p className="text-gray-600">Author 3 brings historical events to life with their meticulous research and engaging writing style. Their books offer a perfect blend of education and entertainment.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-3xl font-bold text-black-800 mb-8 text-center">Blog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Blog Post Title 1</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis tortor non urna fermentum eleifend.</p>
            <a href="#" className="text-blue-500 mt-2 inline-block">Read More</a>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Blog Post Title 2</h3>
            <p className="text-gray-600">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam vitae varius mauris.</p>
            <a href="#" className="text-blue-500 mt-2 inline-block">Read More</a>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Blog Post Title 3</h3>
            <p className="text-gray-600">Nullam sit amet risus consectetur, scelerisque risus ut, cursus elit. Mauris euismod felis eget turpis semper varius.</p>
            <a href="#" className="text-blue-500 mt-2 inline-block">Read More</a>
          </div>
        </div>
      </div>
        <Footer />
      </div>
  )
}

export default Home
