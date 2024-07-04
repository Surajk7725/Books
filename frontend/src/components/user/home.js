import React from 'react'
import NavBar from '../navbar';

function Home() {
  return (
    <div>
      <NavBar />
      <div class="flex flex-col md:flex-row items-center justify-center bg-white p-8">
        <div class="md:w-1/2 p-4">
          <img src="https://img.freepik.com/free-photo/beautiful-landscape-from-magazine-coming-life_23-2151158527.jpg?t=st=1720095328~exp=1720098928~hmac=d39a12d00a25b61b0d1e7ec64d422ac5bb74c071623aeb271a0520bd80b36eeb&w=740" alt="A group of diverse professionals smiling and working together in a modern office setting, showcasing teamwork, collaboration, and a positive work environment" width="400" height="400" class="rounded-lg object-cover" />
        </div>
        <div class="md:w-1/2 p-4">
          <h2 class="text-3xl font-bold text-secondary mb-4">About Our Company</h2>
          <p class="text-lg text-gray-700 leading-relaxed">We are a team of passionate professionals dedicated to providing innovative solutions that drive success for our clients. With years of experience and a commitment to excellence, we strive to create a positive impact through our work. Our diverse team brings a wealth of knowledge and expertise to every project, ensuring that we deliver tailored solutions that meet your unique needs.</p>
        </div>
      </div>
        <h2 class="text-3xl font-bold text-black-800 mb-8 text-center">Features</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="p-4">
                <img alt="A logo featuring an open book with a green leaf, symbolizing knowledge and growth through reading" class="w-16 h-16 object-cover rounded-full mx-auto mb-4" src="https://placehold.co/100x100" />
                <h3 class="text-xl font-semibold text-gray-800 mb-2 text-center">Book Explorer</h3>
                <p class="text-gray-600">Discover a world of knowledge with our comprehensive library management system. Browse, borrow, and explore a vast collection of books tailored to your interests.</p>
              </div>
            </div>
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="p-4">
                <img alt="A logo featuring a stack of books with a magnifying glass, representing the ability to search and find specific titles" class="w-16 h-16 object-cover rounded-full mx-auto mb-4" src="https://placehold.co/100x100" />
                <h3 class="text-xl font-semibold text-gray-800 mb-2 text-center">BookFinder</h3>
                <p class="text-gray-600">Effortlessly navigate our extensive library catalog with our powerful search and filtering tools. Find the perfect book for your reading journey.</p>
              </div>
            </div>
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="p-4">
                <img alt="A logo featuring a book with a heart, symbolizing the love and passion for reading" class="w-16 h-16 object-cover rounded-full mx-auto mb-4" src="https://placehold.co/100x100" />
                <h3 class="text-xl font-semibold text-gray-800 mb-2 text-center">BookLove</h3>
                <p class="text-gray-600">Indulge in your love for literature with our user-friendly library management system. Easily track your reading progress and discover new literary gems.</p>
              </div>
            </div>
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="p-4">
                <img alt="A logo featuring an open book with a globe, representing the vast and diverse collection of books from around the world" class="w-16 h-16 object-cover rounded-full mx-auto mb-4" src="https://placehold.co/100x100" />
                <h3 class="text-xl font-semibold text-gray-800 mb-2 text-center">WorldOfBooks</h3>
                <p class="text-gray-600">Embark on a literary journey across cultures and continents with our globally-inspired library management system. Explore a diverse collection of books from around the world.</p>
              </div>
            </div>
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-4">
              <img alt="A logo featuring a book with a clock, symbolizing the ability to manage and track book loans and due dates" class="w-16 h-16 object-cover rounded-full mx-auto mb-4" src="https://placehold.co/100x100" />
              <h3 class="text-xl font-semibold text-gray-800 mb-2 text-center">BookKeeper</h3>
              <p class="text-gray-600">Stay organized and on top of your reading with our efficient library management system. Easily manage book loans, renewals, and due dates.</p>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-4">
              <img alt="A logo featuring a book with a star, representing the ability to rate and review books" class="w-16 h-16 object-cover rounded-full mx-auto mb-4" src="https://placehold.co/100x100" />
              <h3 class="text-xl font-semibold text-gray-800 mb-2 text-center">BookRatings</h3>
              <p class="text-gray-600">Share your thoughts and discover new literary gems with our interactive library management system. Rate, review, and recommend books to fellow readers.</p>
            </div>
          </div>
      </div>

    <div class="h-16"></div>
      <footer class="bg-gray-800 py-4">
        <div class="container mx-auto text-center">
          <p class="text-white">&copy; Designed by Tome 2024</p>
        </div>
      </footer>    
    </div>
  )
}

export default Home