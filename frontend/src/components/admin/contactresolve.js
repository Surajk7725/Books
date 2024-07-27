import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Space, Breadcrumb } from 'antd';
import { MailOutlined, PhoneOutlined, CheckOutlined } from '@ant-design/icons';

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
  const initialData = [
    {
      key: '1',
      srNo: 1,
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      message: 'Hello, I need assistance with my account.',
      status: 'unsolved', // Initial status
      date: new Date().toISOString(), 
    },
    {
      key: '2',
      srNo: 2,
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '+0987654321',
      message: 'Can you help me with my recent order?',
      status: 'unsolved', // Initial status
      date: new Date().toISOString(), 
    },
    // Add more data as needed
  ];

  const [dataSource, setDataSource] = useState(initialData);

  const handleStatusChange = (key, status) => {
    setDataSource((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, status } : item
      )
    );
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
      sorter: (a,b) => a.date - b.date,
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
          <Button
            icon={<CheckOutlined />}
            onClick={() => handleStatusChange(record.key, 'solved')}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="text-start -mt-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 ml-4">Resolve</h1>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/admin/home">Dashboard</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Resolve</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Contactresolve;

