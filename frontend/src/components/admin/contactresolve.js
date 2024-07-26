import React from 'react';
import { Table, Button, Space } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

const Contactresolve = () => {
  const dataSource = [
    {
      key: '1',
      srNo: 1,
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      message: 'Hello, I need assistance with my account.',
    },
    {
      key: '2',
      srNo: 2,
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '+0987654321',
      message: 'Can you help me with my recent order?',
    },
    // Add more data as needed
  ];

  const columns = [
    {
      title: 'Sr.No',
      dataIndex: 'srNo',
      key: 'srNo',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
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
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Contactresolve;
