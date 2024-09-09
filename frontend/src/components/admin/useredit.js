import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import { Card, Input, Button, Upload, Form, Breadcrumb, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import axiosInstance from './../axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

const UserEdit = ({ userData }) => {
  const { username } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/user/display/${username}`);
        const { socialMediaLinks, dob, ...otherData } = response.data;
        form.setFieldsValue({
          ...otherData,
          dob: dob ? moment(dob) : null,
          ...socialMediaLinks,
        });
        setLoading(false);
      } catch (error) {
        toast.error(`Error fetching user data: ${error.response?.data?.message || 'Something went wrong'}`);
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [username, form]);

  const handleFinish = async (values) => {
    try {
        const formData = new FormData();
        const socialLinks = {
            linkedin: values.linkedin,
            instagram: values.instagram,
            twitter: values.twitter,
            youtube: values.youtube,
        };

        const filledSocialLinks = Object.fromEntries(
            Object.entries(socialLinks).filter(([key, value]) => value)
        );

        Object.keys(values).forEach((key) => {
            if (key === 'profilePic' && values[key]?.file) {
                formData.append(key, values[key].file);
            } else if (key === 'dob') {
                formData.append(key, values[key] ? values[key].format('DD-MM-YYYY') : '');
            } else if (['linkedin', 'instagram', 'twitter', 'youtube'].includes(key)) {
                // Do not append individual social links, handled by socialLinks
            } else {
                formData.append(key, values[key]);
            }
        });

        if (Object.keys(filledSocialLinks).length > 0) {
            formData.append('socialMediaLinks', JSON.stringify(filledSocialLinks));
        }

        await axiosInstance.put(`/user/update/${username}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        toast.success('User data updated successfully');
    } catch (error) {
        toast.error(`Error updating user data: ${error.response?.data?.message || 'Something went wrong'}`);
    }
};

  return (
    <div className="justify-center items-center min-h-screen mb-2 ml-2 mt-4 md:ml-10">
       <ToastContainer />
      <div className="text-start -mt-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 ml-4 mb-4 md:mb-0">Edit User</h1>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/admin/home">Dashboard</Link></Breadcrumb.Item>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Edit User</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Card className="w-full max-w-6xl p-8">
       
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Please enter your full name' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="User Name" name="username" rules={[{ required: true, message: 'Please enter your user name' }]}>
              <Input />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: 'Please enter your phone number' }]}>
              <Input />
            </Form.Item>
          </div>
          <Form.Item label="House Address" name="address" rules={[{ required: true, message: 'Please enter your house address' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: 'Please select your date of birth' }]}>
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="LinkedIn" name="linkedin">
              <Input prefix={<FaLinkedin className="text-blue-700" />} />
            </Form.Item>
            <Form.Item label="Instagram" name="instagram">
              <Input prefix={<FaInstagram className="text-pink-600" />} />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Twitter" name="twitter">
              <Input prefix={<FaTwitter className="text-blue-500" />} />
            </Form.Item>
            <Form.Item label="YouTube" name="youtube">
              <Input prefix={<FaYoutube className="text-red-600" />} />
            </Form.Item>
          </div>
          <Form.Item label="Profile Image" name="profilePic">
            <Upload name="profilePic" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default UserEdit;
