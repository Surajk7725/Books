import React, { useState, useEffect } from 'react';
import NavBar from '../navbar';
import Footer from './footer';
import Icon1 from '../images/Books-icon.png';
import Icon2 from '../images/Magnifier-icon.png';
import Icon3 from '../images/Rating-icon.png';
import Icon4 from '../images/Reading-icon.png';
import Icon5 from '../images/Literacy-icon.png';
import Icon6 from '../images/Global-icon.png';
import Novel16 from '../images/The Book of Doing and Being.jpg';
import Novel17 from '../images/The compound Effect.jpg';
import Novel18 from '../images/The MiddleMan Economy.jpg';
import Novel19 from '../images/The One Thing.jpg';
import Novel20 from '../images/The personal MBA.jpg';
import Novel21 from '../images/The Phychology Of Money.jpg';
import Novel22 from '../images/The Prosperity Paradox.jpg';
import Novel23 from '../images/The Secret Manual.jpg';
import Novel24 from '../images/Think Like Da Vinci.jpg';
import Novel1 from '../images/A Little History Economics.jpg';
import Novel2 from '../images/Bad days in History.jpg';
import Novel3 from '../images/Black code.jpg';
import Novel4 from '../images/Book Mock UP.jpg';
import Novel5 from '../images/Boys Beasts & Men.jpg';
import Novel6 from '../images/Burning Of Books.jpg';
import Novel7 from '../images/Elon Musk.jpg';
import Novel8 from '../images/Excutive Impact And Influence.jpg';
import Novel9 from '../images/How they Got into harverd.jpg';
import Novel10 from '../images/Lawyers as Leaders.jpg';
import Novel11 from '../images/Learn To think In Systems.jpg';
import Novel12 from '../images/Market Mind Games.jpg';
import Novel13 from '../images/More More Time.jpg';



