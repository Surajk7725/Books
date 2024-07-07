import React, { useState } from 'react';
import { MenuAlt1Icon, UserCircleIcon, LockClosedIcon, CollectionIcon, DocumentTextIcon, HeartIcon, GlobeAltIcon, DesktopComputerIcon, LogoutIcon, BookOpenIcon  } from '@heroicons/react/outline'; 
import Footer from '../footer';

const Settings = () => {
  const [selectedSection, setSelectedSection] = useState('account');

  const [accountDetails, setAccountDetails] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    profilePicture: '',
  });

  const [passwordDetails, setPasswordDetails] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });


  const [bookmarks, setBookmarks] = useState({
    bookmark1: '',
    bookmark2: '',
    // Add more bookmarks as needed
  });

  const [readingHistory, setReadingHistory] = useState({
    historyItem1: '',
    historyItem2: '',
    // Add more history items as needed
  });

  const [accessibilityFeatures, setAccessibilityFeatures] = useState({
    feature1: '',
    feature2: '',
    // Add more features as needed
  });

  const [offlineAccess, setOfflineAccess] = useState({
    offlineMode: false,
    downloadOptions: '',
    // Add more offline access settings as needed
  });

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleBookCategoryChange = (event) => {
    // Implement your input change handling logic here if needed
  };

  const handleBookmarkChange = (e) => {
    const { name, value } = e.target;
    setBookmarks((prevBookmarks) => ({ ...prevBookmarks, [name]: value }));
  };

  const handleHistoryItemChange = (e) => {
    const { name, value } = e.target;
    setReadingHistory((prevHistory) => ({ ...prevHistory, [name]: value }));
  };

  const handleFeatureChange = (e) => {
    const { name, value } = e.target;
    setAccessibilityFeatures((prevFeatures) => ({ ...prevFeatures, [name]: value }));
  };

  const handleOfflineAccessChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setOfflineAccess((prevAccess) => ({ ...prevAccess, [name]: val }));
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

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    console.log('Account details:', accountDetails);
    // Implement your account update logic here
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log('Password details:', passwordDetails);
    // Implement your password update logic here
  };

  const handleBookCategorySubmit = (e) => {
    e.preventDefault();
    // Implement your book categories update logic here
  };

  const handleBookmarkSubmit = (e) => {
    e.preventDefault();
    console.log('Bookmarks:', bookmarks);
    // Implement your bookmarks update logic here
  };

  const handleHistorySubmit = (e) => {
    e.preventDefault();
    console.log('Reading history:', readingHistory);
    // Implement your reading history update logic here
  };

  const handleFeatureSubmit = (e) => {
    e.preventDefault();
    console.log('Accessibility features:', accessibilityFeatures);
    // Implement your accessibility features update logic here
  };

  const handleOfflineAccessSubmit = (e) => {
    e.preventDefault();
    console.log('Offline access settings:', offlineAccess);
    // Implement your offline access settings update logic here
  };

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


  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-64 bg-white text-black p-8">
          <h2 className="text-2xl font-bold mb-6">Settings</h2>

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
              className={`p-2 cursor-pointer rounded-lg ${selectedSection === 'subscriptionPlans' ? 'bg-transparent-700 border border-gray-300' : ''}`}
              onClick={() => handleSectionClick('subscriptionPlans')}
            >
              <DocumentTextIcon className="h-6 w-6 inline-block mr-2" /> Subscription Plans
            </li>
            <li
              className={`p-2 cursor-pointer rounded-lg ${selectedSection === 'bookmarks' ? 'bg-transparent-700 border border-gray-300' : ''}`}
              onClick={() => handleSectionClick('bookmarks')}
            >
              <HeartIcon className="h-6 w-6 inline-block mr-2" /> Bookmarks
            </li>
            <li
              className={`p-2 cursor-pointer rounded-lg ${selectedSection === 'readingHistory' ? 'bg-transparent-700 border border-gray-300' : ''}`}
              onClick={() => handleSectionClick('readingHistory')}
            >
              <GlobeAltIcon className="h-6 w-6 inline-block mr-2" /> Reading History
            </li>
            <li
              className={`p-2 cursor-pointer rounded-lg ${selectedSection === 'accessibilityFeatures' ? 'bg-transparent-700 border border-gray-300' : ''}`}
              onClick={() => handleSectionClick('accessibilityFeatures')}
            >
              <DesktopComputerIcon className="h-6 w-6 inline-block mr-2" /> Access Features
            </li>
            <li
              className={`p-2 cursor-pointer rounded-lg ${selectedSection === 'offlineAccess' ? 'bg-transparent-700 border border-gray-300' : ''}`}
              onClick={() => handleSectionClick('offlineAccess')}
            >
              <DesktopComputerIcon className="h-6 w-6 inline-block mr-2" /> Offline Access
            </li>
            <li
              className="p-2 cursor-pointer rounded-lg"
              onClick={handleLogout}
            >
              <LogoutIcon className="h-6 w-6 inline-block mr-2" /> Logout
            </li>
          </ul>
        </div>
        <div className="flex-grow p-6 mb-8">


          {selectedSection === 'account' && (
            <form onSubmit={handleAccountSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Account Updation</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={accountDetails.name}
                  onChange={handleAccountChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={accountDetails.phoneNumber}
                  onChange={handleAccountChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={accountDetails.email}
                  onChange={handleAccountChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="avatar">Profile Picture</label>
                <div className="flex items-center">
                  <img className="w-16 h-16 rounded-full object-cover mr-4" src="https://placehold.co/64x64" alt="Profile" />
                  <input
                    className="border border-gray-300 rounded-md px-3 py-2"
                    id="avatar"
                    type="file"
                    accept="image/*"
                    value={accountDetails.profilePicture}
                    onChange={handleAccountChange}
                  />
                </div>
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Save
              </button>
            </form>
          )}


          {selectedSection === 'security' && (
            <form onSubmit={handlePasswordSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Security</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordDetails.oldPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordDetails.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordDetails.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Save
              </button>
            </form>
          )}


          {selectedSection === 'bookCategories' && (
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-xl font-semibold mb-4">Book Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {genres.map((genre) => (
                <div key={genre.id} className="bg-gray-100 rounded-lg p-6 mb-4">
                  <img src={genre.imageUrl} alt={genre.title} className="w-full h-40 object-cover rounded-t-lg mb-4" />
                  <h4 className="text-lg font-semibold mb-2">{genre.title}</h4>
                  <p className="text-gray-800 mb-4 text-justify">{genre.description}</p>
                  <a href={genre.link} className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Explore {genre.title}
                  </a>
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
        

          {selectedSection === 'bookmarks' && (
            <form onSubmit={handleBookmarkSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Bookmarks</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Bookmark 1</label>
                <input
                  type="text"
                  name="bookmark1"
                  value={bookmarks.bookmark1}
                  onChange={handleBookmarkChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Bookmark 2</label>
                <input
                  type="text"
                  name="bookmark2"
                  value={bookmarks.bookmark2}
                  onChange={handleBookmarkChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* Add more bookmarks as needed */}
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Save
              </button>
            </form>
          )}

          {selectedSection === 'readingHistory' && (
            <form onSubmit={handleHistorySubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Reading History</h3>
              <div className="mb-4">
                <label className="block text-gray-700">History Item 1</label>
                <input
                  type="text"
                  name="historyItem1"
                  value={readingHistory.historyItem1}
                  onChange={handleHistoryItemChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">History Item 2</label>
                <input
                  type="text"
                  name="historyItem2"
                  value={readingHistory.historyItem2}
                  onChange={handleHistoryItemChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* Add more history items as needed */}
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Save
              </button>
            </form>
          )}

          {selectedSection === 'accessibilityFeatures' && (
            <form onSubmit={handleFeatureSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Accessibility Features</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Feature 1</label>
                <input
                  type="text"
                  name="feature1"
                  value={accessibilityFeatures.feature1}
                  onChange={handleFeatureChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Feature 2</label>
                <input
                  type="text"
                  name="feature2"
                  value={accessibilityFeatures.feature2}
                  onChange={handleFeatureChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* Add more features as needed */}
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Save
              </button>
            </form>
          )}

          {selectedSection === 'offlineAccess' && (
            <form onSubmit={handleOfflineAccessSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Offline Access</h3>
              <div className="mb-4">
                <label className="block text-gray-700">
                  <input
                    type="checkbox"
                    name="offlineMode"
                    checked={offlineAccess.offlineMode}
                    onChange={handleOfflineAccessChange}
                    className="mr-2 leading-tight"
                  />
                  Offline Mode
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Download Options</label>
                <textarea
                  name="downloadOptions"
                  value={offlineAccess.downloadOptions}
                  onChange={handleOfflineAccessChange}
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
              {/* Add more offline access settings as needed */}
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Save
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
};

export default Settings;



