import React, { useEffect, useState } from "react";
import moment from 'moment';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { rules } from "./validation";
import { updateJob } from '../../../../api/dashboard/job';
import {
  Layout,
  Button,
  Col,
  DatePicker,
  Row,
  Space,
  Select,
  Switch,
} from 'antd';
import {
  FormControl,
  InputText
} from 'upkit';

import DashboardTopbar from '../../../../components/Dashboard/DashboardTopBar';
import DashboardSidebarMenu from '../../../../components/Dashboard/DashboardSidebarMenu';
import DashboardFooter from '../../../../components/Dashboard/DashboardFooter';

const { Content } = Layout;
const { Option } = Select;

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export default function UpdateJob() {

  const [editorData, setEditorData] = useState(null);
  const [jobType, setJobType] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [status, setStatus] = useState(statusList.idle);
  const [isSalary, setIsSalary] = useState(true);
  const { handleSubmit, register, errors, setValue, watch, getValue } = useForm();

  const notifEdit = () => {
    toast.success('Edit Job Success !', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: null,
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const onChangeInputSalary = (checked) => {
    setIsSalary(checked);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const onSubmit = async (data) => {
    try {
      let {
        name,
        salary
      } = data;

      if (!salary) {
        salary = 0;
      }

      const payload = {
        name,
        periodFromAt: dateRange[0].format(),
        periodToAt: dateRange[1].format(),
        jobType,
        description: editorData,
        isSalary,
        salary
      };

      setStatus(statusList.process);

      await updateJob(payload);

      setStatus(statusList.success);
      notifEdit();
    } catch (error) {
      setStatus(statusList.error);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <DashboardSidebarMenu />
      <Layout>
        <DashboardTopbar />
        <Layout >
          <Content
            style={{
              margin: '24px 16px 0',
            }}
          >
            <form layout="vertical" onSubmit={handleSubmit(onSubmit)}>
              <Row gutter={16}>
                <Col span={12}>
                  <FormControl
                    label='Job Name or Job Position'
                    color='black'
                    errorMessage={errors.name?.message}>
                    <InputText
                      fitContainer
                      name="name"
                      placeholder="Please enter job name or job position"
                      ref={register(rules.name)}
                    />
                  </FormControl>
                </Col>
                <Col span={12}>
                  <FormControl
                    label='Job Period'
                    color='black'
                    errorMessage={errors.period?.message}
                  >
                    <DatePicker.RangePicker
                      style={{
                        width: '100%',
                      }}
                      getPopupContainer={(trigger) => trigger.parentElement}
                      disabledDate={(current) => current && current < moment().startOf('day')}
                      onChange={handleDateRangeChange}
                    />
                  </FormControl>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <FormControl
                    color='black'
                    name="isSalary"
                    label="Salary want to showing?"
                  >
                    <Switch
                      checkedChildren="show salary"
                      unCheckedChildren="dont show salary"
                      defaultChecked
                      onChange={onChangeInputSalary}
                    />
                  </FormControl>
                </Col>
                <Col span={12}>
                  {isSalary && (
                    <FormControl
                      label="Salary"
                      color='black'
                    >
                      <InputText
                        fitContainer
                        placeholder='Please input the salary'
                        name='salary'
                        ref={register(rules.salary)}
                      />
                    </FormControl>
                  )}
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <FormControl
                    name="jobType"
                    label="Job Type"
                    color='black'
                    errorMessage={errors.jobType?.message}
                  >
                    <Select
                      name="jobType"
                      placeholder="Please choose the job type available"
                      onChange={value => setJobType(value)}
                      value={jobType}
                    >
                      <Option value="full time">Full Time</Option>
                      <Option value="contract">Contract</Option>
                      <Option value="freelance">Freelance</Option>
                      <Option value="internship">Internship</Option>
                    </Select>
                  </FormControl>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <FormControl
                    name="description"
                    label="Description about the job"
                    color='black'
                  >
                    <CKEditor
                      name="description"
                      editor={ClassicEditor}
                      data={editorData}
                      onChange={(_event, editor) => {
                        const data = editor.getData();
                        setEditorData(data);
                      }}
                    />
                  </FormControl>
                </Col>
              </Row>
              <Space>
                <Button
                  htmlType="submit"
                  type="primary"
                  ghost
                >
                  Submit
                </Button>
              </Space>
            </form>
          </Content>
        </Layout>
        <DashboardFooter />
      </Layout>
    </Layout>
  )
}