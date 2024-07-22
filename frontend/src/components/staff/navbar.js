import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, BookOpenIcon, PencilIcon, MailIcon, UserCircleIcon, CogIcon, QuestionMarkCircleIcon, LogoutIcon, UserIcon} from '@heroicons/react/outline'; // Import required icons

export default function NavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [booksDropdownOpen, setBooksDropdownOpen] = useState(false);
    const [usersDropdownOpen, setUsersDropdownOpen] = useState(false);
    const [novelsDropdownOpen, setNovelsDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle
    const [displayDropdownOpen, setDisplayDropdownOpen] = useState(false);


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
                                            <Link to="/staff-allbooks/kids" className="block px-4 py-2 hover:bg-gray-100">Kids</Link>
                                            <Link to="/staff-allbooks/popular" className="block px-4 py-2 hover:bg-gray-100">Popular</Link>
                                            <Link to="/staff-allbooks/academics" className="block px-4 py-2 hover:bg-gray-100">Academics</Link>
                                        </div>
                                    )}
                                </div>
                            </div>

                        )}
                    </div>

                    <span className="flex items-center">
                        <UserIcon className="h-5 w-5" /> Users </span>

                    <div className="relative mt-1.5">
                        <button
                            onClick={() => setUsersDropdownOpen(!usersDropdownOpen)}
                            className="flex items-center text-white-700 hover:text-gray-300 transition duration-300 ease-in-out"
                        >
                            <ChevronDownIcon className="h-4 w-4 ml-[-1rem]" />
                        </button>
                        {usersDropdownOpen && (
                            <div className="absolute z-10 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                <Link to="/manageuser-data" className="block px-4 py-2 hover:bg-gray-100">Manage User</Link>
                                <Link to="/userbooks-data" className="block px-4 py-2 hover:bg-gray-100">User Books</Link>
                            </div>
                        )}
                    </div>

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

                    <Link to="/contactus" className="text-gray-700 hover:text-gray-300 transition duration-300 ease-in-out"><span className="flex items-center">
                        <MailIcon className="h-5 w-5" /> Contact Us</span>
                    </Link>
                </div>

                {/* Profile dropdown */}
                <div className="relative flex items-center">
                    
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
                                <Link to="/staff-profile" className="px-4 py-2 flex items-center hover:bg-gray-100">
                                    <UserCircleIcon className="h-5 w-5 mr-2" /> My Profile
                                </Link>
                                <Link to="/staff-settings" className="px-4 py-2 flex items-center hover:bg-gray-100">
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
                                            <Link to="/staff-allbooks/kids" className="block px-4 py-2 hover:bg-gray-100">Kids</Link>
                                            <Link to="/staff-allbooks/popular" className="block px-4 py-2 hover:bg-gray-100">Popular</Link>
                                            <Link to="/staff-allbooks/academics" className="block px-4 py-2 hover:bg-gray-100">Academics</Link>
                                        </div>
                                    )}
                                </div>
                            </div>

                        )}
                    </div>
                    <Link to="#" className="block py-2 bg-white text-black hover:text-gray-300"><span className="flex items-center">
                        <UserIcon className="h-5 w-5" /> Manage Users</span>
                    </Link>
                    <Link to="/staff-writeinfo" className="block py-2 bg-white text-black hover:text-gray-300"><span className="flex items-center">
                        <PencilIcon className="h-5 w-5" /> Written Notes</span>
                    </Link>
                    <Link to="/contactus" className="block py-2 bg-white text-black hover:text-gray-300"><span className="flex items-center">
                        <MailIcon className="h-5 w-5" /> Contact Us</span>
                    </Link>
                </div>
            )}
        </div>
    );
}


