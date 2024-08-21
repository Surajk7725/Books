import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../navbar';
import Footer from './footer';
import axiosInstance from '../axiosInstance'; 

const ContactUs = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/contact/issues', {
        fullName,
        phoneNumber,
        email,
        message,
      });
      toast.success('Issue submitted successfully!');
      setFullName('');
      setPhoneNumber('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit the form. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Contact Information */}
          <div>
            {/* Phone */}
            <div className="mb-8">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-primary-500 p-3 shadow-lg">
                      📞
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Phone</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Contact us via phone for immediate assistance with any inquiries or issues you may have.
                  </p>
                  <p className="mt-2 text-base font-semibold text-gray-900">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
            
            {/* Email */}
            <div className="mb-8">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-primary-500 p-3 shadow-lg">
                      ✉️
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Email</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Prefer to send us an email? We'll respond promptly to address your questions or concerns.
                  </p>
                  <p className="mt-2 text-base font-semibold text-gray-900">support@example.com</p>
                </div>
              </div>
            </div>
            
            {/* Online Form */}
            <div className="mb-8">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-primary-500 p-3 shadow-lg">
                      📝
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Online Form</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Fill out our online form, and a member of our support team will get back to you as soon as possible.
                  </p>
                  <Link to="/contactus" className="mt-2 inline-flex items-center text-base font-semibold text-primary-600 hover:text-primary-500" target="_blank">
                    Submit a Request
                    <svg aria-hidden="true" className="ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path clipRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" fillRule="evenodd"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side: Send us a message */}
          <div className="bg-white h-max shadow-lg mt-8 rounded-lg p-4 lg:p-6">
            <h2 className="text-2xl font-extrabold text-gray-900 text-center">Send us a message</h2>
            <form className="mt-8 grid grid-cols-1 gap-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="name">Full Name
                <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    autoComplete="name"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-2 border-gray-300 rounded-md"
                    id="name"
                    name="name"
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="phoneNumber">Phone Number
                <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    autoComplete="tel"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-2 border-gray-300 rounded-md"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email address
                <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    autoComplete="email"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-2 border-gray-300 rounded-md"
                    id="email"
                    name="email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="message">Message
                <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-2 border-gray-300 rounded-md"
                    id="message"
                    name="message"
                    required
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form> 
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
