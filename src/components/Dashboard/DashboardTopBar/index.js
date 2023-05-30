import React from 'react';
import { Link } from 'react-router-dom'
import { Layout, Button } from 'antd';
import { useSelector } from 'react-redux';

const { Header } = Layout;

const DashboardTopBar = () => {
  let auth = useSelector(state => state.auth);

  return (
    <Header
      style={{
        background: "#fff",
        padding: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <span style={{ marginRight: 10, color: "black" }}>Hello, {auth?.user}</span>
      </div>
      <Link to="/logout">
        Logout
      </Link>
    </Header>
  );
};

export default DashboardTopBar;
