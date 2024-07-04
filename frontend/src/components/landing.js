import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ImageSlider() {
  const images = [
    'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
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
          Books Management System
        </h1>
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  return  (
    <div className="flex flex-col min-h-screen relative">
      <div className="absolute top-4 right-4 flex z-10">
      <button 
          className="mr-4 px-4 py-2 bg-transparent text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300"
          onClick={() => navigate('/login')}
        >
          <span className="mr-2">🔑</span>
          Login
        </button>
        <button 
          className="px-4 py-2 bg-transparent text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300"
          onClick={() => navigate('/signup')}
        >
          <span className="mr-2">✍️</span>
          Sign Up
        </button>
      </div>
      <div className='flex-grow'>
        <ImageSlider />
        <section className='flex flex-col md:flex-row items-center my-12 px-4'>
          <img src='https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='w-full md:w-1/2 rounded' alt='Library'/>
          <div className='mt-4 md:mt-0 md:ml-8'>
            <h2 className='text-2xl font-bold text-center'>About Us</h2>
            <p className='mt-4 text-gray-700 text-justify'>
            Welcome to our Books Management System, designed to streamline the management of our books collection, facilitate the tracking of borrowing and returning, and offer a range of efficient features. 
            Whether you're a student seeking books, a librarian managing inventory, or a library staff member assisting patrons, our intuitive interface ensures seamless navigation and effective resource management. 
            Administrators benefit from  managing user permissions with ease. Experience the effectiveness of our Books Management System today, tailored to meet the needs of all users involved in the library ecosystem.
            </p>
          </div>
        </section>
        <section className='my-12 px-4'>
          <h2 className='text-2xl font-bold text-center mb-8'>Features</h2>
          <div class="flex flex-col md:flex-row justify-center gap-6 my-8">
            <div class="bg-white rounded-lg shadow-md overflow-hidden max-w-sm">
              <img class="h-48 w-full object-cover" src="https://images.pexels.com/photos/877971/pexels-photo-877971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="A library with rows of bookshelves filled with books, with a person browsing and selecting books from the shelves, representing the feature of library collection management." />
                <div class="p-4">
                  <h3 class="text-xl font-semibold mb-2">Library Collection Management</h3>
                  <p class="text-gray-700 text-justify">Effortlessly manage your library's entire collection, from acquiring new materials to tracking inventory and maintaining accurate records.</p>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-md overflow-hidden max-w-sm">
              <img class="h-48 w-full object-cover" src="https://images.pexels.com/photos/9959711/pexels-photo-9959711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="A person checking out books at a library counter, with a librarian scanning the books and updating records, representing the feature of borrowing and returning tracking." />
              <div class="p-4">
                <h3 class="text-xl font-semibold mb-2">Borrowing and Returning Tracking</h3>
                <p class="text-gray-700 text-justify">Streamline the process of lending and returning materials, ensuring accurate tracking and timely notifications for due dates and overdue items.</p>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-md overflow-hidden max-w-sm">
              <img class="h-48 w-full object-cover" src="https://images.pexels.com/photos/9034989/pexels-photo-9034989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="A dashboard displaying various charts and graphs, showing detailed usage reports and insights about a library's collection and patron activities." />
              <div class="p-4">
                <h3 class="text-xl font-semibold mb-2">Detailed Usage Reports and Insights</h3>
                <p class="text-gray-700 text-justify">Gain valuable insights into your library's operations through comprehensive reports and analytics, enabling data-driven decision-making.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer class="bg-gray-800 py-4">
        <div class="container mx-auto text-center">
          <p class="text-white">&copy; Designed by Tome 2024</p>
        </div>
      </footer>
    </div>
  );
}
