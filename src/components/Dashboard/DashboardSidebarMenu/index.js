import {
  UserOutlined,
  SolutionOutlined,
  LogoutOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link } from "react-router-dom";
const { Sider } = Layout;

export default function DashboardMenu() {

  return (
    <Sider theme="light" breakpoint="lg" collapsedWidth="0">
      <div style={{ height: 32, background: "#fff", margin: "16px" }}>
        <img
          src="/path/to/your/logo.png"
          alt="Logo"
          style={{ height: "100%", width: "auto" }}
        />
      </div>
      <Menu theme="light" mode="vertical" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<BookOutlined />} title="Dashboard">
          <Link to="/dashboard/job">
            Manage Job
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<SolutionOutlined />} title="Profile">
          Manage Applicants
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />} title="Settings">
          Manage Account
        </Menu.Item>
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