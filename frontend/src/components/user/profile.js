import React, { useState, useEffect } from 'react';
import NavBar from '../navbar';
import Footer from './footer';
import { Link, useParams } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MailIcon, PhoneIcon, LocationMarkerIcon, UserIcon } from '@heroicons/react/outline';
import axiosInstance from '../axiosInstance';

const Profile = () => {
  const [user, setUser] = useState({});
  const [socialLinks, setSocialLinks] = useState({});
  const [error, setError] = useState('');
  const { username } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(`/user/display/${username}`);
        setUser(response.data);

        if (response.data.socialMediaLinks) {
          const links = typeof response.data.socialMediaLinks === 'string'
            ? JSON.parse(response.data.socialMediaLinks)
            : response.data.socialMediaLinks;
          setSocialLinks(links);
        }
      } catch (err) {
        setError('Profile not found');
      }
    };

    fetchProfile();
  }, [username]);

  const baseURL = process.env.REACT_APP_API_URL;
  const profilePicURL = user.profilePic ? `${baseURL}${user.profilePic.replace('\\', '/')}` : '';

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
            {/* Image for mobile view (hidden on mobile) */}
            <div
              className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
              style={{
                backgroundImage: `url('${profilePicURL}')`,
              }}
            ></div>
            <h1 className="text-3xl font-bold pt-8 lg:pt-0">
              <Link to={`/profile/${user.username}`} className="hover:text-blue-600">
                {user.fullName}
              </Link>
            </h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            
            {/* User Details */}
            <div className="flex flex-col space-y-2 justify-start mt-4">
              <div className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5 text-gray-500" />
                <span>
                  <Link to={`/profile/${user.username}`} target="_blank" className="hover:text-blue-600">
                    {user.username}
                  </Link>
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <MailIcon className="h-5 w-5 text-gray-500" />
                <a href={`mailto:${user.email}`} className="text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-2">
                  <span>{user.email}</span>
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-5 w-5 text-gray-500" />
                <span>{user.phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <LocationMarkerIcon className="h-5 w-5 text-gray-500" />
                <span>{user.address}</span>
              </div>
            </div>

            <div className="pt-12 pb-8">
              <Link to="/settings" className="bg-blue-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                Update Profile
              </Link>
            </div>

            <div className="flex items-center mt-6 text-gray-500">
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="hover:text-blue-400 mr-2 md:mr-4 h-6 w-6" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="hover:text-blue-700 mx-4 md:mx-6 h-6 w-6" />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="hover:text-pink-600 mx-4 md:mx-6 h-6 w-6" />
                </a>
              )}
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                  <FaYoutube className="hover:text-red-600 ml-4 md:ml-6 h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Image Col (hidden on mobile) */}
        <div className="hidden lg:flex w-full lg:w-2/5 justify-center items-center">
          <div className="relative w-80 h-80 lg:w-96 lg:h-96">
            <img
              src={profilePicURL}
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-2xl"
              alt={user.fullName}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

