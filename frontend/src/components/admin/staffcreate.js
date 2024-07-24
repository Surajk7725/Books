import React from 'react';
import { Card, Input, Button, Upload, Form, DatePicker, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const { Option } = Select;

const StaffCreate = () => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-20 mb-20">
      <Card className="w-full max-w-4xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Staff Creation Form</h2>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Please enter the full name' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: 'Please select your date of birth' }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Contact Information (Email)" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Contact Information (Phone)" name="phone" rules={[{ required: true, message: 'Please enter your phone number' }]}>
              <Input />
            </Form.Item>
          </div>
          <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter your address' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Job Title" name="jobTitle" rules={[{ required: true, message: 'Please enter your job title' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: 'Please select your start date' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Employee ID" name="employeeId" rules={[{ required: true, message: 'Please enter your employee ID' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Highest Education Level" name="educationLevel" rules={[{ required: true, message: 'Please select your highest education level' }]}>
            <Select placeholder="Select your highest education level">
              <Option value="highSchool">High School</Option>
              <Option value="bachelor">Bachelor's Degree</Option>
              <Option value="master">Master's Degree</Option>
              <Option value="doctorate">Doctorate</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Degrees or Certifications" name="certifications">
            <Input />
          </Form.Item>
          <Form.Item label="Professional Affiliations" name="affiliations">
            <Input />
          </Form.Item>
          <Form.Item label="Previous Position" name="previousPosition">
            <Input />
          </Form.Item>
          <Form.Item label="Years of Experience in Libraries" name="yearsExperience" rules={[{ required: true, message: 'Please enter your years of experience' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Languages Spoken" name="languages">
            <Input />
          </Form.Item>
          <Form.Item label="Computer Skills" name="computerSkills">
            <Input />
          </Form.Item>
          <Form.Item label="Library Management Software" name="software">
            <Input />
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
  );
};

export default StaffCreate;
