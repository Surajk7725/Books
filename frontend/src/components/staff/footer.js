import React from 'react';

function Footer() {
  return (
    <div className="relative">
      <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 border-t border-gray-600 pt-10">
          {/* Logo and Tagline */}
          <div>
            <h2 className="text-lg font-bold">BookHub</h2>
            <p className="mt-2 text-gray-400">Your gateway to a world of books</p>
          </div>
          {/* Navigation Links */}
          <div className="border border-gray-700 p-4 rounded-lg">
            <h3 className="text-md font-semibold">Navigation</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/staff-home" className="hover:text-gray-400 transition-colors duration-200 hover:bg-gray-200 text-base rounded-lg py-1 px-2 block shadow-md">Home</a>
              </li>
              <li>
                <a href="/staff-allbooks" className="hover:text-gray-400 transition-colors duration-200 hover:bg-gray-200 text-base rounded-lg py-1 px-2 block shadow-md">Books</a>
              </li>
              <li>
                <a href="/staff-contact" className="hover:text-gray-400 transition-colors duration-200 hover:bg-gray-200 text-base rounded-lg py-1 px-2 block shadow-md">Contact Us</a>
              </li>
            </ul>
          </div>
          {/* Popular Categories */}
          <div className="border border-gray-700 p-4 rounded-lg">
            <h3 className="text-md font-semibold">Popular Categories</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/staff-allbooks/kids" className="hover:text-gray-400 transition-colors duration-200 hover:bg-gray-200 text-base rounded-lg py-1 px-2 block shadow-md">Kids</a>
              </li>
              <li>
                <a href="/staff-allbooks/popular" className="hover:text-gray-400 transition-colors duration-200 hover:bg-gray-200 text-base rounded-lg py-1 px-2 block shadow-md">Popular</a>
              </li>
              <li>
                <a href="/staff-allbooks/academics" className="hover:text-gray-400 transition-colors duration-200 hover:bg-gray-200 text-base rounded-lg py-1 px-2 block shadow-md">Academics</a>
              </li>
            </ul>
          </div>
          {/* Contact Information */}
          <div className="border border-gray-700 p-4 rounded-lg">
            <h3 className="text-md font-semibold">Contact Us</h3>
            <ul className="mt-2 space-y-2">
              <li className="text-gray-400">Address: KLEF, Vaddeswaram</li>
              <li className="text-gray-400">Phone: (+91) 8530527876</li>
              <li className="text-gray-400">Email: info@bookhub.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm border-t border-gray-600 pt-4">
          &copy; {new Date().getFullYear()} BookHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Footer;
