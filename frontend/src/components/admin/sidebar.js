import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Input, Dropdown, Menu, Avatar } from 'antd';
import { AiOutlineTool } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import { FcLibrary } from "react-icons/fc";
import { FaBookBookmark } from "react-icons/fa6";
import { BellOutlined, SearchOutlined, UserOutlined, DashboardOutlined, SettingOutlined, ProfileOutlined, LoginOutlined, LogoutOutlined, PlusOutlined, ReadOutlined, FacebookOutlined, LockOutlined, DesktopOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const notifications = [
  ' Lorem ipsum dolor sit amet.',
  ' Consectetur adipiscing elit.',
  ' Integer nec odio.',
  ' Praesent libero.',
  ' Sed cursus ante dapibus diam.',
  ' Sed nisi.',
  ' Nulla quis sem at nibh elementum imperdiet.',
  ' Duis sagittis ipsum.',
  'Praesent mauris.',
  ' Fusce nec tellus sed augue semper porta.',
];

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const menu = (
    <Menu className="max-h-48 overflow-y-auto">
      {notifications.map((notification, index) => (
        <Menu.Item key={index}>{notification}</Menu.Item>
      ))}
    </Menu>
  );

  const dropdown = (
    <Menu>
      <Menu.Item key="1" icon={<ProfileOutlined />}>
        <Link to="/admin/profile"> View Profile</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} className="text-red-500">
        <Link to="/">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="min-h-screen">
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
          <SubMenu key="sub2" icon={<FcLibrary />} title="Librarian">
            <Menu.Item key="4" icon={<PlusOutlined />}>
              <Link to="/admin/staff-create">Create</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<DesktopOutlined />}>
              <Link to="/admin/staff-display">Display</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<GrUserAdmin />} title="Admin">
            <Menu.Item key="6" icon={<PlusOutlined />}>
              <Link to="/admin/admin-create">Create</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<DesktopOutlined />}>
              <Link to="/admin/admin-display">Display</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="8" icon={<ReadOutlined />} title="Books">
            <Link to="/admin/books">Books</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<UserOutlined />} title="Profile">
            <Link to="/admin/profile">Profile</Link>
          </Menu.Item>

          <SubMenu key="sub4" icon={<SettingOutlined />} title="Settings">
            <Menu.Item key="10" icon={<UserOutlined />}>
              <Link to="/admin/settings">Personal Information</Link>
            </Menu.Item>
            <Menu.Item key="11" icon={<LockOutlined />}>
              <Link to="/admin/security">Security</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub5" icon={<AiOutlineTool />} title="Authentication">
            <Menu.Item key="13" icon={<LoginOutlined />}>
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="14" icon={<LogoutOutlined />}>
              <Link to="/">Logout</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header className="flex justify-between items-center bg-white p-0 h-20">
          <div className="flex items-center">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-24 w-64"
            />
          </div>

          <div className="flex items-center mr-4">
            <Dropdown overlay={menu} trigger={['click']}>
              <BellOutlined className="text-2xl cursor-pointer" />
            </Dropdown>
            <div className="w-[1.0cm]"></div>
            <Dropdown overlay={dropdown} trigger={['click']}>
              <Avatar src="https://wallpapers.com/images/hd/yuuichi-katagiri-anime-portrait-5xl430n009kmsg7l.jpg" className="cursor-pointer" size="large" />
            </Dropdown>
          </div>
        </Header>
        <Content className="m-4">
          <div className="p-2 min-h-screen bg-gray-100 rounded-lg">
            <Outlet />
          </div>
        </Content>
        <Footer className="text-center">
          Book Hub ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Sidebar;








