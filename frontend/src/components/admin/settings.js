import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Input, Upload, Button, Image, Row, Col, Typography, Breadcrumb } from 'antd';
import {
    UserOutlined,
    PhoneOutlined,
    MailOutlined,
    PlusOutlined,
    InstagramOutlined, YoutubeOutlined, LinkedinOutlined, TwitterOutlined,
} from '@ant-design/icons';

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

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => {
        const updatedFileList = newFileList.map(file => {
            if (file.status === 'error') {
                return { ...file, status: 'done' };
            }
            return file;
        });

        setFileList(updatedFileList);

        if (updatedFileList.length > 0) {
            setProfileImage(updatedFileList[0].url || updatedFileList[0].thumbUrl);
        } else {
            setProfileImage(null);
        }
    };

    const uploadButton = (
        <Button className='justify-center'
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </Button>
    );

    return (

        <div className="justify-center items-center bg-gray-100 min-h-screen ml-4 lg:ml-12 mb-2">
            <div className="text-start -mt-4 mb-8 px-4">
                <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4 lg:mb-0 ml-4">Settings</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/admin/home">Dashboard</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>Settings</Breadcrumb.Item>
                        <Breadcrumb.Item>Personal Info</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">

                {/* Personal Information Section */}
                <Card title="Personal Information" className="shadow-md col-span-1 lg:col-span-2">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-lg font-thin mb-1" htmlFor="fullName">
                                    <UserOutlined className="mr-2" />
                                    Full Name
                                </label>
                                <Input id="fullName" placeholder="Full Name" className="w-full p-4 rounded-md bg-gray-100" />
                            </div>
                            <div>
                                <label className="block text-lg font-thin mb-1" htmlFor="username">
                                    <UserOutlined className="mr-2" />
                                    Username
                                </label>
                                <Input id="username" placeholder="Username" className="w-full p-4 rounded-md bg-gray-100" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-thin mb-1" htmlFor="email">
                                <MailOutlined className="mr-2" />
                                Email Address
                            </label>
                            <Input id="email" placeholder="Email" className="w-full p-4 rounded-md bg-gray-100" />
                        </div>
                        <div>
                            <label className="block text-lg font-thin mb-1" htmlFor="phoneNumber">
                                <PhoneOutlined className="mr-2" />
                                Phone Number
                            </label>
                            <Input id="phoneNumber" placeholder="Phone Number" className="w-full p-4 rounded-md bg-gray-100" />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6 space-x-4">
                        <Button className="bg-gray-300 text-gray-700 hover:bg-gray-400 h-10">Cancel</Button>
                        <Button type="primary" className="h-10">Submit</Button>
                    </div>
                </Card>

                <div className="col-span-1 space-y-8">
                    {/* Your Photo Section */}
                    <Card title="Your Photo" className="shadow-md">
                        <Row>
                            <Col span={24} className="flex flex-col items-center">
                                <div className="mt-2 flex flex-col items-center">
                                    <Image
                                        src="https://wallpapers.com/images/hd/yuuichi-katagiri-anime-portrait-5xl430n009kmsg7l.jpg"
                                        width={64}
                                        height={64}
                                        className="rounded-full"
                                    />
                                    <div className="mt-4 flex justify-center">
                                        <Upload
                                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                            listType="picture-circle"
                                            fileList={fileList}
                                            onPreview={handlePreview}
                                            onChange={handleChange}
                                        >
                                            {fileList.length >= 1 ? null : uploadButton}
                                        </Upload>
                                    </div>
                                    {previewImage && (
                                        <Image
                                            wrapperStyle={{
                                                display: 'none',
                                            }}
                                            preview={{
                                                visible: previewOpen,
                                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                            }}
                                            src={previewImage}
                                        />
                                    )}
                                </div>
                            </Col>
                            <Typography.Title level={5} className="mt-6 text-center lg:mt-0 lg:ml-18">
                                Edit your Picture
                            </Typography.Title>
                            <Col span={24} className="flex justify-center items-center mt-12 lg:mt-12">
                                <Button type="default" className="mr-4">Cancel</Button>
                                <Button type="primary">Save</Button>
                            </Col>
                        </Row>
                    </Card>
                </div>

            </div>

            {/* Add gap here */}
            <div className="mt-12 w-full px-4">

                {/* Social Media Section */}
                <Card title="Social Media" className="shadow-md col-span-1 lg:col-span-2">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-lg font-thin mb-1" htmlFor="instagram">
                                    <InstagramOutlined className="mr-2 text-pink-600 h-6 w-6" />
                                    Instagram
                                </label>
                                <Input id="instagram" placeholder="Instagram" className="w-full p-4 rounded-md bg-gray-100" />
                            </div>
                            <div>
                                <label className="block text-lg font-thin mb-1" htmlFor="youtube">
                                    <YoutubeOutlined className="mr-2 text-red-600 h-6 w-6" />
                                    YouTube
                                </label>
                                <Input id="youtube" placeholder="YouTube" className="w-full p-4 rounded-md bg-gray-100" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-lg font-thin mb-1" htmlFor="linkedin">
                                    <LinkedinOutlined className="mr-2 text-blue-400 h-6 w-6" />
                                    LinkedIn
                                </label>
                                <Input id="linkedin" placeholder="LinkedIn" className="w-full p-4 rounded-md bg-gray-100" />
                            </div>
                            <div>
                                <label className="block text-lg font-thin mb-1" htmlFor="twitter">
                                    <TwitterOutlined className="mr-2 text-blue-700 h-6 w-6" />
                                    Twitter
                                </label>
                                <Input id="twitter" placeholder="Twitter" className="w-full p-4 rounded-md bg-gray-100" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6 space-x-4">
                        <Button className="bg-gray-300 text-gray-700 hover:bg-gray-400 h-10">Cancel</Button>
                        <Button type="primary" className="h-10">Submit</Button>
                    </div>
                </Card>

            </div>
        </div>

    );
};

export default SettingsPage;

