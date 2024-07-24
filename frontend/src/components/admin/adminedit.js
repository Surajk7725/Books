import React, { useEffect } from 'react';
import { Card, Input, Button, Upload, Form, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const { Option } = Select;

const AdminEdit = ({ adminData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(adminData);
  }, [form, adminData]);

  const handleFinish = (values) => {
    console.log('Updated values:', values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-20 mb-20">
      <Card className="w-full max-w-4xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Admin</h2>
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
          <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select a role' }]}>
            <Select placeholder="Select a role">
              <Option value="admin">Admin</Option>
              <Option value="supervisor">Supervisor</Option>
              <Option value="manager">Manager</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Permissions" name="permissions" rules={[{ required: true, message: 'Please select permissions' }]}>
            <Select mode="multiple" placeholder="Select permissions">
              <Option value="userManagement">User Management</Option>
              <Option value="bookManagement">Book Management</Option>
              <Option value="resolveManagement">Resolve Management</Option>
            </Select>
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
              Update
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AdminEdit;
