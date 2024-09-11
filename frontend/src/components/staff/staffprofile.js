import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../staff/navbar';
import Footer from './footer';
import axiosInstance from '../axiosInstance';

const Staff_Profile = () => {
    const [showFullInfo, setShowFullInfo] = useState(false);
    const [user, setUser] = useState({});
    const [socialLinks, setSocialLinks] = useState({});
    const [error, setError] = useState('');
    const { username } = useParams();
    const navigate = useNavigate();

    const toggleFullInfo = () => {
        setShowFullInfo(!showFullInfo);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get(`/staff/display/${username}`);
                setUser(response.data);

                // Parse the social media links JSON string
                if (response.data.socialMediaLinks) {
                    setSocialLinks(JSON.parse(response.data.socialMediaLinks));
                }
            } catch (err) {
                setError('Profile not found');
            }
        };

        fetchProfile();
    }, [username]);

    // Construct the image URL
    const baseURL = process.env.REACT_APP_API_URL;
    const profilePicURL = user.profilePic ? `${baseURL}${user.profilePic.replace('\\', '/')}` : '';

    const handleUpdateProfile = () => {
        navigate('/staff-settings');
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <div className="w-full text-white bg-main-color">
                <NavBar />
            </div>
            <div className="container mx-auto my-5 p-5 flex-grow">
                <div className="md:flex no-wrap md:-mx-2">
                    <div className="w-full md:w-3/12 md:mx-2">
                        <div className="bg-white p-3 border-t-4 border-green-400">
                            <div className="image overflow-hidden">
                                <img className="h-auto w-full mx-auto"
                                    src={profilePicURL || "https://wallpapers.com/images/hd/yuuichi-katagiri-anime-portrait-5xl430n009kmsg7l.jpg"}
                                    alt={user.fullName || "Profile Picture"} />
                            </div>
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{user.fullName || "Jane Doe"}</h1>

                            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Status</span>
                                    <span className="ml-auto">
                                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span>
                                    </span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Member since</span>
                                    <span className="ml-auto">{user.createdAt ? new Date(user.createdAt).toDateString() : "N/A"}</span>
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
                                        <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">{user.fullName || "N/A"}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Date of Birth</div>
                                        <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">{user.dob || "N/A"}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Email</div>
                                        <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">
                                            <a className="text-blue-800" href={`mailto:${user.email}`}>{user.email || "N/A"}</a>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Phone Number</div>
                                        <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">{user.phoneNumber || "N/A"}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Address</div>
                                        <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">{user.address || "N/A"}</div>
                                    </div>
                                    {showFullInfo && (
                                        <>
                                            {/* Professional Details */}
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Job Title</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">{user.professionalDetails?.jobTitle || "N/A"}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Employee ID</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">{user.professionalDetails?.employeeId || "N/A"}</div>
                                            </div>

                                            {/* Qualifications and Education */}
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Highest Education Level</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">{user.qualifications?.highestEducation || "N/A"}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Degrees or Certifications</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">{user.qualifications?.degrees || "N/A"}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Professional Affiliations</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">{user.qualifications?.professionalAffiliations || "N/A"}</div>
                                            </div>

                                            {/* Work Experience */}
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Previous Position</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">{user.workExperience?.previousPosition || "N/A"}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Years of Experience in Libraries</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">{user.workExperience?.yearsExperience || "N/A"}</div>
                                            </div>

                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Languages Spoken</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">
                                                    {user.skills?.languagesSpoken?.length ? user.skills.languagesSpoken.join(', ') : "N/A"}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Computer Skills</div>
                                                <div className="px-4 py-2 border border-transparent border-r-4 border-l-4 border-gray-300 rounded-md">
                                                    {user.skills?.computerSkills?.length ? user.skills.computerSkills.join(', ') : "N/A"}
                                                </div>
                                            </div>

                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    className="mt-4 py-2 px-4 bg-blue-500 text-white font-bold rounded"
                                    onClick={toggleFullInfo}
                                >
                                    {showFullInfo ? 'Show Less' : 'Show More'}
                                </button>
                                <button
                                    className="mt-4 py-2 px-4 bg-green-500 text-white font-bold rounded"
                                    onClick={handleUpdateProfile}
                                >
                                    Update Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Staff_Profile;
