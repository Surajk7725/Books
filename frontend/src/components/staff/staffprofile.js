import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../staff/navbar';
import Footer from './footer';


const Staff_Profile = () => {
    const [showFullInfo, setShowFullInfo] = useState(false);
    const navigate = useNavigate();

    const toggleFullInfo = () => {
        setShowFullInfo(!showFullInfo);
    };

    const handleUpdateProfile = () => {
        // Add logic to update profile here
        navigate('/staff-settings');

    };



    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <div className="w-full text-white bg-main-color">
                <NavBar />
            </div>
            <div className="container mx-auto my-5 p-5 flex-grow">
                <div className="md:flex no-wrap md:-mx-2">
                    {/* Left Side */}
                    <div className="w-full md:w-3/12 md:mx-2">
                        {/* Profile Card */}
                        <div className="bg-white p-3 border-t-4 border-green-400">
                            <div className="image overflow-hidden">
                                <img className="h-auto w-full mx-auto"
                                    src="https://wallpapers.com/images/hd/yuuichi-katagiri-anime-portrait-5xl430n009kmsg7l.jpg"
                                    alt="Jane Doe" />
                            </div>
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">Jane Doe</h1>
                           
                            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Status</span>
                                    <span className="ml-auto">
                                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span>
                                    </span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Member since</span>
                                    <span className="ml-auto">Nov 07, 2016</span>
                                </li>
                            </ul>
                        </div>
                        <div className="my-4"></div>
                    </div>


                    {/* Right Side */}
                    <div className="w-full md:w-9/12 mt-18 h-auto mx-auto ">
                        <div className="bg-white p-3 shadow-sm rounded-sm border-t-4 border-green-400">
                       
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <span className="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <span className="tracking-wide">About</span>
                            </div>
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-2 text-sm">
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Full Name</div>
                                        <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">Jane Doe</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Date of Birth</div>
                                        <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">Feb 06, 1998</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Contact Information (Email)</div>
                                        <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">
                                            <a className="text-blue-800" href="mailto:jane@example.com">jane@example.com</a>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Contact Information (Phone)</div>
                                        <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">+11 998001001</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Address</div>
                                        <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">Beech Creek, PA, Pennsylvania</div>
                                    </div>
                                    {showFullInfo && (
                                        <>
                                            {/* Professional Details */}
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Job Title</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">Librarian</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Start Date</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">March 15, 2020</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Employee ID</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">LIB12345</div>
                                            </div>

                                            {/* Qualifications and Education */}
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Highest Education Level</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">Master's in Library Science</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Degrees or Certifications</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">Certified Librarian</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Professional Affiliations</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">ALA Member</div>
                                            </div>

                                            {/* Work Experience */}
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Previous Position</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">Library Assistant</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Years of Experience in Libraries</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">5 years</div>
                                            </div>

                                            {/* Skills and Competencies */}
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Languages Spoken</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">English, Spanish</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Computer Skills</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">MS Office, Library Management Software</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <br>

                            </br>
                            <button
                                onClick={toggleFullInfo}
                                className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                                {showFullInfo ? 'Hide Full Information' : 'Show Full Information'}
                            </button>
                            <button
                                onClick={handleUpdateProfile}
                                className="block mx-auto bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline focus:bg-blue-700 hover:shadow-xs p-3 my-4">

                                Update Profile
                            </button>
                        </div>
                    </div>


                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Staff_Profile;
