import React, { useState } from 'react';

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

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    // Handle account details update
    console.log('Account details:', accountDetails);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Handle password update
    console.log('Password details:', passwordDetails);
  };

  const handleHome = () => {
    // Handle home logic here
    window.location.href = '/home'; 
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    window.location.href = '/'; // Redirect to landing page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex">
        <div className="w-64 bg-white-800 text-black p-8"> {/* Changed text-white to text-black */}
          <h2 className="text-2xl font-bold mb-6">General Settings</h2>
          <ul>
            <li
              className={`p-2 cursor-pointer ${selectedSection === 'home' ? 'bg-indigo-700' : ''}`}
              onClick={handleHome}
            >
              Home
            </li>
            <li
              className={`p-2 cursor-pointer ${selectedSection === 'account' ? 'bg-indigo-700' : ''}`}
              onClick={() => setSelectedSection('account')}
            >
              Account
            </li>
            <li
              className={`p-2 cursor-pointer ${selectedSection === 'security' ? 'bg-indigo-700' : ''}`}
              onClick={() => setSelectedSection('security')}
            >
              Security
            </li>
            <li
              className={`p-2 cursor-pointer ${selectedSection === 'logout' ? 'bg-indigo-700' : ''}`}
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
        <div className="flex-grow p-6 mb-8"> {/* Added mb-8 to create space */}
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
                  <img className="w-16 h-16 rounded-full object-cover mr-4" src="https://placehold.co/64x64" alt="A placeholder image for a user's profile picture, which is a circle with a gray background and a white question mark in the center." />
                  <input className="border border-gray-300 rounded-md px-3 py-2" id="avatar" type="file" accept="image/*" value={accountDetails.profilePicture} onChange={handleAccountChange} />
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
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto text-center">
          <p className="text-white">&copy; Designed by Tome 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default Settings;





