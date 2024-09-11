import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Notification from './notification';
import { Dropdown } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useAuth } from '../authcontext';
import { ChevronDownIcon, BookOpenIcon, PencilIcon, MailIcon, UserCircleIcon, CogIcon, QuestionMarkCircleIcon, LogoutIcon, UserIcon } from '@heroicons/react/outline';

export default function NavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [booksDropdownOpen, setBooksDropdownOpen] = useState(false);
    const [usersDropdownOpen, setUsersDropdownOpen] = useState(false);
    const [novelsDropdownOpen, setNovelsDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle
    const [displayDropdownOpen, setDisplayDropdownOpen] = useState(false);
    const [username, setUsername] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            setUsername(user.username);
        }
    }, [user]);

    // Construct the image URL
    const baseURL = process.env.REACT_APP_API_URL;
    const profilePicURL = user.profilePic ? `${baseURL}${user.profilePic.replace('\\', '/')}` : '';


    const menu = (
        <div className="max-h-48">
            <Notification />
        </div>
    );

    return (
        <div className="bg-transparent-800 text-black rounded-lg shadow-md">
            <nav className="container mx-auto flex justify-between items-center py-4 px-6">
                <div className="text-2xl font-bold">
                    <Link to="/staff-home" className="hover:text-gray-300">BookHub</Link>
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

                    <span className="flex items-center">
                        <BookOpenIcon className="h-5 w-5" /> Books</span>


                    <div className="relative mt-1.5">
                        <button
                            onClick={() => setBooksDropdownOpen(!booksDropdownOpen)}
                            className="flex items-center text-white-700 hover:text-gray-300 transition duration-300 ease-in-out"
                        >
                            <ChevronDownIcon className="h-4 w-4 ml-[-1rem]" />
                        </button>
                        {booksDropdownOpen && (
                            <div className="absolute z-10 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                <Link to="/staff-addbook" className="block px-4 py-2 hover:bg-gray-100">Add a book</Link>
                                <div className="relative">
                                    <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                                        <Link to="/staff-allbooks" className="flex-grow">Display Books</Link>
                                        <ChevronDownIcon
                                            className="h-4 w-4 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDisplayDropdownOpen(!displayDropdownOpen);
                                            }}
                                        />
                                    </div>
                                    {displayDropdownOpen && (
                                        <div className="absolute left-full top-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                            <Link to="/staff-allbooks/Kids" className="block px-4 py-2 hover:bg-gray-100">Kids</Link>
                                            <Link to="/staff-allbooks/Popular" className="block px-4 py-2 hover:bg-gray-100">Popular</Link>
                                            <Link to="/staff-allbooks/Academics" className="block px-4 py-2 hover:bg-gray-100">Academics</Link>
                                        </div>
                                    )}
                                </div>
                                <Link to="/staff-bookreview" className="block px-4 py-2 hover:bg-gray-100">Book Review</Link>
                            </div>


                        )}

                    </div>

                    <Link to="/userbooks-data" className="text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out"><span className="flex items-center">
                        <UserIcon className="h-5 w-5" />Users</span>
                    </Link>

                    <span className="flex items-center">
                        <PencilIcon className="h-5 w-5" /> Novels </span>

                    <div className="relative mt-1.5">
                        <button
                            onClick={() => setNovelsDropdownOpen(!novelsDropdownOpen)}
                            className="flex items-center text-white-700 hover:text-gray-300 transition duration-300 ease-in-out"
                        >
                            <ChevronDownIcon className="h-4 w-4 ml-[-1rem]" />
                        </button>
                        {novelsDropdownOpen && (
                            <div className="absolute z-10 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                <Link to="/staff-writeinfo" className="block px-4 py-2 hover:bg-gray-100"> Written Novels</Link>
                                <Link to="/novel-data" className="block px-4 py-2 hover:bg-gray-100">Novel Data</Link>
                            </div>
                        )}
                    </div>

                    <Link to="/staff-contact" className="text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out"><span className="flex items-center">
                        <MailIcon className="h-5 w-5" /> Contact Us</span>
                    </Link>
                </div>

                {/* Profile dropdown */}
                <div className="relative flex items-center">
                    <Dropdown overlay={menu} trigger={['click']}>
                        <BellOutlined className="text-2xl cursor-pointer" />
                    </Dropdown>
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
                                <Link to={`/staff-profile/${username}`} className="px-4 py-2 flex items-center hover:bg-gray-100">
                                    <UserCircleIcon className="h-5 w-5 mr-2" /> My Profile
                                </Link>
                                <Link to="/staff-settings" className="px-4 py-2 flex items-center hover:bg-gray-100">
                                    <CogIcon className="h-5 w-5 mr-2" /> Settings
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

                    <span className="flex items-center">
                        <BookOpenIcon className="h-5 w-5" /> Books</span>


                    <div className="relative mt-1.5">
                        <button
                            onClick={() => setBooksDropdownOpen(!booksDropdownOpen)}
                            className="flex items-center text-white-700 hover:text-gray-300 transition duration-300 ease-in-out"
                        >
                            <ChevronDownIcon className="h-4 w-4 ml-16 mt-[-2rem]" />
                        </button>
                        {booksDropdownOpen && (
                            <div className="absolute z-10 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                <Link to="/staff-addbook" className="block px-4 py-2 hover:bg-gray-100">Add a book</Link>
                                <div className="relative">
                                    <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                                        <Link to="/staff-allbooks" className="flex-grow">Display Books</Link>
                                        <ChevronDownIcon
                                            className="h-4 w-4 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDisplayDropdownOpen(!displayDropdownOpen);
                                            }}
                                        />
                                    </div>
                                    {displayDropdownOpen && (
                                        <div className="absolute left-full top-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                            <Link to="/staff-allbooks/Kids" className="block px-4 py-2 hover:bg-gray-100">Kids</Link>
                                            <Link to="/staff-allbooks/Popular" className="block px-4 py-2 hover:bg-gray-100">Popular</Link>
                                            <Link to="/staff-allbooks/Academics" className="block px-4 py-2 hover:bg-gray-100">Academics</Link>
                                        </div>
                                    )}
                                </div>
                                <Link to="/staff-bookreview" className="block px-4 py-2 hover:bg-gray-100">Book Review</Link>
                            </div>

                        )}

                    </div>

                    <Link to="/userbooks-data" className="block py-2 bg-white text-black hover:text-gray-300"><span className="flex items-center">
                        <UserIcon className="h-5 w-5" />Users</span>
                    </Link>

                    <span className="flex items-center">
                        <PencilIcon className="h-5 w-5" /> Novels </span>

                    <div className="relative mt-1.5">
                        <button
                            onClick={() => setNovelsDropdownOpen(!novelsDropdownOpen)}
                            className="flex items-center text-white-700 hover:text-gray-300 transition duration-300 ease-in-out"
                        >
                            <ChevronDownIcon className="h-4 w-4 ml-16 mt-[-2rem]" />
                        </button>
                        {novelsDropdownOpen && (
                            <div className="absolute z-10 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                <Link to="/staff-writeinfo" className="block px-4 py-2 hover:bg-gray-100"> Written Novels</Link>
                                <Link to="/novel-data" className="block px-4 py-2 hover:bg-gray-100">Novel Data</Link>
                            </div>
                        )}
                    </div>


                    <Link to="/staff-contact" className="block py-2 bg-white text-black hover:text-gray-300"><span className="flex items-center">
                        <MailIcon className="h-5 w-5" /> Contact Us</span>
                    </Link>
                </div>
            )}
        </div>
    );
}


