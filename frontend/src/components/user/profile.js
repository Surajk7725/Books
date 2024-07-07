import React from 'react';
import NavBar from '../navbar';
import Footer from '../footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faInstagram, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';

const Profile = () => {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-white-800 flex items-start p-8">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 bg-gray-700 rounded-full overflow-hidden">
              <img src="https://via.placeholder.com/100" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white">Leroy Jenkins</h2>
              <p className="text-gray-400">Full-stack developer</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faDiscord} className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
