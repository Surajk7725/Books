import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slide4 from './images/slide4.jpg';
import Slide5 from './images/slide5.jpg';
import Slide6 from './images/slide6.jpg';
import Slide7 from './images/slide7.jpg';
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
          <img src='https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='w-full md:w-1/3 rounded' alt='Library' />
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
            {[
              {
                image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0',
                title: 'The Secret Garden'
              },
              {
                image: 'https://images.unsplash.com/photo-1544717305-2782549b5136',
                title: 'The Hobbit'
              },
              {
                image: 'https://images.unsplash.com/photo-1544716278-e513176f20b5',
                title: 'War and Peace'
              },
              {
                image: 'https://www.prestwickhouse.com/Image%20Library/Blog/thumbnail/Brave-New-World_HTT_Blogs.jpg',
                title: 'Brave New World'
              },
              {
                image: 'https://images.squarespace-cdn.com/content/v1/56688a6e841abadb3a87fb8c/1549982235927-ETAK5MSQC2LGELEGTUB8/little-women-book-cover-louisa-may-alcott.png',
                title: 'Little Women'
              },
              {
                image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765',
                title: 'The Odyssey'
              }
            ].map((book, index) => (
              <div key={index} className='bg-white rounded-lg shadow-md overflow-hidden'>
                <img className='h-96 w-full object-cover' src={book.image} alt={book.title} />
                <div className='p-4'>
                  <h3 className='text-xl font-semibold mb-2'>{book.title}</h3>
                  <p className='text-gray-700 text-justify'>A brief description of {book.title}.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='my-12 px-4'>
          <h2 className='text-2xl font-bold text-center mb-8'>Recommended Books</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
                title: 'The Mysterious Island'
              },
              {
                image: 'https://ntvb.tmsimg.com/assets/p24408887_b_h8_ad.jpg?w=1280&h=720',
                title: 'Journey to the Center of the Earth'
              },
              {
                image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/hostedimages/1493112918i/22583221._SX540_.jpg',
                title: 'Twenty Thousand Leagues Under the Sea'
              },
              {
                image: 'https://www.hollywoodreporter.com/wp-content/uploads/2021/12/ATWIED-Tennant-Still-PBS-Publicity-H-2021.jpg?w=1296',
                title: 'Around the World in Eighty Days'
              },
              {
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZJ1Cd6GDfp3V5-w5mawA4JzWh4KuIDx_KA&s',
                title: 'The Invisible Man'
              },
              {
                image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
                title: 'The Time Machine'
              }
            ].map((book, index) => (
              <div key={index} className='bg-white rounded-lg shadow-md overflow-hidden'>
                <img className='h-96 w-full object-cover' src={book.image} alt={book.title} />
                <div className='p-4'>
                  <h3 className='text-xl font-semibold mb-2'>{book.title}</h3>
                  <p className='text-gray-700 text-justify'>A brief description of {book.title}.</p>
                </div>
              </div>
            ))}
          </div>
        </section>


        <section className='my-12 px-4'>
          <h2 className='text-2xl font-bold text-center mb-8'>Downloadable Books</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              { title: 'Downloadable Book 1', image: 'https://images-na.ssl-images-amazon.com/images/I/81ZS4+QhiCL._AC_UL600_SR600,600_.jpg' },
              { title: 'Downloadable Book 2', image: 'https://m.media-amazon.com/images/I/717uhZ0DdrL._AC_UF1000,1000_QL80_.jpg' },
              { title: 'Downloadable Book 3', image: 'https://gyaanstore.com/cdn/shop/files/241_e1cb3088-cecb-4bf4-9d5c-8c7439d9730f.png?v=1701690945&width=1445' }
            ].map((book, index) => (
              <div key={index} className='bg-white rounded-lg shadow-md overflow-hidden'>
                <img className='h-96 w-full object-cover' src={book.image} alt={book.title} />
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
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              { name: 'Colson Whitehead', img: 'https://www.plainfieldlibrary.net/wp-content/uploads/2023/07/AS-Colson-Whitehead.png' },
              { name: 'Carol Roh Spaulding', img: 'https://images.squarespace-cdn.com/content/v1/5a81dadde9bfdff9a97b0da7/5912d271-0775-4318-ba4c-9173280bb707/Carol+Roh+Spaulding+author+spotlight.png' },
              { name: 'Barnes & Noble Press Author', img: 'https://press.barnesandnoble.com/bnpress-blog/wp-content/nas-uploads/2024/01/Blog-Header-1-9-632x362.png' }
            ].map((author, index) => (
              <div key={index} className='bg-white rounded-lg shadow-md overflow-hidden'>
                <img className='h-48 w-full object-cover' src={author.img} alt={author.name} />
                <div className='p-4'>
                  <h3 className='text-xl font-semibold mb-2'>{author.name}</h3>
                  <p className='text-gray-700 text-justify'>A brief bio of {author.name}.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='my-12 px-4'>
          <h2 className='text-2xl font-bold text-center mb-8'>Blog</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                img: 'https://thewildernesshaven.com/cdn/shop/articles/7.png?v=1688129872',
                title: 'Exploring the Great Outdoors'
              },
              {
                img: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
                title: 'The Art of Minimalism'
              },
              {
                img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
                title: 'Culinary Adventures'
              },
              {
                img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
                title: 'The World of Technology'
              },
              {
                img: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963',
                title: 'Urban Jungle'
              },
              {
                img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
                title: 'Travel Diaries'
              }
            ].map((post, index) => (
              <div key={index} className='bg-white rounded-lg shadow-md overflow-hidden'>
                <img className='h-48 w-full object-cover' src={post.img} alt={post.title} />
                <div className='p-4'>
                  <h3 className='text-xl font-semibold mb-2'>{post.title}</h3>
                  <p className='text-gray-700 text-justify'>A brief description of {post.title}.</p>
                </div>
              </div>
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


