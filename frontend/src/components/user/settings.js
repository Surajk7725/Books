import React, { useState } from 'react';
import { MenuAlt1Icon, UserCircleIcon, LockClosedIcon, CollectionIcon, DocumentTextIcon, GlobeAltIcon, DesktopComputerIcon, LogoutIcon, PhotographIcon } from '@heroicons/react/outline';
import Footer from '../footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [selectedSection, setSelectedSection] = useState('account');

  const [passwordDetails, setPasswordDetails] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleHome = () => {
    window.location.href = '/home';
  };

  const handleLogout = () => {
    console.log('Logging out...');
    window.location.href = '/';
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log('Password details:', passwordDetails);
    // Implement your password update logic here
  };

  // For Subscription Cards
  const cardStyles = {
    base: 'bg-white rounded-lg shadow-lg p-6 max-w-sm',
    title: 'text-2xl font-bold text-gray-800 mb-4',
    description: 'text-gray-600 mb-4',
    priceWrapper: 'text-4xl font-bold text-gray-800 mb-6',
    price: 'text-gray-500 text-base',
    features: 'text-gray-600 mb-6',
    featureItem: 'flex items-center mb-2',
    featureIcon: 'ml-2',
    button: 'bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full transition-colors duration-300'
  };

  // For Book Categories
  const genres = [
    {
      id: 1,
      title: 'Fantasy',
      description: 'Books featuring magic, mythical creatures, and imaginative worlds where extraordinary adventures unfold, often defying the laws of nature and reality.',
      imageUrl: 'https://media.istockphoto.com/id/1165693109/photo/fantasy-word-from-wooden-blocks-with-letters.jpg?s=1024x1024&w=is&k=20&c=ktKf55A1EGBHYMs9IbgxdC4EA1R_ULOpNXwrj33AtzM=',
      link: '/books/fantasy',
    },
    {
      id: 2,
      title: 'Science Fiction',
      description: 'Speculative narratives set in futuristic or alternative realities, exploring advanced scientific concepts, technological innovations, and their impact on society.',
      imageUrl: 'https://img.freepik.com/premium-photo/world-books-concept-with-student_999671-58048.jpg?w=740',
      link: '/books/science-fiction',
    },
    {
      id: 3,
      title: 'Mystery',
      description: 'Plots centered around solving complex puzzles or crimes, with a focus on unraveling clues and uncovering the truth, usually involving a skilled detective.',
      imageUrl: 'https://t4.ftcdn.net/jpg/02/96/81/53/360_F_296815356_lvYpddoEHjBgR30a3iGxWPUMgoR6b8bC.jpg',
      link: '/books/mystery',
    },
    {
      id: 4,
      title: 'Thriller',
      description: 'Intense narratives filled with suspense, danger, and gripping plots that keep readers on edge, often featuring high-stakes conflicts and thrilling twists.',
      imageUrl: 'https://media.istockphoto.com/id/1326493510/vector/illustration-of-man-inside-a-book-surreal-optical-illusion-educational-concept.jpg?s=1024x1024&w=is&k=20&c=dLXyUTHlPgIzqCHGSw5joY6FdNyLQ6UrjhVnfQLsrAE=',
      link: '/books/thriller',
    },
    {
      id: 5,
      title: 'Romance',
      description: 'Stories that explore relationships, love, and intimacy between characters, often with themes of passion, desire, and the complexities of human connection.',
      imageUrl: 'https://img.freepik.com/premium-photo/beautiful-wedding-albums_810293-104936.jpg?w=740',
      link: '/books/romance',
    },
    {
      id: 6,
      title: 'Historical Fiction',
      description: 'Novels set in the past, intricately weaving real historical events, figures, and settings into fictional narratives that capture the essence of bygone eras.',
      imageUrl: 'https://t3.ftcdn.net/jpg/07/64/76/22/240_F_764762271_AKaj5h68J6hRPCNRJKXsMQTJxte58p4M.jpg',
      link: '/books/historical-fiction',
    },
    {
      id: 7,
      title: 'Horror',
      description: 'Works designed to invoke fear and dread through supernatural phenomena, monstrous creatures, or psychological terror, aiming to thrill readers.',
      imageUrl: 'https://img.freepik.com/premium-photo/open-book-contains-scene-with-image-halloween-grave_950002-199619.jpg?w=740',
      link: '/books/horror',
    },
    {
      id: 8,
      title: 'Dystopian',
      description: 'Depictions of societies marked by oppression, suffering, or societal collapse, often governed by totalitarian regimes or facing catastrophic futures.',
      imageUrl: 'https://img.freepik.com/premium-photo/3d-rendering-fantasy-world-with-lot-old-books-ai-generated_538213-13706.jpg?w=740',
      link: '/books/dystopian',
    },
    {
      id: 9,
      title: 'Biography',
      description: 'Non-fiction narratives detailing the life story of an individual, typically written by someone else, offering insights into their achievements, challenges, and impact.',
      imageUrl: 'https://media.istockphoto.com/id/1140981934/photo/biography-word-from-wooden-blocks.jpg?s=1024x1024&w=is&k=20&c=QRI8ywax-ALiR4r7fHZTo_SpOo2pGVhPZCDjUhaE-Xg=',
      link: '/books/biography',
    },
  ];


  // For Frontend Book Click History
  const tableData = [
    { id: 1, bookName: 'The Hobbit', authorName: 'J.R.R. Tolkien', timestamp: '2024-07-07 10:00:00' },
    { id: 2, bookName: '1984', authorName: 'George Orwell', timestamp: '2024-07-06 14:30:00' },
    { id: 3, bookName: 'To Kill a Mockingbird', authorName: 'Harper Lee', timestamp: '2024-07-05 16:45:00' },
    { id: 4, bookName: 'Pride and Prejudice', authorName: 'Jane Austen', timestamp: '2024-07-04 09:20:00' },
    { id: 5, bookName: 'The Catcher in the Rye', authorName: 'J.D. Salinger', timestamp: '2024-07-03 11:10:00' },
    { id: 6, bookName: 'The Great Gatsby', authorName: 'F. Scott Fitzgerald', timestamp: '2024-07-02 08:00:00' },
    { id: 7, bookName: 'Moby-Dick', authorName: 'Herman Melville', timestamp: '2024-07-01 13:45:00' },
    { id: 8, bookName: 'The Lord of the Rings', authorName: 'J.R.R. Tolkien', timestamp: '2024-06-30 15:30:00' },
    { id: 9, bookName: 'Jane Eyre', authorName: 'Charlotte Brontë', timestamp: '2024-06-29 12:20:00' },
    { id: 10, bookName: 'Brave New World', authorName: 'Aldous Huxley', timestamp: '2024-06-28 18:00:00' },
    { id: 11, bookName: 'Frankenstein', authorName: 'Mary Shelley', timestamp: '2024-06-27 10:45:00' },
    { id: 12, bookName: 'Alice\'s Adventures in Wonderland', authorName: 'Lewis Carroll', timestamp: '2024-06-26 14:15:00' },
  ];

  // Pagination Logic
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };


  //Account Details

  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [houseAddress, setHouseAddress] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    youtube: '',
    instagram: '',
    twitter: '',
    linkedin: ''
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks({ ...socialLinks, [name]: value });
  };



  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-64 bg-white text-black p-8">
          <h2 className="text-2xl font-bold mb-6">Settings</h2>

          <div className="flex">
            <div className="w-64">
              <ul className="space-y-2">
                <li
                  className={`p-2 cursor-pointer rounded-lg ${selectedSection === 'home' ? 'bg-transparent-700 border border-gray-300' : ''}`}
                  onClick={handleHome}
                >
                  <MenuAlt1Icon className="h-6 w-6 inline-block mr-2" /> Home
                </li>
                <li
                  className={`p-2 cursor-pointer rounded-lg ${selectedSection === 'account' ? 'bg-transparent-700 border border-gray-300' : ''}`}
                  onClick={() => handleSectionClick('account')}
                >
                  <UserCircleIcon className="h-6 w-6 inline-block mr-2" /> Account
                </li>
                <li
                  className={`p-2 cursor-pointer rounded-lg ${selectedSection === 'security' ? 'bg-transparent-700 border border-gray-300' : ''}`}
                  onClick={() => handleSectionClick('security')}
                >
                  <LockClosedIcon className="h-6 w-6 inline-block mr-2" /> Security
                </li>
                <li
                  className={`p-2 cursor-pointer rounded-lg ${selectedSection === 'bookCategories' ? 'bg-transparent-700 border border-gray-300' : ''}`}
                  onClick={() => handleSectionClick('bookCategories')}
                >
                  <CollectionIcon className="h-6 w-6 inline-block mr-2" /> Book Categories
                </li>
                <li
                  className={`p-2 cursor-pointer rounded-lg ${selectedSection === 'readingHistory' ? 'bg-transparent-700 border border-gray-300' : ''}`}
                  onClick={() => handleSectionClick('readingHistory')}
                >
                  <GlobeAltIcon className="h-6 w-6 inline-block mr-2" /> Reading History
                </li>
                <li
                  className={`p-2 cursor-pointer rounded-lg ${selectedSection === 'offlineAccess' ? 'bg-transparent-700 border border-gray-300' : ''}`}
                  onClick={() => handleSectionClick('offlineAccess')}
                >
                  <DesktopComputerIcon className="h-6 w-6 inline-block mr-2" /> Offline Access
                </li>
                <li
                  className={`p-2 cursor-pointer rounded-lg ${selectedSection === 'subscriptionPlans' ? 'bg-transparent-700 border border-gray-300' : ''}`}
                  onClick={() => handleSectionClick('subscriptionPlans')}
                >
                  <DocumentTextIcon className="h-6 w-6 inline-block mr-2" /> Subscription Plans
                </li>
                <li
                  className="p-2 cursor-pointer rounded-lg"
                  onClick={handleLogout}
                >
                  <LogoutIcon className="h-6 w-6 inline-block mr-2" /> Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-grow p-6 mb-8">


          {selectedSection === 'account' && (
            <div className="max-w-4xl mx-auto p-8 bg-white rounded-md shadow-md">
              <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>
              <div className="flex">
                <div className="flex-shrink-0 mr-6">
                  <div className="relative w-24 h-24">
                    {profileImage ? (
                      <Link to={`/profile-image-view?image=${encodeURIComponent(profileImage)}`}>
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      </Link>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                        <PhotographIcon className="w-12 h-12 text-gray-500" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <div className="flex justify-center mt-2">
                    <button className="px-4 py-2 bg-blue-400 text-white rounded-md" style={{ marginTop: '10px' }}>Upload</button>
                  </div>
                </div>

                <form className="flex-1">
                  <div className="grid grid-cols-2 gap-4 ml-10">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-gray-700">Full Name</label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-gray-700">Username</label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700">Email Address</label>
                      <input
                        type="email"
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-gray-700">Phone Number</label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-gray-700">House Address</label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                        value={houseAddress}
                        onChange={(e) => setHouseAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mt-6 mb-2 ml-10">Add Your Social Handles below</h3>
                  <div className="grid grid-cols-2 gap-4 ml-10">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={faYoutube} className="text-red-600 w-6 h-6" />
                      <input
                        type="url"
                        name="youtube"
                        placeholder="YouTube"
                        className="flex-1 px-4 py-2 bg-gray-100 border rounded-md"
                        value={socialLinks.youtube}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={faInstagram} className="text-pink-500 w-6 h-6" />
                      <input
                        type="url"
                        name="instagram"
                        placeholder="Instagram"
                        className="flex-1 px-4 py-2 bg-gray-100 border rounded-md"
                        value={socialLinks.instagram}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={faTwitter} className="text-blue-400 w-6 h-6" />
                      <input
                        type="url"
                        name="twitter"
                        placeholder="Twitter"
                        className="flex-1 px-4 py-2 bg-gray-100 border rounded-md"
                        value={socialLinks.twitter}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={faLinkedin} className="text-blue-700 w-6 h-6" />
                      <input
                        type="url"
                        name="linkedin"
                        placeholder="LinkedIn"
                        className="flex-1 px-4 py-2 bg-gray-100 border rounded-md"
                        value={socialLinks.linkedin}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          )}

          {selectedSection === 'security' && (
            <form onSubmit={handlePasswordSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Security</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Old Password
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordDetails.oldPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">New Password
                <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordDetails.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Confirm Password
                <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordDetails.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Save
                </button>
              </div>
            </form>
          )}


          {selectedSection === 'bookCategories' && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Book Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {genres.map((genre) => (
                  <div key={genre.id} className="bg-gray-100 rounded-lg p-6 mb-4 flex flex-col justify-between">
                    <div>
                      <img src={genre.imageUrl} alt={genre.title} className="w-full h-40 object-cover rounded-t-lg mb-4" />
                      <h4 className="text-lg font-semibold mb-2">{genre.title}</h4>
                      <p className="text-gray-800 mb-4 text-justify">{genre.description}</p>
                    </div>
                    <div className="flex justify-center">
                      <a href={genre.link} className="block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        Explore {genre.title}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {selectedSection === 'subscriptionPlans' && (
            <div>
              <h2 className="text-2xl font-bold my-4">Choose a Subscription Plan</h2>
              <div className="flex justify-center items-center flex-col md:flex-row gap-6 my-8">
                <div className={`${cardStyles.base} flex-1 max-w-xs`} style={{ height: '100%' }}>
                  <h3 className={cardStyles.title}>Standard</h3>
                  <p className={cardStyles.description}>For Individuals or Users</p>
                  <div className={cardStyles.priceWrapper}>
                    $9<span className={cardStyles.price}>/month</span>
                  </div>
                  <ul className={cardStyles.features}>
                    <li className={cardStyles.featureItem}>✅ <span className={cardStyles.featureIcon}>Basic features</span></li>
                    <li className={cardStyles.featureItem}>✅ <span className={cardStyles.featureIcon}>Limited storage</span></li>
                    <li className={cardStyles.featureItem}>❌ <span className="text-gray-400">Priority support</span></li>
                  </ul>
                  <button className={cardStyles.button}>Subscribe</button>
                </div>

                <div className={`${cardStyles.base} flex-1 max-w-xs`} style={{ height: '100%' }}>
                  <h3 className={cardStyles.title}>Premier</h3>
                  <p className={cardStyles.description}>For Growing Businesses</p>
                  <div className={cardStyles.priceWrapper}>
                    $49<span className={cardStyles.price}>/month</span>
                  </div>
                  <ul className={cardStyles.features}>
                    <li className={cardStyles.featureItem}>✅ <span className={cardStyles.featureIcon}>All standard features</span></li>
                    <li className={cardStyles.featureItem}>✅ <span className={cardStyles.featureIcon}>Increased storage</span></li>
                    <li className={cardStyles.featureItem}>✅ <span className={cardStyles.featureIcon}>Priority support</span></li>
                  </ul>
                  <button className={cardStyles.button}>Subscribe</button>
                </div>

                <div className={`${cardStyles.base} flex-1 max-w-xs`} style={{ height: '100%' }}>
                  <h3 className={cardStyles.title}>Enterprise</h3>
                  <p className={cardStyles.description}>For Large Organizations</p>
                  <div className={cardStyles.priceWrapper}>
                    $99<span className={cardStyles.price}>/month</span>
                  </div>
                  <ul className={cardStyles.features}>
                    <li className={cardStyles.featureItem}>✅ <span className={cardStyles.featureIcon}>All premier features</span></li>
                    <li className={cardStyles.featureItem}>✅ <span className={cardStyles.featureIcon}>Unlimited storage</span></li>
                    <li className={cardStyles.featureItem}>✅ <span className={cardStyles.featureIcon}>Dedicated support</span></li>
                  </ul>
                  <button className={cardStyles.button}>Subscribe</button>
                </div>
              </div>
            </div>
          )}


          {selectedSection === 'readingHistory' && (
            <div className="max-w-4xl mx-auto mt-8">
              <h3 className="text-xl font-semibold mb-4">Reading History</h3>
              <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Sr.No</th>
                      <th className="py-3 px-6 text-left">Book Name</th>
                      <th className="py-3 px-6 text-left">Author Name</th>
                      <th className="py-3 px-6 text-left">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {paginatedData.map((row) => (
                      <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{row.id}</td>
                        <td className="py-3 px-6 text-left">{row.bookName}</td>
                        <td className="py-3 px-6 text-left">{row.authorName}</td>
                        <td className="py-3 px-6 text-left">{row.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center py-2">
                <button
                  onClick={handlePrevPage}
                  className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {selectedSection === 'offlineAccess' && (
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-[0.5cm]">Downloaded Books</h2>
              <div className="flex flex-col md:flex-row">
                <div className="w-full p-3">
                  <div className="bg-white rounded-md shadow p-4 w-full">
                    <div className="flex items-center mb-4">
                      <img
                        alt="A book cover showing a scenic landscape with mountains and a lake, the title reads 'Wanderlust: Exploring the Great Outdoors'"
                        className="mr-4 object-cover rounded"
                        height="200"
                        src="https://placehold.co/150x200"
                        width="150"
                      />
                      <div>
                        <h3 className="text-lg font-bold">Wanderlust: Exploring the Great Outdoors</h3>
                        <p className="text-gray-600">By John Doe</p>
                        <div className="flex items-center mt-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md mr-2">4.5 ⭐</span>
                          <span className="text-gray-600">(12,345 reviews)</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Embark on an adventure through breathtaking landscapes and discover the beauty of nature with this captivating book. Filled with stunning photography and inspiring stories, "Wanderlust" will ignite your desire to explore the great outdoors.
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                      Read Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </div>
  )
};

export default Settings;





