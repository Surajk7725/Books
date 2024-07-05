// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function NavBar() {
//     const [dropdownOpen, setDropdownOpen] = useState(false);

//     return (
//         <div className="bg-transparent-800 text-black rounded-lg shadow-md">
//             <nav className=" w-full flex justify-between items-center py-4 px-6 pl-4 pr-12 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
//                 <div className="text-2xl font-bold">
//                     <Link to="/home" className="hover:text-gray-300">Tome</Link>
//                 </div>
//                 <div className="hidden md:flex space-x-6">
//                     <Link to="#" className="text-white-700 hover:text-gray-300 transition duration-300 ease-in-out">Display Books</Link>
//                     <Link to="#" className="text-white-700 hover:text-gray-300 transition duration-300 ease-in-out">Queries</Link>
//                     <Link to="#" className="text-white-700 hover:text-gray-300 transition duration-300 ease-in-out">Write A Note</Link>
//                     <Link to="/contactus" className="text-white-700 hover:text-gray-300 transition duration-300 ease-in-out">Contact Us</Link>
//                 </div>

//                 <div className="relative">
//                     <div className="flex items-center">
//                         <button id="notification-bell" className="text-gray-500 hover:text-gray-700 focus:outline-none">
//                             <span className="text-2xl">🔔</span>
//                         </button>
//                         <Link to="#" className="text-white-700 hover:text-gray-300 transition duration-300 ease-in-out text-2xl ml-1">+</Link>
//                         <div className="relative ml-3">
//                             <button
//                                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                                 className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                                 id="user-menu-button"
//                                 aria-expanded={dropdownOpen}
//                                 aria-haspopup="true"
//                             >
//                             <img
//                                 src="https://wallpapers.com/images/hd/yuuichi-katagiri-anime-portrait-5xl430n009kmsg7l.jpg"
//                                 alt="Profile"
//                                 className="h-8 w-8 rounded-full"
//                             />
//                             </button>
//                 {dropdownOpen && (
//                     <div className="absolute right-0 z-10 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
//                         <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</a>
//                         <a href="/wishlist" className="block px-4 py-2 hover:bg-gray-100">My Wishlist</a>
//                         <a href="/wishlist" className="block px-4 py-2 hover:bg-gray-100">My Notes</a>
//                         <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
//                         <a href="/help-center" className="block px-4 py-2 hover:bg-gray-100">Help</a>
//                         <a href="/" className="block px-4 py-2 hover:bg-gray-100">Logout</a>
//                     </div>
//                  )}
//         </div>
//     </div>
// </div>
//             </nav>
//             <div className="absolute top-12 left-0 w-full h-8 bg-gradient-to-b from-gray-100 to-transparent z-0"></div>
//         </div>
//     );
// }


import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [booksDropdownOpen, setBooksDropdownOpen] = useState(false);

    return (
        <div className="bg-transparent-800 text-black rounded-lg shadow-md">
            <nav className="w-full flex justify-between items-center py-4 px-6 pl-4 pr-12 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <div className="text-2xl font-bold">
                    <Link to="/home" className="hover:text-gray-300">Tome</Link>
                </div>
                <div className="hidden md:flex space-x-6">
                    <div className="relative">
                        <button
                            onClick={() => setBooksDropdownOpen(!booksDropdownOpen)}
                            className="text-white-700 hover:text-gray-300 transition duration-300 ease-in-out"
                        >
                            Books
                        </button>
                        {booksDropdownOpen && (
                            <div className="absolute z-10 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                <Link to="/books/kids" className="block px-4 py-2 hover:bg-gray-100">Kids</Link>
                                <Link to="/books/popular" className="block px-4 py-2 hover:bg-gray-100">Popular</Link>
                                <Link to="/books/recommendations" className="block px-4 py-2 hover:bg-gray-100">Recommendations</Link>
                            </div>
                        )}
                    </div>
                    <Link to="#" className="text-white-700 hover:text-gray-300 transition duration-300 ease-in-out">Queries</Link>
                    <Link to="#" className="text-white-700 hover:text-gray-300 transition duration-300 ease-in-out">Write A Note</Link>
                    <Link to="/contactus" className="text-white-700 hover:text-gray-300 transition duration-300 ease-in-out">Contact Us</Link>
                </div>

                <div className="relative">
                    <div className="flex items-center">
                        <button id="notification-bell" className="text-gray-500 hover:text-gray-700 focus:outline-none">
                            <span className="text-2xl">🔔</span>
                        </button>
                        <Link to="#" className="text-white-700 hover:text-gray-300 transition duration-300 ease-in-out text-2xl ml-1">+</Link>
                        <div className="relative ml-3">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                id="user-menu-button"
                                aria-expanded={dropdownOpen}
                                aria-haspopup="true"
                            >
                                <img
                                    src="https://wallpapers.com/images/hd/yuuichi-katagiri-anime-portrait-5xl430n009kmsg7l.jpg"
                                    alt="Profile"
                                    className="h-8 w-8 rounded-full"
                                />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 z-10 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                                    <Link to="/wishlist" className="block px-4 py-2 hover:bg-gray-100">My Wishlist</Link>
                                    <Link to="/notes" className="block px-4 py-2 hover:bg-gray-100">My Notes</Link>
                                    <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                                    <Link to="/help-center" className="block px-4 py-2 hover:bg-gray-100">Help</Link>
                                    <Link to="/" className="block px-4 py-2 hover:bg-gray-100">Logout</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <div className="absolute top-12 left-0 w-full h-8 bg-gradient-to-b from-gray-100 to-transparent z-0"></div>
        </div>
    );
}

