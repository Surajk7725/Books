import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Upload, Form, Select, Breadcrumb } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from './../axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const { Option } = Select;

const AdminEdit = () => {
  const { username } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axiosInstance.get(`/admin/display/${username}`);
        const { socialMediaLinks, ...otherData } = response.data;
        form.setFieldsValue({
          ...otherData,
          ...socialMediaLinks, 
        });
        setLoading(false);
      } catch (error) {
        toast.error(`Error fetching admin data: ${error.response?.data?.message || 'Something went wrong'}`);
        setLoading(false);
      }
    };
  
    fetchAdminData();
  }, [username, form]);
  

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();
  
      Object.keys(values).forEach((key) => {
        if (key === 'profilePic' && values[key]?.file) {
          formData.append(key, values[key].file);
        } else {
          formData.append(key, values[key]);
        }
      });
  
      await axiosInstance.put(`/admin/update/${username}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      toast.success('Admin data updated successfully');
    } catch (error) {
      toast.error(`Error updating admin data: ${error.response?.data?.message || 'Something went wrong'}`);
    }
  };
  
  

  return (
    <div className="justify-center items-center min-h-screen mb-2 ml-2 mt-4 md:ml-10">
      <ToastContainer />
      <div className="text-start -mt-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 ml-4 mb-4 md:mb-0">Edit Admin</h1>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/admin/home">Dashboard</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Edit Admin</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <Card className="w-full max-w-6xl p-8">
        {!loading ? (
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Please enter your full name' }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="User Name"
                name="username"
                rules={[{ required: true, message: 'Please enter your user name' }]}
              >
                <Input readOnly />
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
            <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select a role' }]}>
              <Select placeholder="Select a role">
                <Option value="admin">Admin</Option>
                <Option value="supervisor">Supervisor</Option>
                <Option value="manager">Manager</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Permissions" name="permission" rules={[{ required: true, message: 'Please select permissions' }]}>
              <Select mode="multiple" placeholder="Select permissions">
                <Option value="userManagement">User Management</Option>
                <Option value="bookManagement">Book Management</Option>
                <Option value="resolveManagement">Resolve Management</Option>
              </Select>
            </Form.Item>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="LinkedIn" name="linkedin">
               <Input prefix={<FaLinkedin className="text-blue-700" />} placeholder="Enter LinkedIn URL" />
              </Form.Item>
              <Form.Item label="Instagram" name="instagram">
               <Input prefix={<FaInstagram className="text-pink-600" />} placeholder="Enter Instagram URL" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Twitter" name="twitter">
               <Input prefix={<FaTwitter className="text-blue-500" />} placeholder="Enter Twitter URL" />
              </Form.Item>
              <Form.Item label="YouTube" name="youtube">
               <Input prefix={<FaYoutube className="text-red-600" />} placeholder="Enter YouTube URL" />
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
        ) : (
          <div>Loading...</div>
        )}
      </Card>
      <ToastContainer />
    </div>
  );
};

export default AdminEdit;
