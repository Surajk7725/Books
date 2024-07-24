import React, { useState } from 'react';
import { Layout, Input, Dropdown, Menu } from 'antd';
import { BellOutlined, SearchOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined, DashboardOutlined, SettingOutlined, ProfileOutlined, LoginOutlined, LogoutOutlined, BookOutlined } from '@ant-design/icons';
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
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="p-4 text-white text-center text-xl">Book Hub</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="2">Create</Menu.Item>
            <Menu.Item key="3">Display</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<VideoCameraOutlined />} title="Librarian">
            <Menu.Item key="4">Create</Menu.Item>
            <Menu.Item key="5">Display</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<UploadOutlined />} title="Admin">
            <Menu.Item key="6">Create</Menu.Item>
            <Menu.Item key="7">Display</Menu.Item>
          </SubMenu>
          <Menu.Item key="8" icon={<ProfileOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="9" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          <SubMenu key="sub4" icon={<BookOutlined />} title="Authentication">
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
              className="ml-4 w-64"
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
