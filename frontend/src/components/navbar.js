import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Notifications from './user/notification';
import { Dropdown } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useAuth } from './authcontext';
import { ChevronDownIcon, BookOpenIcon, PencilIcon, MailIcon, UserCircleIcon, CogIcon, QuestionMarkCircleIcon, LogoutIcon, StarIcon } from '@heroicons/react/outline';

export default function NavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [booksDropdownOpen, setBooksDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle
    const [username, setUsername] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            setUsername(user.username);
        }
    }, [user]);

    const menu = (
        <div className="max-h-48">
            <Notifications />
        </div>
    );

    // Construct the image URL
    const baseURL = process.env.REACT_APP_API_URL;
    const profilePicURL = user.profilePic ? `${baseURL}${user.profilePic.replace('\\', '/')}` : '';

    return (
        <div className="bg-transparent-800 text-black rounded-lg shadow-md">
            <nav className="container mx-auto flex justify-between items-center py-4 px-6">
                <div className="text-2xl font-bold">
                    <Link to="/home" className="hover:text-gray-300">BookHub</Link>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-white-700 hover:text-gray-300 transition duration-300 ease-in-out focus:outline-none"
                    >
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
                        </svg>
                    </button>
                </div>

                {/* Desktop navigation */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/display-books" className="text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out">
                        <span className="flex items-center">
                            <BookOpenIcon className="h-5 w-5" /> Books
                        </span>
                    </Link>

                    <div className="relative mt-1.5">
                        <button
                            onClick={() => setBooksDropdownOpen(!booksDropdownOpen)}
                            className="flex items-center text-white-700 hover:text-gray-300 transition duration-300 ease-in-out"
                        >
                            <ChevronDownIcon className="h-4 w-4 ml-[-1rem]" />
                        </button>
                        {booksDropdownOpen && (
                            <div className="absolute z-10 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                <Link to="/display-books/Kids" className="block px-4 py-2 hover:bg-gray-100"> Kids</Link>
                                <Link to="/display-books/Popular" className="block px-4 py-2 hover:bg-gray-100">Popular</Link>
                                <Link to="/display-books/Academics" className="block px-4 py-2 hover:bg-gray-100">Academics</Link>
                            </div>
                        )}
                    </div>

                    <Link to="/write-book" className="text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out">
                        <span className="flex items-center">
                            <PencilIcon className="h-5 w-5" /> Write A Note
                        </span>
                    </Link>
                    <Link to="/contactus" className="text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out">
                        <span className="flex items-center">
                            <MailIcon className="h-5 w-5" /> Contact Us
                        </span>
                    </Link>
                </div>

                {/* Profile dropdown */}
                <div className="relative flex items-center">
                    <Dropdown overlay={menu} trigger={['click']}>
                        <BellOutlined className="text-2xl cursor-pointer" />
                    </Dropdown>
                    <Link to="/user-addbook" className="text-white-700 hover:text-gray-300 transition duration-300 ease-in-out text-2xl ml-6">+</Link>
                    <div className="relative ml-6">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center text-black hover:text-gray-300 transition duration-300 ease-in-out"
                            id="user-menu-button"
                            aria-expanded={dropdownOpen}
                            aria-haspopup="true"
                        >
                            <img
                                src={profilePicURL}
                                alt="Profile"
                                className="h-10 w-10 rounded-full border-2 border-gray-300 object-cover"
                            />
                            <ChevronDownIcon className="h-4 w-4 ml-1" />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute z-10 mt-2 w-48 bg-white text-black rounded-md shadow-lg right-0">
                                <Link to={`/profile/${username}`} className="px-4 py-2 flex items-center hover:bg-gray-100">
                                    <UserCircleIcon className="h-5 w-5 mr-2" /> My Profile
                                </Link>
                                <Link to="/my-wishlist" className="px-4 py-2 flex items-center hover:bg-gray-100">
                                    <StarIcon className="h-5 w-5 mr-2" /> My Wishlist
                                </Link>
                                <Link to="/private-notes" className="px-4 py-2 flex items-center hover:bg-gray-100">
                                    <PencilIcon className="h-5 w-5 mr-2" /> My Notes
                                </Link>
                                <Link to="/settings" className="px-4 py-2 flex items-center hover:bg-gray-100">
                                    <CogIcon className="h-5 w-5 mr-2" /> Settings
                                </Link>
                                <Link to="/help-center" className="px-4 py-2 flex items-center hover:bg-gray-100">
                                    <QuestionMarkCircleIcon className="h-5 w-5 mr-2" /> Help
                                </Link>
                                <Link to="/" className="px-4 py-2 flex items-center hover:bg-gray-100">
                                    <LogoutIcon className="h-5 w-5 mr-2" /> Logout
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-transparent-800 text-black py-2 px-4">
                    <Link to="/display-books" className="text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out">
                        <span className="flex items-center">
                            <BookOpenIcon className="h-5 w-5" /> Books
                        </span>
                    </Link>
                    <div className="relative mt-1.5">
                        <button
                            onClick={() => setBooksDropdownOpen(!booksDropdownOpen)}
                            className="bg-white flex items-center text-white-700 hover:text-gray-300 transition duration-300 ease-in-out"
                        >
                            <ChevronDownIcon className="h-4 w-4 ml-16 mt-[-2rem]" />
                        </button>
                        {booksDropdownOpen && (
                            <div className="absolute left-0 mt-2 w-full bg-white text-black rounded-md shadow-lg">
                                <Link to="/display-books/Kids" className="block px-4 py-2 hover:bg-gray-100">Kids</Link>
                                <Link to="/display-books/Popular" className="block px-4 py-2 hover:bg-gray-100">Popular</Link>
                                <Link to="/display-books/Academics" className="block px-4 py-2 hover:bg-gray-100">Academics</Link>
                            </div>
                        )}
                    </div>
                    <Link to="/write-book" className="block py-2 bg-white text-black hover:text-gray-300">
                        <span className="flex items-center">
                            <PencilIcon className="h-5 w-5" /> Write A Note
                        </span>
                    </Link>
                    <Link to="/contactus" className="block py-2 bg-white text-black hover:text-gray-300">
                        <span className="flex items-center">
                            <MailIcon className="h-5 w-5" /> Contact Us
                        </span>
                    </Link>
                </div>
            )}
        </div>
    );
}


