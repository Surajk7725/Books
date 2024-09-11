import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Input, Dropdown, Menu, Avatar } from 'antd';
import { FaBookBookmark } from "react-icons/fa6";
import { BellOutlined, SearchOutlined, UserOutlined, DashboardOutlined, SettingOutlined, ProfileOutlined, LoginOutlined, LogoutOutlined, PlusOutlined, ReadOutlined, CustomerServiceOutlined, LockOutlined, DesktopOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';
import NotificationCard from './notification';
import { useAuth } from '../authcontext';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [username, setUsername] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
        setUsername(user.username);
    }
  }, [user]);

  const menu = (
    <div className="max-h-48">
      <NotificationCard />
    </div>
  );

   // Construct the image URL
   const baseURL = process.env.REACT_APP_API_URL;
   const profilePicURL = user.profilePic ? `${baseURL}${user.profilePic.replace('\\', '/')}` : '';



  const dropdown = (
    <Menu>
      <Menu.Item key="1" icon={<ProfileOutlined />}>
        <Link to={`/admin/profile/${username}`}> View Profile</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} className="text-red-500">
        <Link to="/">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
     <Layout className="min-h-screen overflow-x-hidden">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width="calc(225px + 1cm)"
        className="px-4"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="p-4 text-white text-center text-xl mb-8 flex items-center justify-center">
          <FaBookBookmark className="mr-2" />
          <span className="ml-2">Book Hub</span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />} className="mt-2">
            <Link to="/admin/home">Dashboard</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="2" icon={<PlusOutlined />}>
              <Link to="/admin/user-create">Create</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<DesktopOutlined />}>
              <Link to="/admin/user-display">Display</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<UserOutlined />} title="Librarian">
            <Menu.Item key="4" icon={<PlusOutlined />}>
              <Link to="/admin/staff-create">Create</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<DesktopOutlined />}>
              <Link to="/admin/staff-display">Display</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<UserOutlined />} title="Admin">
            <Menu.Item key="6" icon={<PlusOutlined />}>
              <Link to="/admin/admin-create">Create</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<DesktopOutlined />}>
              <Link to="/admin/admin-display">Display</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="8" icon={<CustomerServiceOutlined />}>
            <Link to="/admin/contact-resolve">Resolve</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<ReadOutlined />}>
            <Link to="/admin/books">Books</Link>
          </Menu.Item>
          <Menu.Item key="10" icon={<UserOutlined />}>
            <Link to={`/admin/profile/${username}`}>Profile</Link>
          </Menu.Item>
          <SubMenu key="sub4" icon={<SettingOutlined />} title="Settings">
            <Menu.Item key="11" icon={<UserOutlined />}>
              <Link to={`/admin/settings/${username}`}>Personal Information</Link>
            </Menu.Item>
            <Menu.Item key="12" icon={<LockOutlined />}>
              <Link to="/admin/security">Security</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" icon={<SettingOutlined />} title="Authentication">
            <Menu.Item key="13" icon={<LoginOutlined />}>
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="14" icon={<LogoutOutlined />}>
              <Link to="/">Logout</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="flex flex-col h-screen">
        <Header className="flex justify-between items-center bg-white p-0 h-20">
          <div className="flex items-center">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-4 w-64 md:ml-24"
            />
          </div>
          <div className="flex items-center mr-4">
            <Dropdown overlay={menu} trigger={['click']}>
              <BellOutlined className="text-2xl cursor-pointer" />
            </Dropdown>
            <div className="w-4 md:w-[1.0cm]"></div>
            <Dropdown overlay={dropdown} trigger={['click']}>
              <Avatar
                src={profilePicURL}
                className="cursor-pointer h-10 w-10 rounded-full border-2 border-gray-300 object-cover"
                size="large"
              />
            </Dropdown>
          </div>
        </Header>
        <Content className="flex-grow m-4 mt-12 overflow-y-scroll">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Outlet />
          </div>
          <Footer className="text-center mt-4 md:mt-8">
            Book Hub ©{new Date().getFullYear()}
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;










