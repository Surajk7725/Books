import React, { useState } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

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

  const handleCoverChange = async (info) => {
    if (info.file.status === 'done' || info.file.status === 'uploading') {
      const imageUrl = await getBase64(info.file.originFileObj);
      setCoverImage(imageUrl);
    }
  };

  const handleProfileChange = async (info) => {
    if (info.file.status === 'done' || info.file.status === 'uploading') {
      const imageUrl = await getBase64(info.file.originFileObj);
      setProfileImage(imageUrl);
    }
  };


  return (
    <div className="w-full min-h-screen bg-gray-100 p-2">
      <div className="max-w-5xl mx-auto bg-white shadow-lg overflow-hidden ml-52">
        {/* Cover Image Section */}
        <div className="relative h-72 bg-cover bg-center" style={{ backgroundImage: `url(${coverImage})` }}>
          <Upload accept="image/*" showUploadList={false} onChange={handleCoverChange}>
            <Button icon={<UploadOutlined />} className="absolute right-4 top-4"></Button>
          </Upload>
        </div>

        {/* Profile Picture and Details Section */}
        <div className="text-center mt-[-50px]">
          <div className="inline-block relative">
            <Upload accept="image/*" showUploadList={false} onChange={handleProfileChange}>
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <Button icon={<UploadOutlined />} className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2"></Button>
            </Upload>
          </div>
          <h1 className="mt-4 text-xl font-bold text-black">Yuuichi Katagiri</h1>
          <p className="text-gray-600">Super Admin</p>
        </div>

        {/* Contact Details Section */}
        <div className="p-4">
          <div className="flex justify-center space-x-8">
            <div>
              <h2 className="font-bold text-gray-700 text-center">Email</h2>
              <p className="text-gray-600">yuuichikatagiri78@gmail.com</p>
            </div>
            <div>
              <h2 className="font-bold text-gray-700 text-center">Phone</h2>
              <p className="text-gray-600">(+91) 8978787652 </p>
            </div>
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






