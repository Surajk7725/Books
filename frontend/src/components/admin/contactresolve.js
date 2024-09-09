import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Space, Breadcrumb } from 'antd';
import { MailOutlined, PhoneOutlined, CheckOutlined } from '@ant-design/icons';
import axiosInstance from '../axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit'
  });
};

const Contactresolve = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetchIssuesData(); 
  }, []);

  const fetchIssuesData = async () => {
    try {
      const response = await axiosInstance.get('/contact/issues');
      const issues = response.data.map((issue, index) => {
        const createdAtTimestamp = issue.createdAt?.$date?.$numberLong 
          ? new Date(parseInt(issue.createdAt.$date.$numberLong)) 
          : new Date(issue.createdAt); 
  
        return {
          key: issue._id, 
          srNo: index + 1,
          fullName: issue.fullName,
          email: issue.email,
          phoneNumber: issue.phoneNumber,
          message: issue.message,
          status: issue.resolvedIssue ? 'solved' : 'unsolved', 
          date: createdAtTimestamp.toISOString(), 
        };
      });
      setDataSource(issues);
    } catch (error) {
      console.error('Error fetching issues data:', error);
      toast.error('Failed to fetch issues data. Please try again.');
    }
  };

  const handleStatusChange = async (key) => {
    try {
      const issue = dataSource.find((item) => item.key === key);

      if (!issue || !issue.key) {
        console.error('Issue or Issue ID not found:', issue);
        toast.error('Issue or Issue ID not found.');
        return;
      }
  
      await axiosInstance.patch(`/contact/issues/${issue.key}`, {
        resolvedIssue: true
      });
  
      setDataSource((prevData) =>
        prevData.map((item) =>
          item.key === key ? { ...item, status: 'solved' } : item
        )
      );
      toast.success('Issue marked as resolved!');
    } catch (error) {
      console.error('Error updating issue status:', error);
      toast.error('Failed to update issue status. Please try again.');
    }
  };
  
  
  const columns = [
    {
      title: 'Sr.No',
      dataIndex: 'srNo',
      key: 'srNo',
      sorter: (a, b) => a.srNo - b.srNo,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => formatDate(text),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<MailOutlined />}
            onClick={() => window.location.href = `mailto:${record.email}?subject=Contact%20Request&body=Hello%20${record.fullName},%0D%0A%0D%0A`}
          />
          <Button
            icon={<PhoneOutlined />}
            onClick={() => window.location.href = `tel:${record.phoneNumber}`}
          />
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Space size="middle">
          <span
            style={{
              color: record.status === 'solved' ? 'green' : 'red',
              fontWeight: 'bold',
            }}
          >
            {record.status === 'solved' ? 'Solved Issue' : 'Unsolved Issue'}
          </span>
          {record.status === 'unsolved' && (
            <Button
              icon={<CheckOutlined />}
              onClick={() => handleStatusChange(record.key)}
            />
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="justify-center items-center min-h-screen mb-2 ml-2 mt-4 md:ml-10">
      <div className="text-start -mt-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 ml-4 mb-4 md:mb-0">Resolve</h1>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/admin/home">Dashboard</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Resolve</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <Table dataSource={dataSource} columns={columns} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contactresolve;
