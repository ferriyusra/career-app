import React from "react";
import { Layout } from "antd";

import DashboardTopbar from '../../../components/Dashboard/DashboardTopBar';
import DashboardSidebarMenu from '../../../components/Dashboard/DashboardSidebarMenu';
import DashboardFooter from '../../../components/Dashboard/DashboardFooter';
import ListApplicants from './List'

export default function DashboardApplicant() {

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <DashboardSidebarMenu />
      <Layout>
        <DashboardTopbar />
        <ListApplicants />
        <DashboardFooter />
      </Layout>
    </Layout>
  )
}
