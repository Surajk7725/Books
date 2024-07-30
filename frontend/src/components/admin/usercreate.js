import React from 'react';
import {Link} from 'react-router-dom';
import { Card, Input, Button, Upload, Form, Breadcrumb } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const UserCreate = () => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen mb-2 ml-12 overflow-hidden">
      <div className="w-full max-w-6xl mt-4">
        <div className="text-start -mt-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 ml-4">Create User</h1>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/admin/home">Dashboard</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Create User</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Card className="w-full p-4 md:p-8">
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Please enter your full name' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="User Name" name="userName" rules={[{ required: true, message: 'Please enter your user name' }]}>
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
            <Form.Item label="House Address" name="houseAddress" rules={[{ required: true, message: 'Please enter your house address' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
              <Input.Password />
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
            <Form.Item label="Profile Image" name="profileImage">
              <Upload name="profileImage" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <div className="flex justify-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default UserCreate;
