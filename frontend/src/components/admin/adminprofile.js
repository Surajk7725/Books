import React, { useState } from 'react';
import { Upload, Button, Tooltip, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ProfilePage = () => {
  const [coverImage, setCoverImage] = useState('https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg');
  const [profileImage, setProfileImage] = useState('https://wallpapers.com/images/hd/yuuichi-katagiri-anime-portrait-5xl430n009kmsg7l.jpg');
  const email = "yuuichikatagiri78@gmail.com";
  const phone = "(+91) 8978787652";

  const handleCoverChange = async (info) => {
    if (info.file.status === 'done' || info.file.status === 'uploading') {
      const imageUrl = await getBase64(info.file.originFileObj);
      setCoverImage(imageUrl);
    }
  };


  return  (
    <div className="w-full min-h-screen bg-gray-100 p-2">
        <div className="text-start -mt-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 ml-4">Profile</h1>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/admin/home">Dashboard</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Profile</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-white shadow-lg overflow-hidden">


        {/* Cover Image Section */}
        <div className="relative h-72 bg-cover bg-center" style={{ backgroundImage: `url(${coverImage})` }}>
          <Upload accept="image/*" showUploadList={false} onChange={handleCoverChange}>
            <Button icon={<UploadOutlined />} className="absolute right-4 top-4"></Button>
          </Upload>
        </div>

        {/* Profile Picture and Details Section */}
        <div className="text-center mt-[-50px]">
          <div className="inline-block relative">
           
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
             
          </div>
          <h1 className="mt-4 text-xl font-bold text-black">Yuuichi Katagiri</h1>
          <p className="text-gray-600 bg-yellow-200 px-4 py-2 rounded-lg shadow-lg font-semibold inline-block transform transition duration-500 hover:scale-105 mt-2">Super Admin</p>
        </div>

        {/* Animated Buttons with Tooltips */}
        <div className="p-4 text-center">
          <div className="flex justify-center space-x-8">
            <Tooltip title={email}>
              <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full transform transition duration-500 hover:scale-105">
                <FaEnvelope />
                <span>Email Us</span>
              </button>
            </Tooltip>
            <Tooltip title={phone}>
              <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-full transform transition duration-500 hover:scale-105">
                <FaPhone />
                <span>Call Us</span>
              </button>
            </Tooltip>
          </div>
        </div>


        {/* Follow Me On Section */}
        <div className="p-4 text-center">
          <h2 className="font-bold text-gray-700 mb-2">Follow me on</h2>
          <div className="flex justify-center space-x-4">
            <a href="https://youtube.com" className="text-red-600"><FaYoutube size={24} /></a>
            <a href="https://instagram.com" className="text-pink-600"><FaInstagram size={24} /></a>
            <a href="https://twitter.com" className="text-blue-600"><FaTwitter size={24} /></a>
            <a href="https://linkedin.com" className="text-blue-700"><FaLinkedin size={24} /></a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;






