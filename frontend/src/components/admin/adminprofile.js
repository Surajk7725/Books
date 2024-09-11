import React, { useState, useEffect } from 'react';
import { Tooltip, Breadcrumb } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import axiosInstance from '../axiosInstance';

const ProfilePage = () => {
  const { username } = useParams();
  const [profileImage, setProfileImage] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [socialMediaLinks, setSocialMediaLinks] = useState({
      instagram: '',
      twitter: '',
      youtube: '',
      linkedin: '',
  });

  useEffect(() => {
      const fetchAdminData = async () => {
          try {
              const response = await axiosInstance.get(`/admin/display/${username}`);
              const adminData = response.data;

              const baseURL = process.env.REACT_APP_API_URL;
              const profilePicURL = adminData.profilePic ? `${baseURL}${adminData.profilePic.replace('\\', '/')}` : '';

              setProfileImage(profilePicURL);
              setEmail(adminData.email);
              setPhone(adminData.phoneNumber);
              setFullName(adminData.fullName);
              setRole(adminData.role);

              // Ensure socialMediaLinks is an object before setting it
              setSocialMediaLinks({
                  instagram: adminData.socialMediaLinks?.instagram || '',
                  twitter: adminData.socialMediaLinks?.twitter || '',
                  youtube: adminData.socialMediaLinks?.youtube || '',
                  linkedin: adminData.socialMediaLinks?.linkedin || '',
              });
          } catch (error) {
              console.error('Error fetching admin data:', error);
          }
      };

      fetchAdminData();
  }, [username]);

  return (
      <div className="justify-center items-center min-h-screen mb-2 ml-2 mt-4 md:ml-10">
          <div className="text-start -mt-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
                  <h1 className="text-2xl font-bold text-gray-800 ml-4 mb-4 md:mb-0">Profile</h1>
                  <Breadcrumb>
                      <Breadcrumb.Item><Link to="/admin/home">Dashboard</Link></Breadcrumb.Item>
                      <Breadcrumb.Item>Profile</Breadcrumb.Item>
                  </Breadcrumb>
              </div>
          </div>

          <div className="max-w-5xl mx-auto bg-white shadow-lg overflow-hidden min-h-[200px]">
              <div className="flex flex-col items-center justify-center py-10">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-black shadow-lg transform transition-transform duration-500 hover:scale-105">
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <h1 className="mt-4 text-2xl font-bold text-black">{fullName}</h1>
                  <p className="text-gray-700 bg-yellow-200 px-4 py-2 rounded-lg shadow-lg font-semibold inline-block transform transition-transform duration-500 hover:scale-105 mt-2">
                      {role}
                  </p>
              </div>

              {/* Contact Section */}
              <div className="p-4 text-center">
                  <div className="flex justify-center space-x-6">
                      <Tooltip title={email}>
                          <button className="flex items-center space-x-2 bg-blue-500 text-white px-5 py-2 rounded-full transform transition-transform duration-500 hover:scale-105">
                              <FaEnvelope />
                              <span>Email Us</span>
                          </button>
                      </Tooltip>
                      <Tooltip title={phone}>
                          <button className="flex items-center space-x-2 bg-green-500 text-white px-5 py-2 rounded-full transform transition-transform duration-500 hover:scale-105">
                              <FaPhone />
                              <span>Call Us</span>
                          </button>
                      </Tooltip>
                  </div>
              </div>

              {/* Social Media Section */}
              <div className="p-4 text-center">
                  <h2 className="font-bold text-gray-700 mb-4">Follow me on</h2>
                  <div className="flex justify-center space-x-5">
                      <a href={socialMediaLinks.youtube || '#'} target="_blank" rel="noreferrer" className="text-red-600 transform transition-transform duration-500 hover:scale-110">
                          <FaYoutube size={28} />
                      </a>
                      <a href={socialMediaLinks.instagram || '#'} target="_blank" rel="noreferrer" className="text-pink-600 transform transition-transform duration-500 hover:scale-110">
                          <FaInstagram size={28} />
                      </a>
                      <a href={socialMediaLinks.twitter || '#'} target="_blank" rel="noreferrer" className="text-blue-600 transform transition-transform duration-500 hover:scale-110">
                          <FaTwitter size={28} />
                      </a>
                      <a href={socialMediaLinks.linkedin || '#'} target="_blank" rel="noreferrer" className="text-blue-700 transform transition-transform duration-500 hover:scale-110">
                          <FaLinkedin size={28} />
                      </a>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default ProfilePage;

