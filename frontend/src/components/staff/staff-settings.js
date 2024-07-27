import React, { useState, useRef } from 'react';
import { MenuAlt1Icon, UserCircleIcon, LockClosedIcon, BookOpenIcon, LogoutIcon } from '@heroicons/react/outline';
import Footer from '../footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Select from 'react-select';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';


const Staff_Settings = () => {
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
    window.location.href = '/staff-home';
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
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [houseAddress, setHouseAddress] = useState('');
  const [socialLinks, setSocialLinks] = useState({ youtube: '', instagram: '', twitter: '', linkedin: '' });
  const [jobTitle, setJobTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [highestEducation, setHighestEducation] = useState('');
  const [degrees, setDegrees] = useState('');
  const [affiliations, setAffiliations] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [languagesSpoken, setLanguagesSpoken] = useState('');
  const [computerSkills, setComputerSkills] = useState('');

  const fileInputRef = useRef(null);

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

  const languageOptions = [
    { label: 'English', value: 'English' },
    { label: 'Hindi', value: 'Hindi' },
    { label: 'Bengali', value: 'Bengali' },
    { label: 'Telugu', value: 'Telugu' },
    { label: 'Marathi', value: 'Marathi' },
    { label: 'Tamil', value: 'Tamil' },
    { label: 'Urdu', value: 'Urdu' },
    { label: 'Gujarati', value: 'Gujarati' },
    { label: 'Kannada', value: 'Kannada' },
    { label: 'Odia', value: 'Odia' },
    { label: 'Malayalam', value: 'Malayalam' },
    { label: 'Punjabi', value: 'Punjabi' },
    { label: 'Assamese', value: 'Assamese' },
    { label: 'Maithili', value: 'Maithili' },
    { label: 'Sanskrit', value: 'Sanskrit' },
    { label: 'Santali', value: 'Santali' },
    { label: 'Kashmiri', value: 'Kashmiri' }
  ];
  

  const computerSkillOptions = [
    { label: 'Library Management Systems', value: 'Library Management Systems' },
    { label: 'Cataloging Software', value: 'Cataloging Software' },
    { label: 'Digital Archives Management', value: 'Digital Archives Management' },
    { label: 'Information Retrieval Tools', value: 'Information Retrieval Tools' },
    { label: 'Database Management', value: 'Database Management' },
    { label: 'Other', value: 'Other' }
  ];
  

  const customStyles = {
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: '#f0f0f0',
      borderRadius: '20px',
      padding: '2px 8px',
      margin: '2px',
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: '#333',
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: '#999',
      ':hover': {
        backgroundColor: '#e0e0e0',
        color: '#666',
      },
    }),
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
                  <BookOpenIcon className="h-6 w-6 inline-block mr-2" /> Book Categories
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
            <div className="max-w-full mx-4 p-8 bg-white rounded-md shadow-md">
            <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>
            <div className="flex">
            <div className="flex-shrink-0 mr-6">
                <div className="relative w-24 h-24">
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
                    <label className="block text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
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
      
                <h3 className="text-xl font-bold mt-6 mb-2 ml-10">Professional Details</h3>
                <div className="grid grid-cols-2 gap-4 ml-10">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-gray-700">Job Title</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-gray-700">Start Date</label>
                    <input
                      type="date"
                      className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-gray-700">Employee ID or Code</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                      value={employeeID}
                      onChange={(e) => setEmployeeID(e.target.value)}
                    />
                  </div>
                </div>
      
                <h3 className="text-xl font-bold mt-6 mb-2 ml-10">Qualifications and Education</h3>
                <div className="grid grid-cols-2 gap-4 ml-10">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-gray-700">Highest Education Level Attained</label>
                    <select
                      className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                      value={highestEducation}
                      onChange={(e) => setHighestEducation(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="High School Diploma">High School Diploma</option>
                      <option value="Associate's Degree">Associate's Degree</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="Doctorate">Doctorate</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-gray-700">Degrees or Certifications</label>
                    <select
                      className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                      value={degrees}
                      onChange={(e) => setDegrees(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="Certified Librarian">Certified Librarian</option>
                      <option value="School Media Specialist Certification">School Media Specialist Certification</option>
                      <option value="Archival Certifications">Archival Certifications</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700">Professional Affiliations</label>
                    <select
                      className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                      value={affiliations}
                      onChange={(e) => setAffiliations(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="ALA (American Library Association)">ALA (American Library Association)</option>
                      <option value="SLA (Special Libraries Association)">SLA (Special Libraries Association)</option>
                      <option value="PLA (Public Library Association)">PLA (Public Library Association)</option>
                      <option value="ACRL (Association of College and Research Libraries)">ACRL (Association of College and Research Libraries)</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-xl font-bold mt-6 mb-2 ml-10">Work Experience</h3>
                <div className="grid grid-cols-2 gap-4 ml-10">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-gray-700">Previous Position</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                      value={workExperience}
                      onChange={(e) => setWorkExperience(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-gray-700">Years of Experience in Libraries</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                      value={yearsExperience}
                      onChange={(e) => setYearsExperience(e.target.value)}
                    />
                  </div>
                </div>
      
                <h3 className="text-xl font-bold mt-6 mb-2 ml-10">Skills and Competencies</h3>
                <div className="grid grid-cols-2 gap-4 ml-10">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-gray-700">Languages Spoken</label>
                    <Select
                      options={languageOptions}
                      isMulti
                      onChange={(selected) => setLanguagesSpoken(selected ? selected.map(option => option.value) : [])}
                      value={languageOptions.filter(option => languagesSpoken.includes(option.value))}
                      styles={customStyles}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-gray-700">Computer Skills</label>
                    <Select
                      options={computerSkillOptions}
                      isMulti
                      onChange={(selected) => setComputerSkills(selected ? selected.map(option => option.value) : [])}
                      value={computerSkillOptions.filter(option => computerSkills.includes(option.value))}
                      styles={customStyles}
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

        </div>
      </div>
      <Footer />
    </div>
  )
};

export default Staff_Settings;





