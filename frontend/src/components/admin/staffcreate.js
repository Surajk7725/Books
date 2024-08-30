import React, {useState} from 'react';
import { Card, Input, Button, Upload, Form, DatePicker, Select, Breadcrumb } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../axiosInstance';

const { Option } = Select;

const StaffCreate = () => {
  const [form] = Form.useForm();
  const [languagesSpoken, setLanguagesSpoken] = useState([]);
  const [computerSkills, setComputerSkills] = useState([]);
  const [highestEducation, setHighestEducation] = useState('');
  const [degrees, setDegrees] = useState('');
  const [affiliations, setAffiliations] = useState('');

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
    { label: 'Kashmiri', value: 'Kashmiri' },
  ];

  const computerSkillOptions = [
    { label: 'Library Management Systems', value: 'Library Management Systems' },
    { label: 'Cataloging Software', value: 'Cataloging Software' },
    { label: 'Digital Archives Management', value: 'Digital Archives Management' },
    { label: 'Information Retrieval Tools', value: 'Information Retrieval Tools' },
    { label: 'Database Management', value: 'Database Management' },
    { label: 'Other', value: 'Other' },
  ];

  const handleLanguageChange = (value) => {
    setLanguagesSpoken(value);
  };

  const handleSkillChange = (value) => {
    setComputerSkills(value);
  };

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('fullName', values.fullName);
      formData.append('username', values.username); 
      formData.append('email', values.email);
      formData.append('phoneNumber', values.phoneNumber); 
      formData.append('address', values.address);
      formData.append('password',values.password);
      formData.append('dob', values.dob);

      const professionalDetails = {
        jobTitle: values.jobTitle,
        employeeId: values.employeeId,
      };
      formData.append('professionalDetails', JSON.stringify(professionalDetails));
  
      const qualifications = {
        highestEducation: values.highestEducation,
        degrees: values.degrees,
        professionalAffiliations: values.professionalAffiliations,
      };
      formData.append('qualifications', JSON.stringify(qualifications));
  
      const workExperience = {
        previousPosition: values.previousPosition,
        yearsExperience: values.yearsExperience,
      };
      formData.append('workExperience', JSON.stringify(workExperience));
  
      const skills = {
        languagesSpoken: values.languagesSpoken,
        computerSkills: values.computerSkills,
      };
      formData.append('skills', JSON.stringify(skills));
  
      const socialMediaLinks = {
        linkedin: values.linkedin,
        instagram: values.instagram,
        twitter: values.twitter,
        youtube: values.youtube,
      };
      formData.append('socialMediaLinks', JSON.stringify(socialMediaLinks));

      if (values.profilePic && values.profilePic.file) {
        formData.append('profilePic', values.profilePic.file);
      }

      const response = await axiosInstance.post('/staff/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        toast.success('Staff profile created successfully');
        form.resetFields(); 
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        toast.error(`Failed to create staff profile: ${error.response.data.message || 'Unknown error'}`);
      } else {
        console.error('Error creating staff profile:', error.message);
        toast.error('Failed to create staff profile');
      }
    }
    
  };

  return (
    <div className="justify-center items-center min-h-screen mb-2 ml-2 mt-4 md:ml-10">
      <ToastContainer />
      <div className="text-start -mt-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 ml-4 mb-4 md:mb-0">Create Staff</h1>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/admin/home">Dashboard</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Staff</Breadcrumb.Item>
            <Breadcrumb.Item>Create Staff</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Card className="w-full max-w-6xl p-8">
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Please enter the full name' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter the username' }]}>
              <Input />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phoneNumber" rules={[{ required: true, message: 'Please enter your phone number' }]}>
              <Input />
            </Form.Item>
          </div>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter a password' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter your address' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: 'Please select your date of birth' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Job Title" name="jobTitle" rules={[{ required: true, message: 'Please enter your job title' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Employee Id" name="employeeId" rules={[{ required: true, message: 'Please enter your employee ID' }]}>
            <Input />
          </Form.Item>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Highest Education Level" name="highestEducation" rules={[{ required: true, message: 'Please select your highest education level' }]}>
              <Select value={highestEducation} onChange={(value) => setHighestEducation(value)} placeholder="Select your highest education level">
                <Option value="High School Diploma">High School Diploma</Option>
                <Option value="Bachelor's Degree">Bachelor's Degree</Option>
                <Option value="Master's Degree">Master's Degree</Option>
                <Option value="Doctorate">Doctorate</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Degrees or Certifications" name="degrees">
              <Select value={degrees} onChange={(value) => setDegrees(value)} placeholder="Select your degrees">
                <Option value="Certified Librarian">Certified Librarian</Option>
                <Option value="School Media Specialist Certification">School Media Specialist Certification</Option>
                <Option value="Archival Certifications">Archival Certifications</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Professional Affiliations" name="professionalAffiliations">
              <Select value={affiliations} onChange={(value) => setAffiliations(value)} placeholder="Select your affiliations">
                <Option value="ALA (American Library Association)">ALA (American Library Association)</Option>
                <Option value="SLA (Special Libraries Association)">SLA (Special Libraries Association)</Option>
                <Option value="PLA (Public Library Association)">PLA (Public Library Association)</Option>
                <Option value="ACRL (Association of College and Research Libraries)">ACRL (Association of College and Research Libraries)</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Previous Position" name="previousPosition">
              <Input />
            </Form.Item>
            <Form.Item label="Years of Experience in Libraries" name="yearsExperience" rules={[{ required: true, message: 'Please enter your years of experience' }]}>
              <Input type="number" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Languages Spoken" name="languagesSpoken" rules={[{ required: true, message: 'Please select languages spoken' }]}>
              <Select
                mode="multiple"
                allowClear
                placeholder="Select languages spoken"
                options={languageOptions}
                value={languagesSpoken}
                onChange={handleLanguageChange}
              />
            </Form.Item>
            <Form.Item label="Computer Skills" name="computerSkills" rules={[{ required: true, message: 'Please select computer skills' }]}>
              <Select
                mode="multiple"
                allowClear
                placeholder="Select computer skills"
                options={computerSkillOptions}
                value={computerSkills}
                onChange={handleSkillChange}
              />
            </Form.Item>
          </div>
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
              Save
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default StaffCreate;
