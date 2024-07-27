import React, { useState } from 'react';
import NavBar from './navbar';
import Footer from './footer';

const ManageUsers = () => {
    // Example state for multiple users
    const [users] = useState([
        {
            name: 'Alice',
            readBooks: ['The Great Gatsby', '1984', 'To Kill a Mockingbird'],
            wishlistedBooks: ['Brave New World', 'The Catcher in the Rye'],
            downloadedBooks: ['Moby Dick', 'War and Peace', 'The Great Gatsby'],
            mostViewedBooks: [
                { title: 'The Great Gatsby', count: 15 },
                { title: '1984', count: 10 },
                { title: 'Moby Dick', count: 7 }
            ]
        },
        {
            name: 'Bob',
            readBooks: ['The Alchemist', 'The Hobbit', 'Harry Potter'],
            wishlistedBooks: ['Lord of the Flies', 'Fahrenheit 451'],
            downloadedBooks: ['The Hobbit', 'Harry Potter', 'The Alchemist'],
            mostViewedBooks: [
                { title: 'Harry Potter', count: 20 },
                { title: 'The Alchemist', count: 8 },
                { title: 'The Hobbit', count: 6 }
            ]
        },
        {
            name: 'Candy',
            readBooks: ['Pride and Prejudice', 'Jane Eyre', 'Wuthering Heights'],
            wishlistedBooks: ['Great Expectations', 'Little Women'],
            downloadedBooks: ['Jane Eyre', 'Wuthering Heights', 'Pride and Prejudice'],
            mostViewedBooks: [
                { title: 'Pride and Prejudice', count: 12 },
                { title: 'Jane Eyre', count: 9 },
                { title: 'Wuthering Heights', count: 5 }
            ]
        },
        {
            name: 'David',
            readBooks: ['Moby Dick', 'The Odyssey', 'Hamlet'],
            wishlistedBooks: ['The Iliad', 'Macbeth'],
            downloadedBooks: ['Moby Dick', 'Hamlet', 'The Odyssey'],
            mostViewedBooks: [
                { title: 'Hamlet', count: 11 },
                { title: 'Moby Dick', count: 9 },
                { title: 'The Odyssey', count: 4 }
            ]
        },
        {
            name: 'Ericka',
            readBooks: ['The Catcher in the Rye', 'To Kill a Mockingbird', 'The Great Gatsby'],
            wishlistedBooks: ['1984', 'Brave New World'],
            downloadedBooks: ['The Great Gatsby', 'To Kill a Mockingbird', 'The Catcher in the Rye'],
            mostViewedBooks: [
                { title: 'The Catcher in the Rye', count: 14 },
                { title: 'To Kill a Mockingbird', count: 9 },
                { title: 'The Great Gatsby', count: 6 }
            ]
        }
    ]);

    return (
        <div>
            <NavBar />
            <h1 className="text-3xl font-bold text-center text-black-600 my-4">User History</h1>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-2 text-sky-600">{user.name}</h2>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-green-600">Books Read</h3>
                            <ul className="list-disc list-inside">
                                {user.readBooks.map((book, index) => (
                                    <li key={index}>{book}</li>
                                ))}
                            </ul>
                            <p className="font-bold">Total: {user.readBooks.length}</p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-green-600">Wishlisted Books</h3>
                            <ul className="list-disc list-inside">
                                {user.wishlistedBooks.map((book, index) => (
                                    <li key={index}>{book}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-green-600">Downloaded Books</h3>
                            <ul className="list-disc list-inside">
                                {user.downloadedBooks.map((book, index) => (
                                    <li key={index}>{book}</li>
                                ))}
                            </ul>
                            <p className="font-bold">Total: {user.downloadedBooks.length}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-green-600">Most Viewed Books</h3>
                            <ul className="list-disc list-inside">
                                {user.mostViewedBooks.map((book, index) => (
                                    <li key={index}>{book.title} (Viewed {book.count} times)</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default ManageUsers;
