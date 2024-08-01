import React, { useState, useEffect, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Slide4 from './images/slide4.jpg';
import Slide5 from './images/slide5.jpg';
import Slide6 from './images/slide6.jpg';
import Slide7 from './images/slide7.jpg';
import Footer from './user/footer';
import Novel1 from './images/A Little History Economics.jpg';
import Novel2 from './images/Bad days in History.jpg';
import Novel3 from './images/Black code.jpg';
import Novel13 from './images/More More Time.jpg';
import Novel14 from './images/Quantative Aptitufe.jpg';
import Novel15 from './images/Stone oF Time.jpg';
import Author1 from './images/Barnes.png';
import Author2 from './images/Carol.png';
import Author3 from './images/Colson-Whitehead.png'; 


const ImageSlider = memo(() =>  {
  const images = [Slide4, Slide5, Slide6, Slide7];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, [images.length]);


  return (
    <div className='h-[500px] bg-center bg-cover transition-all duration-500 relative'>
    {!loaded && (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
        <span>Loading...</span>
      </div>
    )}
    <img
      src={images[currentIndex]}
      srcSet={`${images[currentIndex]} 320w, ${images[currentIndex]} 480w, ${images[currentIndex]} 800w`}
      sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px"
      alt="Slider"
      className="h-full w-full object-cover"
      onLoad={() => setLoaded(true)}
      style={{ display: loaded ? 'block' : 'none' }}
    />
    {loaded && (
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-2xl md:text-4xl font-bold text-white bg-black bg-opacity-50 p-2 md:p-4 rounded-lg shadow-lg text-center">
          Explore a World of Books
        </h1>
      </div>
    )}
  </div>
);
});

const BookCard = memo(({ image, title, description }) => (
  <div className='bg-white rounded-lg shadow-md overflow-hidden'>
    <img className='h-96 w-full object-contain' src={image} alt={title} loading="lazy" />
    <div className='p-4'>
      <h3 className='text-xl font-semibold mb-2'>{title}</h3>
      <p className='text-gray-700 text-justify'>{description}</p>
    </div>
  </div>
));

const AuthorCard = memo(({ img, name }) => (
  <div className='bg-white rounded-lg shadow-md overflow-hidden'>
    <img className='h-48 w-full object-contain' src={img} alt={name} loading="lazy" />
    <div className='p-4'>
      <h3 className='text-xl font-semibold mb-2'>{name}</h3>
      <p className='text-gray-700 text-justify'>A brief bio of {name}.</p>
    </div>
  </div>
));


export default function Landing() {
  const navigate = useNavigate();

  const categories = useMemo(() => ['Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction', 'Mystery', 'Educational'], []);

  const featuredBooks = useMemo(() => [
    { image: Novel1, title: 'A Little History Economics', description: 'A brief description of A Little History Economics.' },
    { image: Novel2, title: 'Bad days in History', description: 'A brief description of Bad days in History.' },
    { image: Novel3, title: 'Black code', description: 'A brief description of Black code.' }
  ], []);

  const authors = useMemo(() => [
    { name: 'Colson Whitehead', img: Author3 },
    { name: 'Carol Roh Spaulding', img: Author2 },
    { name: 'Barnes & Noble Press Author', img: Author1 }
  ], []);


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
      </header>

      <div className='flex-grow'>
        <ImageSlider />

        <section className='flex flex-col md:flex-row items-center my-12 px-4'>
        <img 
            src='https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
            srcSet='https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=320&h=240&dpr=1 320w, https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=480&h=360&dpr=1 480w, https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1 800w'
            sizes='(max-width: 320px) 280px, (max-width: 480px) 440px, 800px'
            className='w-full md:w-1/3 rounded' 
            alt='Library' 
            loading="lazy" 
          />
          <div className='mt-4 md:mt-0 md:ml-8 text-justify'>
            <h2 className='text-2xl font-bold'>About Us</h2>
            <p className='mt-4 text-gray-700'>
              Welcome to BookHub, your go-to website for exploring and downloading books of various genres for both kids and adults. Our platform is designed to cater to every reader's taste, offering a wide array of books from timeless classics to contemporary bestsellers. Whether you're a parent looking for engaging stories to spark your child's imagination or an avid reader seeking the next great novel, BookHub has something for everyone.
              <br></br>
              <br></br>
              Our user-friendly interface makes it easy to navigate through our extensive collection. With just a few clicks, you can discover new authors, uncover hidden gems, and find books tailored to your interests. Our advanced recommendation system ensures that you receive personalized book suggestions based on your reading history and preferences, making your literary journey both enjoyable and effortless.
              <br></br>
              <br></br>
              At BookHub, we believe in the power of reading to educate, entertain, and inspire. That's why we've created a platform that not only offers a diverse selection of books but also provides various resources such as user reviews, author spotlights, and interactive features to enhance your reading experience. Join our community of book lovers today and dive into the world of reading with ease and excitement.
            </p>
          </div>
        </section>


        <section className='my-12'>
          <h2 className='text-2xl md:text-3xl font-semibold text-center mb-6'>Book Categories</h2>
          <div className='flex flex-wrap justify-center'>
            {categories.map((category) => (
              <button key={category} className='m-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300'>
                {category}
              </button>
            ))}
          </div>
        </section>


        <section className='my-12'>
          <h2 className='text-2xl font-bold text-center mb-8'>Featured Books</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4'>
            {featuredBooks.map((book, index) => (
              <BookCard key={index} image={book.image} title={book.title} description={book.description} />
            ))}
          </div>
        </section>


        <section className='my-12 px-4'>
          <h2 className='text-2xl font-bold text-center mb-8'>Downloadable Books</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              { title: 'More More Time', image: Novel13 },
              { title: 'Quantative Cat', image: Novel14 },
              { title: 'The stone Of Time', image: Novel15 }
            ].map((book, index) => (
              <div key={index} className='bg-white rounded-lg shadow-md overflow-hidden'>
                <img className='h-96 w-full object-contain' src={book.image} alt={book.title} />
                <div className='p-4'>
                  <h3 className='text-xl font-semibold mb-2'>{book.title}</h3>
                  <p className='text-gray-700 text-justify'>A brief description of {book.title}.</p>
                  <button className='mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300'>Download</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='my-12 px-4'>
          <h2 className='text-2xl font-bold text-center mb-8'>User Reviews</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              'An absolutely fantastic collection of books! The recommendations were spot on and I found several new favorites.',
              'The user interface is so easy to navigate. I love being able to find and download books so effortlessly.',
              'BookHub is my go-to site for discovering new reads. The variety and quality of books available is simply amazing.'
            ].map((review, index) => (
              <div key={index} className='bg-white rounded-lg shadow-md overflow-hidden p-4'>
                <p className='text-gray-700 text-justify'>"{review}" - User {index + 1}</p>
              </div>
            ))}
          </div>
        </section>

        <section className='my-12 px-4'>
          <h2 className='text-2xl font-bold text-center mb-8'>Author Spotlights</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4'>
            {authors.map((author, index) => (
              <AuthorCard key={index} img={author.img} name={author.name} />
            ))}
          </div>
        </section>

        <section className='my-12 px-4'>
          <h2 className='text-2xl font-bold text-center mb-8'>Newsletter Subscription</h2>
          <div className='flex justify-center'>
            <input type='email' placeholder='Enter your email' className='px-4 py-2 border border-gray-300 rounded-l-md' />
            <button className='px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors duration-300'>Subscribe</button>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}






