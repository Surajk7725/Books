import React from 'react';
import NavBar from '../navbar';
import Footer from '../footer';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import {MailIcon,PhoneIcon, LocationMarkerIcon, UserIcon }   from '@heroicons/react/outline';

const ProfileCard = () => {
  return (
    <div>
      <NavBar />
        <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
          {/* Main Col */}
          <div
            id="profile"
            className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
          >
            <div className="p-4 md:p-12 text-center lg:text-left">
              {/* Image for mobile view */}
              <div
                className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://wallpapers.com/images/hd/yuuichi-katagiri-anime-portrait-5xl430n009kmsg7l.jpg')",
                }}
              ></div>
              <h1 className="text-3xl font-bold pt-8 lg:pt-0">Yuuichi Katagiri</h1>
              <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
              
              {/* User Details */}
              <div className="flex flex-col space-y-2 justify-start mt-4">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5 text-gray-500" />
                  <span>@devil</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MailIcon className="h-5 w-5 text-gray-500" />
                  <a href="mailto:yuuichi.katagiri@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-2">
                    <span>yuuichi.katagiri@gmail.com</span>
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="h-5 w-5 text-gray-500" />
                  <span>8790896990</span>
                </div>
                <div className="flex items-center space-x-2">
                  <LocationMarkerIcon className="h-5 w-5 text-gray-500" />
                  <span>Patel Street, Gandhi Nagar, Hyderabad-522017</span>
                </div>
              </div>

              <div className="pt-12 pb-8">
                <Link to="/settings" className="bg-blue-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                  Update Profile
                </Link>
              </div>

              <div className="flex items-center mt-6 text-gray-500">
                <FaTwitter className="hover:text-gray-800 mr-2 md:mr-4" />
                <FaLinkedin className="hover:text-gray-800 mx-4 md:mx-6" />
                <FaInstagram className="hover:text-gray-800 mx-4 md:mx-6" />
                <FaYoutube className="hover:text-gray-800 ml-4 md:ml-6" />
              </div>



            </div>
          </div>

          {/* Image Col */}
          <div className="w-full lg:w-2/5">
            <img
              src="https://wallpapers.com/images/hd/yuuichi-katagiri-anime-portrait-5xl430n009kmsg7l.jpg"
              className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
              alt="Your Name"
            />
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default ProfileCard;