function Discounts() {
  // Sample data for Best Sellers, Recommended Reads, and Author Spotlight
  const bestSellers = [
    {
      title: "Best Seller Title 1",
      author: "Author Name 1",
     
      imageUrl: Novel21
    },
    {
      title: "Best Seller Title 1",
      author: "Author Name 1",
     
      imageUrl: Novel22
    },
    {
      title: "Best Seller Title 1",
      author: "Author Name 1",
     
      imageUrl: Novel23
    },
    {
      title: "Best Seller Title 1",
      author: "Author Name 1",
     
      imageUrl: Novel24
    },
    // Add more books as needed
  ];

  const recommendedReads = [
    {
      title: "Recommended Read Title 1",
      author: "Author Name 1",
     
      imageUrl: Novel1
    },
    {
      title: "Recommended Read Title 1",
      author: "Author Name 1",
      
      imageUrl: Novel2
    },
    {
      title: "Recommended Read Title 1",
      author: "Author Name 1",
      
      imageUrl: Novel3
    },
    {
      title: "Recommended Read Title 1",
      author: "Author Name 1",
      
      imageUrl: Novel6
    },
    // Add more recommended reads as needed
  ];

  const authorSpotlight = {
    name: "Jane Doe",
    bio: "Jane Doe is a prolific writer known for her insightful narratives and compelling storytelling. Explore her collection of books and discover new perspectives on various themes.",
    books: [
      {
        title: "Book Title by Jane Doe",
        
        imageUrl: Novel5
      },
      {
        title: "Book Title by Jane Doe",
       
        imageUrl: Novel4
      },
      {
        title: "Book Title by Jane Doe",
       
        imageUrl: Novel7
      },
      {
        title: "Book Title by Jane Doe",
       
        imageUrl: Novel8
      },

      // Add more books by Jane Doe as needed
    ]

  };

  return (
    <div>
      <section className="py-16 text-center">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold">Client Testimonials</h2>
          <div className="mt-8 flex justify-center">
            <div className="max-w-lg">
              <p className="italic">“When you use 25 words or less to explain a Mark Lages book, I would think most people would react by saying ‘why would I want to read about something like that?’...”</p>
              <p className="mt-4 text-gray-700">- Lilly Deo, Client</p>
            </div>
            <div className="max-w-lg mx-4">
              <p className="italic">“Mark Lages's books are surprisingly engrossing and thought-provoking, even in their brevity.”</p>
              <p className="mt-4 text-gray-700">- John Smith, Reader</p>
            </div>
            <div className="max-w-lg">
              <p className="italic">“Reading a Mark Lages book is like taking a quick dip into the unexpected and finding it delightful.”</p>
              <p className="mt-4 text-gray-700">- Jane Doe, Fan</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Amazing  Books</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">Save big on your favorite books at Amazon's book sale. Explore our collection of discounted titles across various genres.</p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    📚
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Fiction</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Immerse yourself in captivating stories and imaginative worlds with our discounted fiction books.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    📘
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Non-Fiction</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Expand your knowledge with our discounted non-fiction books on various topics like history, science, and more.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    📕
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Classics</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Discover timeless literary masterpieces at unbeatable prices in our classics collection.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    📗
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Children's Books</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Nurture your child's love for reading with our discounted children's books, perfect for all ages.
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-900">Featured Deals</h3>
            <div className="mt-4 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {/* First Featured Deal */}
              <div className="relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src= {Novel9}
                    alt="A hardcover book with a colorful abstract design on the cover, featuring swirls of blue, green, and yellow colors, giving it a vibrant and eye-catching appearance."
                    className="w-full h-full object-contain lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        The Art of Mindfulness
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Sarah Williams</p>
                  </div>
                  
                </div>
              </div>

              {/* Second Featured Deal */}
              <div className="relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src= {Novel10}
                    alt="Another book description"
                    className="w-full h-full object-contain lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        Book Title 2
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Author Name 2</p>
                  </div>
                 
                </div>
              </div>

              {/* Third Featured Deal */}
              <div className="relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src= {Novel11}
                    alt="Another book description"
                    className="w-full h-full object-contain lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        Book Title 3
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Author Name 3</p>
                  </div>
                 
                </div>
              </div>

              {/* Fourth Featured Deal */}
              <div className="relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src= {Novel12}
                    alt="Another book description"
                    className="w-full h-full object-contain lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        Book Title 4
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Author Name 4</p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>


          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-900">Best Sellers</h3>
            <div className="mt-4 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {bestSellers.map((book, index) => (
                <div key={index} className="relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img src={book.imageUrl} alt={book.title} className="w-full h-full object-contain  lg:w-full lg:h-full" />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>                                       
                      <h3 className="text-sm text-gray-700">
                        <a href="#">
                          <span aria-hidden="true" className="absolute inset-0"></span>
                          {book.title}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{book.author}</p>
                    </div>
                
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-900">Recommended Reads</h3>
            <div className="mt-4 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {recommendedReads.map((book, index) => (
                <div key={index} className="relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img src={book.imageUrl} alt={book.title} className="w-full h-full object-contain lg:w-full lg:h-full" />
                  </div>
                  <div className="mt-4 flex justify-between">   
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href="#">
                          <span aria-hidden="true" className="absolute inset-0"></span>
                          {book.title}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{book.author}</p>
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-900">Author Spotlight: {authorSpotlight.name}</h3>
            <p className="mt-2 text-gray-600">{authorSpotlight.bio}</p>
            <div className="mt-4 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {authorSpotlight.books.map((book, index) => (
                <div key={index} className="relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img src={book.imageUrl} alt={book.title} className="w-full h-full object-contain lg:w-full lg:h-full" />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href="#">
                          <span aria-hidden="true" className="absolute inset-0"></span>
                          {book.title}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{authorSpotlight.name}</p>
                    </div>
                   
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>

  );
}
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
              <img alt="Book Explorer logo" className="w-16 h-16 object-cover rounded-full mx-auto mb-4" src= {Icon1} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Book Explorer</h3>
              <p className="text-gray-600">Discover a world of knowledge with our comprehensive library management system. Browse, borrow, and explore a vast collection of books tailored to your interests.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <img alt="BookFinder logo" className="w-16 h-16 object-cover rounded-full mx-auto mb-4" src={Icon2} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">BookFinder</h3>
              <p className="text-gray-600">Effortlessly navigate our extensive library catalog with our powerful search and filtering tools. Find the perfect book for your reading journey.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <img alt="Literary Escapes logo" className="w-16 h-16 object-cover rounded-full mx-auto mb-4" src={Icon5}/>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Literary Escapes</h3>
              <p className="text-gray-600">Immerse yourself in the world of literature with our intuitive library management system. Track your reading journey effortlessly and uncover captivating literary treasures.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <img alt="Global Reads logo" className="w-16 h-16 object-cover rounded-full mx-auto mb-4" src={Icon6} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Global Reads</h3>
              <p className="text-gray-600">Embark on a voyage through the realms of storytelling with our richly diverse library collection. Explore narratives that span continents, cultures, and centuries.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <img alt="Reading Organizer logo" className="w-16 h-16 object-cover rounded-full mx-auto mb-4" src={Icon4} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Reading Organizer</h3>
              <p className="text-gray-600">Streamline your reading experience with our efficient library management tools. From managing loans to tracking due dates, stay organized and focused on your literary adventures.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <img alt="BookRatings logo" className="w-16 h-16 object-cover rounded-full mx-auto mb-4" src={Icon3}/>
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
            <img  alt="Book 1" className="h-80" src= {Novel16}/>
            <img  alt="Book 2" className="h-80" src= {Novel17} />
            <img  alt="Book 3" className="h-80" src= {Novel18} />
            <img  alt="Book 4" className="h-80" src= {Novel19} />
            <img  alt="Book 5" className="h-80" src= {Novel20} />
            <img  alt="Book 6" className="h-80" src= {Novel21}/>
          </div>
        </section>
      </div>

      <Discounts />









      <Footer />
    </div>
  );
}

export default Home;
