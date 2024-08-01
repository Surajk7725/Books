import React, { useState, useRef } from 'react';
import NavBar from './navbar';
import Footer from './footer';
import { FaSearch } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ManageUsers = () => {
    const [users] = useState([
        {
            name: 'Alice',
            profileImage: "https://wallpapers.com/images/hd/yuuichi-katagiri-anime-portrait-5xl430n009kmsg7l.jpg",
            readBooks: [
                { title: 'The Great Gatsby', image: 'https://images.gr-assets.com/books/1553383690l/2657.jpg' },
                { title: '1984', image: 'https://images.gr-assets.com/books/1348990566l/5470.jpg' },
                { title: 'To Kill a Mockingbird', image: 'https://images.gr-assets.com/books/1553383690l/2657.jpg' }
            ],
            wishlistedBooks: [
                { title: 'Brave New World', image: 'https://example.com/brave-new-world.jpg' },
                { title: 'The Catcher in the Rye', image: 'https://example.com/the-catcher-in-the-rye.jpg' },
                { title: 'Oshi Na Ko', image: 'https://example.com/oshi-na-ko.jpg' }
            ],
            downloadedBooks: [
                { title: 'Moby Dick', image: 'https://example.com/moby-dick.jpg' },
                { title: 'War and Peace', image: 'https://example.com/war-and-peace.jpg' },
                { title: 'The Great Gatsby', image: 'https://example.com/the-great-gatsby.jpg' }
            ],
            mostViewedBooks: [
                { title: 'Views', count: 20 },
                { title: 'Bookmarked', count: 8 },
                { title: 'Downloaded', count: 6 }
            ]
        },
        {
            name: 'Bob',
            profileImage: "https://i.pinimg.com/originals/84/d3/fa/84d3fa68414aecbc3172909302cb5144.jpg",
            readBooks: [
                { title: 'The Alchemist', image: 'https://example.com/the-alchemist.jpg' },
                { title: 'The Hobbit', image: 'https://example.com/the-hobbit.jpg' },
                { title: 'Harry Potter', image: 'https://example.com/harry-potter.jpg' }
            ],
            wishlistedBooks: [
                { title: 'Lord of the Flies', image: 'https://example.com/lord-of-the-flies.jpg' },
                { title: 'Fahrenheit 451', image: 'https://example.com/fahrenheit-451.jpg' },
                { title: 'Classroom of the Elite', image: 'https://example.com/classroom-of-the-elite.jpg' }
            ],
            downloadedBooks: [
                { title: 'The Hobbit', image: 'https://example.com/the-hobbit.jpg' },
                { title: 'Harry Potter', image: 'https://example.com/harry-potter.jpg' },
                { title: 'The Alchemist', image: 'https://example.com/the-alchemist.jpg' }
            ],
            mostViewedBooks: [
                { title: 'Views', count: 20 },
                { title: 'Bookmarked', count: 8 },
                { title: 'Downloaded', count: 6 }
            ]
        },
        {
            name: 'Candy',
            profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAY01TtWi9l6URxA-WDznkuJniUzUqxlf9gw&s",
            readBooks: [
                { title: 'Pride and Prejudice', image: 'https://example.com/pride-and-prejudice.jpg' },
                { title: 'Jane Eyre', image: 'https://example.com/jane-eyre.jpg' },
                { title: 'Wuthering Heights', image: 'https://example.com/wuthering-heights.jpg' }
            ],
            wishlistedBooks: [
                { title: 'Great Expectations', image: 'https://example.com/great-expectations.jpg' },
                { title: 'Little Women', image: 'https://example.com/little-women.jpg' },
                { title: 'Tomodachi Game', image: 'https://example.com/tomodachi-game.jpg' }
            ],
            downloadedBooks: [
                { title: 'Jane Eyre', image: 'https://example.com/jane-eyre.jpg' },
                { title: 'Wuthering Heights', image: 'https://example.com/wuthering-heights.jpg' },
                { title: 'Pride and Prejudice', image: 'https://example.com/pride-and-prejudice.jpg' }
            ],
            mostViewedBooks: [
                { title: 'Views', count: 20 },
                { title: 'Bookmarked', count: 8 },
                { title: 'Downloaded', count: 6 }
            ]
        },
        {
            name: 'David',
            profileImage: "https://i.pinimg.com/736x/b3/ec/2c/b3ec2c350eafdab61055934f47f05b02.jpg",
            readBooks: [
                { title: 'Moby Dick', image: 'https://example.com/moby-dick.jpg' },
                { title: 'The Odyssey', image: 'https://example.com/the-odyssey.jpg' },
                { title: 'Hamlet', image: 'https://example.com/hamlet.jpg' }
            ],
            wishlistedBooks: [
                { title: 'The Iliad', image: 'https://example.com/the-iliad.jpg' },
                { title: 'Macbeth', image: 'https://example.com/macbeth.jpg' },
                { title: 'Code Geass', image: 'https://example.com/code-geass.jpg' }
            ],
            downloadedBooks: [
                { title: 'Moby Dick', image: 'https://example.com/moby-dick.jpg' },
                { title: 'Hamlet', image: 'https://example.com/hamlet.jpg' },
                { title: 'The Odyssey', image: 'https://example.com/the-odyssey.jpg' }
            ],
            mostViewedBooks: [
                { title: 'Views', count: 20 },
                { title: 'Bookmarked', count: 8 },
                { title: 'Downloaded', count: 6 }
            ]
        },
        {
            name: 'Ericka',
            profileImage: "https://cdn.anisearch.com/images/character/cover/64/64453_400.webp",
            readBooks: [
                { title: 'The Catcher in the Rye', image: 'https://example.com/the-catcher-in-the-rye.jpg' },
                { title: 'To Kill a Mockingbird', image: 'https://example.com/to-kill-a-mockingbird.jpg' },
                { title: 'The Great Gatsby', image: 'https://example.com/the-great-gatsby.jpg' }
            ],
            wishlistedBooks: [
                { title: '1984', image: 'https://example.com/1984.jpg' },
                { title: 'Brave New World', image: 'https://example.com/brave-new-world.jpg' },
                { title: 'Steins Gate', image: 'https://example.com/steins-gate.jpg' }
            ],
            downloadedBooks: [
                { title: 'The Great Gatsby', image: 'https://example.com/the-great-gatsby.jpg' },
                { title: 'To Kill a Mockingbird', image: 'https://example.com/to-kill-a-mockingbird.jpg' },
                { title: 'The Catcher in the Rye', image: 'https://example.com/the-catcher-in-the-rye.jpg' }
            ],
            mostViewedBooks: [
                { title: 'Views', count: 20 },
                { title: 'Bookmarked', count: 8 },
                { title: 'Downloaded', count: 6 }
            ]
        }
    ]);


    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleSearch = () => {
        const user = users.find(u => u.name.toLowerCase() === searchQuery.toLowerCase());
        setSelectedUser(user);
    };

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query) {
            const filtered = users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()));
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers([]);
        }
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setSearchQuery(user.name);
        setFilteredUsers([]);
    };

    const scrollContainers = {
        readBooks: useRef(null),
        wishlistedBooks: useRef(null),
        downloadedBooks: useRef(null)
    };

    const handleScroll = (direction, containerRef) => {
        const container = containerRef.current;
        if (container) {
            const scrollAmount = direction === 1 ? 300 : -300;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };


    return (
        <div>
            <NavBar />
            <div className="text-center my-12">
                <h1 className="text-3xl font-bold text-gray-800">User History</h1>
                <div className="relative mt-10">
                    <input
                        type="text"
                        className="border-2 border-gray-300 rounded-lg p-2"
                        placeholder="Search for a user..."
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSearch} className="absolute ml-2 top-3">
                        <FaSearch />
                    </button>
                    {filteredUsers.length > 0 && (
                        <div className="flex flex-col justify-start items-center bg-white border border-gray-300 rounded-lg mt-2 w-48 h-32 overflow-y-auto mx-auto">
                            {filteredUsers.map((user, index) => (
                                <div
                                    key={index}
                                    className="p-2 cursor-pointer hover:bg-gray-200 w-full text-center"
                                    onClick={() => handleUserSelect(user)}
                                >
                                    {user.name}
                                </div>
                            ))}
                        </div>
                    )}

                </div>
                <div className={selectedUser ? "mt-4" : "mt-20"}></div> {/* Changed to mt-4 for 1cm gap */}
            </div>

            {selectedUser ? (
                <div className="p-6">
                    <div className="flex items-center justify-center">
                        <div className="bg-white p-4 rounded-lg shadow-md mx-auto min-w-[300px] mb-4"> {/* Added mb-4 for 1cm gap */}
                            <div className="flex flex-col items-center">
                                <img
                                    src={selectedUser.profileImage}
                                    alt={selectedUser.name}
                                    className="w-24 h-24 rounded-full mb-4"
                                />
                                <h2 className="text-2xl font-bold text-blue-600 text-center">{selectedUser.name}</h2>
                            </div>
                        </div>
                    </div>

                    {/* Books Read */}
                    <div className="mt-12 relative">
                        <h3 className="text-2xl font-semibold text-green-600 mb-4">Books Read</h3>
                        <div className="flex items-center">
                            <button
                                className="bg-gray-300 p-2 rounded-full shadow-md z-10"
                                onClick={() => handleScroll(-1, scrollContainers.readBooks)}
                            >
                                &lt;
                            </button>
                            <div
                                className="flex overflow-x-auto space-x-4 scroll-smooth pb-2 mx-4"
                                ref={scrollContainers.readBooks}
                            >
                                {selectedUser.readBooks.slice(0, 3).map((book, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-4 rounded-lg shadow-md h-92 flex-shrink-0 w-64 mr-4"
                                    >
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-full h-64 object-cover rounded-lg mb-2"
                                        />
                                        <p className="text-center font-semibold">{book.title}</p>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="bg-gray-300 p-2 rounded-full shadow-md z-10"
                                onClick={() => handleScroll(1, scrollContainers.readBooks)}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>

                    {/* Wishlisted Books */}
                    <div className="mt-12 relative">
                        <h3 className="text-2xl font-semibold text-green-600 mb-4">Wishlisted Books</h3>
                        <div className="flex items-center">
                            <button
                                className="bg-gray-300 p-2 rounded-full shadow-md z-10"
                                onClick={() => handleScroll(-1, scrollContainers.wishlistedBooks)}
                            >
                                &lt;
                            </button>
                            <div
                                className="flex overflow-x-auto space-x-4 scroll-smooth pb-2 mx-4"
                                ref={scrollContainers.wishlistedBooks}
                            >
                                {selectedUser.wishlistedBooks.slice(0, 3).map((book, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-4 rounded-lg shadow-md h-92 flex-shrink-0 w-64 mr-4"
                                    >
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-full h-64 object-cover rounded-lg mb-2"
                                        />
                                        <p className="text-center font-semibold">{book.title}</p>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="bg-gray-300 p-2 rounded-full shadow-md z-10"
                                onClick={() => handleScroll(1, scrollContainers.wishlistedBooks)}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>

                    {/* Downloaded Books */}
                    <div className="mt-12 relative">
                        <h3 className="text-2xl font-semibold text-green-600 mb-4">Downloaded Books</h3>
                        <div className="flex items-center">
                            <button
                                className="bg-gray-300 p-2 rounded-full shadow-md z-10"
                                onClick={() => handleScroll(-1, scrollContainers.downloadedBooks)}
                            >
                                &lt;
                            </button>
                            <div
                                className="flex overflow-x-auto space-x-4 scroll-smooth pb-2 mx-4"
                                ref={scrollContainers.downloadedBooks}
                            >
                                {selectedUser.downloadedBooks.slice(0, 3).map((book, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-4 rounded-lg shadow-md h-92 flex-shrink-0 w-64 mr-4"
                                    >
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-full h-64 object-cover rounded-lg mb-2"
                                        />
                                        <p className="text-center font-semibold">{book.title}</p>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="bg-gray-300 p-2 rounded-full shadow-md z-10"
                                onClick={() => handleScroll(1, scrollContainers.downloadedBooks)}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>

                    {/* Most Viewed Books - Chart */}
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold text-green-600 mb-4">Books History</h3>
                        <Bar
                            data={{
                                labels: selectedUser.mostViewedBooks.map(book => book.title),
                                datasets: [
                                    {
                                        label: 'Books History',
                                        data: selectedUser.mostViewedBooks.map(book => book.count),
                                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                        borderColor: 'rgba(75, 192, 192, 1)',
                                        borderWidth: 1,
                                        barThickness: 70,
                                    },
                                ],
                            }}
                            options={{
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className="mt-[2cm]"></div>
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    <p>No user history. Please search for a user.</p>
                    <div className="mt-[2cm]"></div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ManageUsers;
