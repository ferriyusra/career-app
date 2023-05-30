
import { Layout } from 'antd';
import React from 'react';
const { Footer } = Layout;

export default function DashboardFooter() {
  const colorBgContainer = '#ffffff';

  return (
    <>
      <Footer style={{ textAlign: 'center', background: colorBgContainer }}>
        Job Carrer
      </Footer>
    </>
  )
}