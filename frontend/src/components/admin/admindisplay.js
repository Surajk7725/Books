import React from 'react';
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Table, Button, Space, Image, Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const onDownload = (imgUrl) => {
  fetch(imgUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'image.png';
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
      link.remove();
    });
};

const AdminDisplay = () => {
  const navigate = useNavigate();

  const handleEdit = (key) => {
    navigate(`/admin/admin-edit/${key}`);
  };

  const handleDelete = (key) => {
    toast.success(`User with key ${key} deleted successfully`);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: 'Sr.No',
      dataIndex: 'srNo',
      key: 'srNo',
      sorter: (a, b) => a.srNo - b.srNo,
    },
    {
      title: 'User Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <Image
          width={50}
          height={50}
          src={image}
          className="rounded-full object-cover"
          preview={{
            toolbarRender: (
              _,
              {
                image: { url },
                transform: { scale },
                actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn, onReset },
              },
            ) => (
              <Space size={12} className="toolbar-wrapper">
                <DownloadOutlined onClick={() => onDownload(url)} />
                <SwapOutlined rotate={90} onClick={onFlipY} />
                <SwapOutlined onClick={onFlipX} />
                <RotateLeftOutlined onClick={onRotateLeft} />
                <RotateRightOutlined onClick={onRotateRight} />
                <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                <UndoOutlined onClick={onReset} />
              </Space>
            ),
          }}
        />
      ),
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      sorter: (a, b) => a.userName.localeCompare(b.userName),
    },
    {
        title: 'Role',
        dataIndex: 'userRole',
        key: 'userRole',
        sorter: (a, b) => a.userRole.localeCompare(b.userRole),
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
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record.key)}>Edit</Button>
          <Button type="danger" onClick={() => handleDelete(record.key)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
        key: '1',
        srNo: 1,
        image: 'https://wallpapers.com/images/hd/yuuichi-katagiri-anime-portrait-5xl430n009kmsg7l.jpg',
        fullName: 'John Brown',
        userName: 'johnbrown',
        userRole: 'Owner',
        email: 'john.brown@example.com',
        phoneNumber: '123-456-7890',
      },
      {
        key: '2',
        srNo: 2,
        image: 'https://i.pinimg.com/originals/84/d3/fa/84d3fa68414aecbc3172909302cb5144.jpg',
        fullName: 'Jim Green',
        userName: 'jimgreen',
        userRole: 'CFO',
        email: 'jim.green@example.com',
        phoneNumber: '123-456-7891',
      },
      {
        key: '3',
        srNo: 3,
        image: 'https://i.pinimg.com/736x/b3/ec/2c/b3ec2c350eafdab61055934f47f05b02.jpg',
        fullName: 'Joe Black',
        userName: 'joeblack',
        userRole: 'CEO',
        email: 'joe.black@example.com',
        phoneNumber: '123-456-7892',
      },
      {
        key: '4',
        srNo: 4,
        image: 'https://dthezntil550i.cloudfront.net/ec/latest/ec2305160145567360024742816/1280_960/33c8e334-53bd-4beb-8ef4-8873b4468ce2.png',
        fullName: 'Jim Red',
        userName: 'jimred',
        userRole: 'Assistant',
        email: 'jim.red@example.com',
        phoneNumber: '123-456-7893',
      },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden bg-gray-100">
    <div className="w-full max-w-6xl px-4">
      <div className="text-start -mt-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 ml-4">Admin Display</h1>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/admin/home">Dashboard</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Display Admin</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <Table columns={columns} dataSource={data} onChange={onChange} pagination={{ pageSize: 5 }} />
      </div>
      <ToastContainer />
    </div>
    </div>
  );
};

export default AdminDisplay;

