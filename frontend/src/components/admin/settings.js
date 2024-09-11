import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Input, Upload, Button, Image, Row, Col, Breadcrumb, Form } from 'antd';
import {
    UserOutlined,
    PhoneOutlined,
    MailOutlined,
    PlusOutlined,
    InstagramOutlined,
    YoutubeOutlined,
    LinkedinOutlined,
    TwitterOutlined,
} from '@ant-design/icons';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

// Function to convert file to base64
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const SettingsPage = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(false); // Initialize as false
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const { username } = useParams();
    const baseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (!username) {
            toast.error('Username is undefined');
            return;
        }

        const fetchAdminData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/admin/display/${username}`);
                const { socialMediaLinks, profilePic, ...otherData } = response.data;
                form.setFieldsValue({
                    ...otherData,
                    ...socialMediaLinks,
                });
                const profilePicURL = profilePic ? `${baseURL}${profilePic.replace('\\', '/')}` : '';
                setProfileImage(profilePicURL);
            } catch (error) {
                toast.error(`Error fetching admin data: ${error.response?.data?.message || 'Something went wrong'}`);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, [username, form]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        if (newFileList.length > 0) {
            setProfileImage(newFileList[0].url || newFileList[0].thumbUrl);
        } else {
            setProfileImage(null);
        }
    };

    const handleFinish = async (formValues) => {
        try {
            setLoading(true);
            const formData = new FormData();

            if (fileList.length > 0) {
                const file = fileList[0].originFileObj || fileList[0];
                formData.append('profilePic', file);
            }

            for (const key in formValues) {
                if (formValues.hasOwnProperty(key)) {
                    formData.append(key, formValues[key]);
                }
            }

            await axiosInstance.put(`/admin/update/${username}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Admin data updated successfully');
            navigate("/");
        } catch (error) {
            toast.error(`Error updating admin data: ${error.response?.data?.message || 'Something went wrong'}`);
        } finally {
            setLoading(false);
        }
    };

    const uploadButton = (
        <Button className='justify-center' style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </Button>
    );

    return (
        <div className="justify-center items-center min-h-screen mb-2 ml-2 mt-4 md:ml-10">
            <ToastContainer />
            <div className="text-start -mt-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800 ml-4 mb-4 md:mb-0">Settings</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/admin/home">Dashboard</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>Settings</Breadcrumb.Item>
                        <Breadcrumb.Item>Personal Info</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>

            <div className="px-4">
                <Card title="Profile Settings" className="shadow-md" style={{ width: '100%' }}>
                    <Form form={form} layout="vertical" onFinish={handleFinish}>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Form.Item name="fullName" label={<span><UserOutlined className="mr-2" />Full Name</span>}>
                                    <Input placeholder="Full Name" className="w-full p-4 rounded-md bg-gray-100" />
                                </Form.Item>
                                <Form.Item name="username" label={<span><UserOutlined className="mr-2" />Username</span>}>
                                    <Input placeholder="Username" className="w-full p-4 rounded-md bg-gray-100" readOnly />
                                </Form.Item>
                            </div>

                            <Form.Item name="email" label={<span><MailOutlined className="mr-2" />Email Address</span>}>
                                <Input placeholder="Email" className="w-full p-4 rounded-md bg-gray-100" />
                            </Form.Item>
                            <Form.Item name="phoneNumber" label={<span><PhoneOutlined className="mr-2" />Phone Number</span>}>
                                <Input placeholder="Phone Number" className="w-full p-4 rounded-md bg-gray-100" />
                            </Form.Item>

                            <Form.Item name="profilePic" label="Profile Photo">
                                <Row gutter={16} className="flex items-center">
                                    <Col span={12} className="flex justify-center items-center">
                                        <div className="flex flex-col items-center">
                                            <Image
                                                src={profileImage}
                                                width={64}
                                                height={64}
                                                className="h-16 w-16 rounded-full border-2 border-gray-300 object-cover"
                                            />
                                            <div className="mt-2 text-center">Current Profile Picture</div>
                                        </div>
                                    </Col>
                                    <Col span={12} className="flex justify-center items-center">
                                        {/* Upload Image */}
                                        <div className="flex flex-col items-center">
                                            <Upload
                                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                                listType="picture-circle"
                                                fileList={fileList}
                                                onPreview={handlePreview}
                                                onChange={handleChange}
                                            >
                                                {fileList.length >= 1 ? null : uploadButton}
                                            </Upload>
                                            {previewImage && (
                                                <Image
                                                    preview={{
                                                        visible: previewOpen,
                                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                                    }}
                                                    src={previewImage}
                                                    className="mt-2"
                                                />
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Form.Item>

                        </div>

                        <Card title="Social Media Links" className="shadow-md mt-8">
                            <Form.Item name="instagram" label={<span><InstagramOutlined className="mr-2 text-pink-600" />Instagram</span>}>
                                <Input placeholder="Instagram" className="w-full p-4 rounded-md bg-gray-100" />
                            </Form.Item>
                            <Form.Item name="youtube" label={<span><YoutubeOutlined className="mr-2 text-red-600" />YouTube</span>}>
                                <Input placeholder="YouTube" className="w-full p-4 rounded-md bg-gray-100" />
                            </Form.Item>
                            <Form.Item name="linkedin" label={<span><LinkedinOutlined className="mr-2 text-blue-600" />LinkedIn</span>}>
                                <Input placeholder="LinkedIn" className="w-full p-4 rounded-md bg-gray-100" />
                            </Form.Item>
                            <Form.Item name="twitter" label={<span><TwitterOutlined className="mr-2 text-blue-400" />Twitter</span>}>
                                <Input placeholder="Twitter" className="w-full p-4 rounded-md bg-gray-100" />
                            </Form.Item>
                        </Card>

                        <Form.Item>
                            <div className="flex justify-center mt-8">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all duration-200 ease-in-out shadow-md transform hover:scale-105 focus:outline-none flex justify-center items-center"
                                    loading={loading}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default SettingsPage;

