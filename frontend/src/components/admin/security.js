import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Card, Breadcrumb } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../axiosInstance';
import { useAuth } from '../authcontext';
import { useNavigate } from 'react-router-dom';

const SecurityPage = () => {
  const [username, setUserName] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.username) {
      setUserName(user.username);
    }
  }, [user]);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await axiosInstance.put(`/admin/update-password/${username}`, {
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        toast.success('Password updated successfully');
        navigate("/");
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password. Please try again.');
    }
  };

  const getPasswordStrength = (password) => {
    const criteria = [
      /[A-Z]/.test(password), // Capital letter
      /[a-z]/.test(password), // Small letter
      /\d/.test(password), // Number
      /[!@#$%^&*(),.?":{}|<>]/.test(password), // Special character
      password.length >= 8 // Minimum length
    ];

    const fulfilledCriteria = criteria.filter(Boolean).length;

    if (fulfilledCriteria <= 2) {
      return 'weak';
    } else if (fulfilledCriteria === 3 || fulfilledCriteria === 4) {
      return 'medium';
    } else {
      return 'strong';
    }
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  const getPasswordBorderColor = () => {
    switch (passwordStrength) {
      case 'weak':
        return 'border-red-500';
      case 'medium':
        return 'border-orange-500';
      case 'strong':
        return 'border-green-500';
      default:
        return '';
    }
  };

  return (
    <div className="justify-center items-center min-h-screen mb-2 ml-2 mt-4 md:ml-10">
      <ToastContainer />
      <div className="text-start -mt-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 ml-4 mb-4 md:mb-0">Security</h1>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/admin/home">Dashboard</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Settings</Breadcrumb.Item>
            <Breadcrumb.Item>Security</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      {/* Form Wrapper to handle password submission */}
      <form onSubmit={handlePasswordSubmit}>
        <Card className="w-full max-w-5xl p-6 ml-3">
          <div className="mb-4">
            <label className="block mb-2 text-lg font-medium">Current Password</label>
            <Input.Password
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Current Password"
              size="large"
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-lg font-medium">New Password</label>
            <Input.Password
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              size="large"
              className={`w-full ${getPasswordBorderColor()}`}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-lg font-medium">Confirm Password</label>
            <Input.Password
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              size="large"
              className="w-full"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-16">
            <Button onClick={handleCancel}>Cancel</Button>
            {/* Submit Button inside the form */}
            <Button type="primary" htmlType="submit">Save</Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default SecurityPage;



