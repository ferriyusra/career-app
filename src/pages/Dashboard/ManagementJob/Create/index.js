import React from 'react'
// import DashboardTopbar from '../../../../components/Dashboard/DashboardTopBar';
// import DashboardSidebarMenu from '../../../../components/Dashboard/DashboardSidebarMenu';
// import DashboardFooter from '../../../../components/Dashboard/DashboardFooter';

import { Layout } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  InputNumber
} from 'antd';
import { useState } from 'react';
const { Option } = Select;


export default function CreateJob() {

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <>
      <Button
        onClick={showDrawer}
        type="primary"
        icon={<PlusOutlined />}
        ghost>
        Create Data
      </Button>
      <Layout>
        <Drawer
          title="Create a new job post"
          width={720}
          onClose={onClose}
          open={open}
          bodyStyle={{
            paddingBottom: 80,
          }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={onClose} type="primary" ghost>
                Submit
              </Button>
            </Space>
          }
        >
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Job Name or Job Position"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter job name or job position',
                    },
                  ]}
                >
                  <Input placeholder="Please enter job name or job position" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="periodFromAt"
                  label="Period This Job Available"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the dateTime',
                    },
                  ]}
                >
                  <DatePicker.RangePicker
                    style={{
                      width: '100%',
                    }}
                    getPopupContainer={(trigger) => trigger.parentElement}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="isSalary"
                  label="Salary want to showing ?"
                  rules={[
                    {
                      required: true,
                      message: 'Please select an owner',
                    },
                  ]}
                >
                  <Switch primary ghost defaultChecked onChange={onChange} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="salary"
                  label="Salary"
                  rules={[
                    {
                      required: true,
                      message: 'Please input salary',
                    },
                  ]}
                >
                  <InputNumber min={1000000} max={100000000} defaultValue={0} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="jobType"
                  label="Job Type"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the job type available',
                    },
                  ]}
                >
                  <Select placeholder="Please choose the job type available">
                    <Option value="full time">Full Time</Option>
                    <Option value="contract">Contract</Option>
                    <Option value="freelance">Freelance</Option>
                    <Option value="internship">Internship</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'please enter url description',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="please enter url description" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </Layout>
    </>
  )
}