import React, { useState, useRef, useEffect } from 'react';
import { MenuAlt1Icon, UserCircleIcon, LockClosedIcon, BookOpenIcon, DocumentTextIcon, GlobeAltIcon, DesktopComputerIcon, LogoutIcon } from '@heroicons/react/outline';
import Footer from './footer';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../axiosInstance';
import { FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, DatePicker, Table, Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../authcontext';

const Settings = () => {
  const navigate = useNavigate();

  // Sidebar options
  const [selectedSection, setSelectedSection] = useState('account');

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleHome = () => {
    navigate('/home');
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Fetching username from login page
  const [username, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.username) {
      setUserName(user.username);
      setFullName(user.fullName);
      setEmail(user.email);
      setAddress(user.address);
      setPhoneNumber(user.phoneNumber);
    }
  }, [user]);


  // Security
  const [passwordDetails, setPasswordDetails] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await axiosInstance.put(`/user/update-password/${username}`, {
        oldPassword: passwordDetails.oldPassword,
        newPassword: passwordDetails.newPassword
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        toast.success('Password updated successfully');
        navigate("/login");
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password. Please try again.');
    }
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

  // Books History
  const [bookHistory, setBookHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const fetchBookHistory = async () => {
      if (username) {
        try {
          setLoading(true);
          const response = await axiosInstance.get(`/user/books-history/${username}`);
          if (response.data && Array.isArray(response.data)) {
            setBookHistory(response.data);
          } else {
            console.error('Unexpected data format from the server.');
          }
        } catch (error) {
          console.error('Error fetching book history:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookHistory();
  }, [username]);

  const columns = [
    {
      title: 'Sr.No',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Book Name',
      dataIndex: 'bookName',
      key: 'bookName',
      sorter: (a, b) => a.bookName.localeCompare(b.bookName),
    },
    {
      title: 'Author Name',
      dataIndex: 'authorName',
      key: 'authorName',
      sorter: (a, b) => a.authorName.localeCompare(b.authorName),
    },
    {
      title: 'Viewed At',
      dataIndex: 'viewedAt',
      key: 'viewedAt',
      sorter: (a, b) => new Date(a.viewedAt) - new Date(b.viewedAt),
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  //Account Details

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });


  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    youtube: '',
    instagram: '',
    twitter: '',
    linkedin: ''
  });

  const onChange = (date, dateString) => {
    setDob(date);
    console.log(date, dateString);
  };

  const fileInputRef = useRef(null);

  const [error, setError] = useState('');

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    const updatedFileList = newFileList.map(file => {
      if (file.status === 'error') {
        return { ...file, status: 'done' };
      }
      return file;
    });

    setFileList(updatedFileList);

    if (updatedFileList.length > 0) {
      setProfileImage(updatedFileList[0].url || updatedFileList[0].thumbUrl);
    } else {
      setProfileImage(null);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks({ ...socialLinks, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    const formattedDob = dob ? dob.format('DD-MM-YYYY') : null;
    formData.append('dob', formattedDob);
    formData.append('address', address);

    const filledSocialLinks = Object.fromEntries(
      Object.entries(socialLinks).filter(([key, value]) => value)
    );
    if (Object.keys(filledSocialLinks).length > 0) {
      formData.append('socialMediaLinks', JSON.stringify(filledSocialLinks));
    }

    if (fileList.length > 0) {
      const file = fileList[0].originFileObj || fileList[0];
      formData.append('profilePic', file);
    }

    try {
      const response = await axiosInstance.put(
        `/user/update/${username}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        navigate("/login");
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating the profile.');
    }
  };

  const uploadButton = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-col lg:flex-row">
        <ToastContainer />
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
                  <BookOpenIcon className="h-6 w-6 inline-block mr-2" /> Book Categories
                </li>
                <li
                  className={`p-2 cursor-pointer rounded-lg ${selectedSection === 'readingHistory' ? 'bg-transparent-700 border border-gray-300' : ''}`}
                  onClick={() => handleSectionClick('readingHistory')}
                >
                  <GlobeAltIcon className="h-6 w-6 inline-block mr-2" /> Reading History
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
            <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white rounded-md shadow-md">
              <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>
              <div className="flex flex-col sm:flex-row">
                <div className="flex-shrink-0 mb-6 sm:mb-0 sm:mr-6">
                  <div className="relative w-24 h-24 mx-auto sm:mx-0">
                    <Upload
                      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                      listType="picture-circle"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                      <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                          visible: previewOpen,
                          onVisibleChange: (visible) => setPreviewOpen(visible),
                          afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                      />
                    )}
                  </div>
                </div>

                <form className="flex-1" onSubmit={handleSubmit}>
                  {/* Input fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <label className="block text-gray-700">Full Name</label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-gray-700">Username</label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                        value={username}
                        readOnly
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-gray-700">Email Address</label>
                      <input
                        type="email"
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-gray-700">Date of Birth</label>
                      <DatePicker
                        onChange={onChange}
                        value={dob}
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                        format="DD-MM-YYYY"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-gray-700">Phone Number</label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700">House Address</label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="mt-6">
                    <h3 className="text-lg font-bold">Social Media Links</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div className="col-span-1">
                        <label className="flex items-center">
                          <FaYoutube className="mr-2 text-red-500" /> YouTube
                        </label>
                        <input
                          type="url"
                          name="youtube"
                          className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                          value={socialLinks.youtube}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="flex items-center">
                          <FaInstagram className="mr-2 text-pink-500" /> Instagram
                        </label>
                        <input
                          type="url"
                          name="instagram"
                          className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                          value={socialLinks.instagram}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="flex items-center">
                          <FaTwitter className="mr-2 text-blue-500" /> Twitter
                        </label>
                        <input
                          type="url"
                          name="twitter"
                          className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                          value={socialLinks.twitter}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="flex items-center">
                          <FaLinkedin className="mr-2 text-blue-700" /> LinkedIn
                        </label>
                        <input
                          type="url"
                          name="linkedin"
                          className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                          value={socialLinks.linkedin}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Save Changes
                    </button>
                  </div>
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
            <main className="flex-grow mt-8 mb-8">
              <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Reading History</h3>
                <div>
                  {loading ? (
                    <Spin size="large" />
                  ) : (
                    <Table
                      columns={columns}
                      dataSource={bookHistory}
                      pagination={{ current: currentPage, pageSize }}
                      onChange={handleTableChange}
                      rowKey="id"
                    />
                  )}
                </div>
              </div>
            </main>
          )}

        </div>
      </div>
      <Footer />
    </div>
  )
};

export default Settings;





