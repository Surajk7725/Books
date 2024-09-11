import React, { useEffect, useState } from 'react';
import { DownloadOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined, UndoOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Table, Button, Space, Image, Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from './../axiosInstance';

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
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/admin/display');
        const baseURL = process.env.REACT_APP_API_URL;
        const formattedData = response.data.map((admin, index) => ({
          key: admin._id,
          srNo: index + 1,
          image: admin.profilePic ? `${baseURL}${admin.profilePic.replace(/\\/g, '/')}` : 'default-image-url.png',
          fullName: admin.fullName,
          userName: admin.username,
          userRole: admin.role || 'N/A',
          email: admin.email,
          phoneNumber: admin.phoneNumber || 'N/A',
        }));
        setData(formattedData);
      } catch (error) {
        toast.error(`Error fetching admin data: ${error.response?.data?.message || 'Something went wrong'}`);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (userName) => {
    navigate(`/admin/admin-edit/${userName}`);
  };
  
  const handleDelete = async (key, userName) => {
    try {
      await axiosInstance.delete(`/admin/delete/${userName}`);
      toast.success(`Admin with username ${userName} deleted successfully`);
      setData((prevData) => prevData.filter((item) => item.key !== key));
    } catch (error) {
      toast.error(`Error deleting admin: ${error.response?.data?.message || 'Something went wrong'}`);
    }
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
          <Button type="primary" onClick={() => handleEdit(record.userName)}>Edit</Button>
          <Button type="danger" onClick={() => handleDelete(record.key, record.userName)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="justify-center items-center min-h-screen mb-2 ml-2 mt-4 md:ml-10">
      <div className="text-start -mt-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 ml-4 mb-4 md:mb-0">Admin Display</h1>
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
  );
};

export default AdminDisplay;
