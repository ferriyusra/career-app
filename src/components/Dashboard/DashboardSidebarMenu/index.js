import {
  FolderOutlined,
  UserOutlined,
  SolutionOutlined,
  LogoutOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, useLocation } from "react-router-dom";
const { Sider } = Layout;

export default function DashboardMenu() {
  const location = useLocation();

  const menuItems = [
    {
      key: "1",
      path: "/dashboard/job",
      label: "Manage Jobs",
      icon: <BookOutlined />
    },
    {
      key: "2",
      path: "/dashboard/applicants",
      label: "Manage Applicants",
      icon: <SolutionOutlined />
    },
    {
      key: "3",
      path: "/jobs",
      label: "Jobs",
      icon: <FolderOutlined />
    },
  ];

  return (
    <Sider theme="light" breakpoint="lg" collapsedWidth="0">
      <div style={{ height: 32, background: "#fff", margin: "16px" }}>
        <img
          src="/path/to/your/logo.png"
          alt="Logo"
          style={{ height: "100%", width: "auto" }}
        />
      </div>
      <Menu theme="light" mode="vertical" selectedKeys={[location.pathname]}>
        {menuItems.map((item) => (
          <Menu.Item key={item.path} icon={item.icon} title={item.label}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <Menu theme="light" mode="vertical">
          <Menu.Item key="4" icon={<LogoutOutlined />} title="Logout">
            <Link to="/logout">
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  )
}