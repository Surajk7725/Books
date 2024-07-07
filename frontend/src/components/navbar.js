import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, BookOpenIcon, ClipboardCheckIcon, PencilIcon, MailIcon, UserCircleIcon, CogIcon, QuestionMarkCircleIcon, LogoutIcon, StarIcon } from '@heroicons/react/outline'; // Import required icons

export default function NavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [booksDropdownOpen, setBooksDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle

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
                    <div className="relative">
                        <button
                            onClick={() => setBooksDropdownOpen(!booksDropdownOpen)}
                            className="flex items-center text-white-700 hover:text-gray-300 transition duration-300 ease-in-out"
                        >
                            <span className="flex items-center">
                                <BookOpenIcon className="h-5 w-5" /> 
                                <span className="ml-2">Books</span>
                            </span>
                            <ChevronDownIcon className="h-4 w-4 ml-1" />
                        </button>
                        {booksDropdownOpen && (
                            <div className="absolute z-10 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                <Link to="/books/kids" className="block px-4 py-2 hover:bg-gray-100"> Kids</Link>
                                <Link to="/books/popular" className="block px-4 py-2 hover:bg-gray-100">Popular</Link>
                                <Link to="/books/recommendations" className="block px-4 py-2 hover:bg-gray-100">Recommendations</Link>
                            </div>
                        )}
                    </div>
                    <Link to="#" className="text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out"><span className="flex items-center">
                        <ClipboardCheckIcon className="h-5 w-5" /> Queries</span>
                    </Link>
                    <Link to="#" className="text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out"><span className="flex items-center">
                        <PencilIcon className="h-5 w-5" /> Write A Note</span>
                    </Link>
                    <Link to="/contactus" className="text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out"><span className="flex items-center">
                        <MailIcon className="h-5 w-5" /> Contact Us</span>
                    </Link>
                </div>

                {/* Profile dropdown */}
                <div className="relative flex items-center">
                    <button id="notification-bell" className="text-gray-500 hover:text-gray-700 focus:outline-none ml-6">
                        <span className="text-2xl">🔔</span>
                    </button>
                    <Link to="#" className="text-white-700 hover:text-gray-300 transition duration-300 ease-in-out text-2xl ml-6">+</Link>
                    <div className="relative ml-6">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center text-black hover:text-gray-300 transition duration-300 ease-in-out"
                            id="user-menu-button"
                            aria-expanded={dropdownOpen}
                            aria-haspopup="true"
                        >
                            <img
                                src="https://wallpapers.com/images/hd/yuuichi-katagiri-anime-portrait-5xl430n009kmsg7l.jpg"
                                alt="Profile"
                                className="h-8 w-8 rounded-full"
                            />
                            <ChevronDownIcon className="h-4 w-4 ml-1" />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute z-10 mt-2 w-48 bg-white text-black rounded-md shadow-lg right-0">
                                <Link to="/profile" className="block px-4 py-2 flex items-center hover:bg-gray-100">
                                    <UserCircleIcon className="h-5 w-5 mr-2" /> My Profile
                                </Link>
                                <Link to="/wishlist" className="block px-4 py-2 flex items-center hover:bg-gray-100">
                                    <StarIcon className="h-5 w-5 mr-2" /> My Wishlist
                                </Link>
                                <Link to="/notes" className="block px-4 py-2 flex items-center hover:bg-gray-100">
                                    <PencilIcon className="h-5 w-5 mr-2" /> My Notes
                                </Link>
                                <Link to="/settings" className="block px-4 py-2 flex items-center hover:bg-gray-100">
                                    <CogIcon className="h-5 w-5 mr-2" /> Settings
                                </Link>
                                <Link to="/help-center" className="block px-4 py-2 flex items-center hover:bg-gray-100">
                                    <QuestionMarkCircleIcon className="h-5 w-5 mr-2" /> Help
                                </Link>
                                <Link to="/" className="block px-4 py-2 flex items-center hover:bg-gray-100">
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
                    <div className="relative">
                        <button
                            onClick={() => setBooksDropdownOpen(!booksDropdownOpen)}
                            className="block py-2 bg-white flex items-center text-white-700 hover:text-gray-300 transition duration-300 ease-in-out"
                        >
                            <span className="flex items-center">
                                <BookOpenIcon className="h-5 w-5" /> 
                                <span className="ml-2">Books</span>
                            </span>
                            <ChevronDownIcon className="h-4 w-4 ml-1" />
                        </button>
                        {booksDropdownOpen && (
                            <div className="absolute left-0 mt-2 w-full bg-white text-black rounded-md shadow-lg">
                                <Link to="/books/kids" className="block px-4 py-2 hover:bg-gray-100">Kids</Link>
                                <Link to="/books/popular" className="block px-4 py-2 hover:bg-gray-100">Popular</Link>
                                <Link to="/books/recommendations" className="block px-4 py-2 hover:bg-gray-100">Recommendations</Link>
                            </div>
                        )}
                    </div>
                    <Link to="#" className="block py-2 bg-white text-black hover:text-gray-300"><span className="flex items-center">
                        <ClipboardCheckIcon className="h-5 w-5" /> Queries</span>
                    </Link>
                    <Link to="#" className="block py-2 bg-white text-black hover:text-gray-300"><span className="flex items-center">
                        <PencilIcon className="h-5 w-5" /> Write A Note</span>
                    </Link>
                    <Link to="/contactus" className="block py-2 bg-white text-black hover:text-gray-300"><span className="flex items-center">
                        <MailIcon className="h-5 w-5" /> Contact Us</span>
                    </Link>
                </div>
            )}
        </div>
    );
}


