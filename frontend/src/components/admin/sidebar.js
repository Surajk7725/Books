import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Input, Dropdown, Menu } from 'antd';
import { AiOutlineTool } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import { FcLibrary } from "react-icons/fc";
import { FaBookBookmark } from "react-icons/fa6";
import { BellOutlined, SearchOutlined, UserOutlined, DashboardOutlined, SettingOutlined, ProfileOutlined, LoginOutlined, LogoutOutlined, PlusOutlined, ReadOutlined } from '@ant-design/icons';
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

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const menu = (
    <Menu className="max-h-48 overflow-y-auto">
      {notifications.map((notification, index) => (
        <Menu.Item key={index}>{notification}</Menu.Item>
      ))}
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
            Dashboard
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="2" icon={<PlusOutlined />}>Create</Menu.Item>
            <Menu.Item key="3" icon={<ReadOutlined />}>Display</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<FcLibrary />} title="Librarian">
            <Menu.Item key="4" icon={<PlusOutlined />}>Create</Menu.Item>
            <Menu.Item key="5" icon={<ReadOutlined />}>Display</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<GrUserAdmin />} title="Admin">
            <Menu.Item key="6" icon={<PlusOutlined />}>Create</Menu.Item>
            <Menu.Item key="7" icon={<ReadOutlined />}>Display</Menu.Item>
          </SubMenu>
          <Menu.Item key="8" icon={<UserOutlined />}>
              <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          <SubMenu key="sub4" icon={<AiOutlineTool />} title="Authentication">
            <Menu.Item key="10" icon={<LoginOutlined />}>Login</Menu.Item>
            <Menu.Item key="11" icon={<LogoutOutlined />}>Logout</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header className="flex justify-between items-center bg-white p-0">
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
          </div>
        </Header>
        <Content className="m-6">
          <div className="p-6 min-h-screen bg-gray-100 rounded-lg">content</div>
        </Content>
        <Footer className="text-center">
          Book Hub ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
