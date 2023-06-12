import React, { useEffect, useState } from "react";
import ScaleLoader from 'react-spinners/ScaleLoader';
import moment from 'moment';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouteMatch, useHistory, Link } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { updateJob, getJobById } from '../../../../api/dashboard/job';
import {
  Input,
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
  LayoutOne,
  FormControl,
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

  const validationSchema = Yup.object().shape(
    {
      name: Yup.string().required('Job Name is required'),
      period: Yup.array()
        .required('Job Period is required')
        .min(1, 'Job Period is required'),
      jobType: Yup.string().required('Job Type is required'),
      salary: Yup.number().typeError('Salary must be a number').positive('Salary must be positive'),
    }
  );

  const [job, setJob] = useState(null);
  const [description, setEditorData] = useState('');
  const [jobType, setJobType] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [open, setOpen] = useState(false);
  const [isSalary, setIsSalary] = useState(true);
  const [status, setStatus] = useState(statusList.idle);

  const { params } = useRouteMatch();
  let history = useHistory();

  const dateAdapter = (dates) => {
    return dates.map((date) => date.toDate());
  };

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

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };


  useEffect(() => {

    getJobById(params?.jobId)
      .then((data) => {
        if (data.error) {
          return <LayoutOne>
            <div className="text-center py-10">
              <div className="inline-block">
                {data.message || "Terjadi kesalahan"}
              </div>
            </div>
          </LayoutOne>
        }

        setJob(data);
      })
      .finally(() => setStatus('idle'));

  }, [params]);

  const onSubmit = async (formData) => {
    try {
      let {
        name,
        salary
      } = formData;

      if (!salary) {
        salary = 0;
      }

      const payload = {
        name,
        periodFromAt: dateRange[0].format(),
        periodToAt: dateRange[1].format(),
        jobType,
        description,
        isSalary,
        salary
      };

      setStatus(statusList.process);

      // await updateJob(job.id, payload);

      setStatus(statusList.success);
      notifEdit();
      history.push('/dashboard/job')
    } catch (error) {
      setStatus(statusList.error);
    }
  };

  if (status === 'process') {
    return <LayoutOne>
      <div className="text-center py-10">
        <div className="inline-block">
          <ScaleLoader color="blue" />
        </div>
      </div>
    </LayoutOne>
  }

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
            <Formik
              initialValues={{
                name: '',
                period: [],
                isSalary: true,
                salary: '',
                jobType: '',
                description: '',
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, handleSubmit, setFieldValue, errors, touched }) => (
                <Form layout="vertical" onSubmit={handleSubmit}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <FormControl
                        label="Job Name or Job Position"
                        color="black"
                        errorMessage={
                          errors && errors.name && touched.name && errors.name
                        }
                      >
                        <Field
                          as={Input}
                          name="name"
                          placeholder="Please enter job name or job position"
                        />
                      </FormControl>
                    </Col>
                    <Col span={12}>
                      <FormControl
                        label="Job Period"
                        color="black"
                        errorMessage={errors && errors.period && touched.period && errors.period}
                      >
                        <DatePicker.RangePicker
                          style={{
                            width: '100%',
                          }}
                          inputReadOnly
                          getPopupContainer={(trigger) => trigger.parentElement}
                          disabledDate={(current) =>
                            current && current < moment().startOf('day')
                          }
                          onChange={(dates) => {
                            setFieldValue('period', dateAdapter(dates));
                            handleDateRangeChange(dates);
                          }}
                          value={dateRange}
                        />
                      </FormControl>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <FormControl
                        color="black"
                        label="Salary want to showing?"
                        errorMessage={errors && errors.isSalary && touched.salary && errors.isSalary}

                      >
                        <Switch
                          checkedChildren="show salary"
                          unCheckedChildren="dont show salary"
                          defaultChecked
                          onChange={onChangeInputSalary}
                          style={{
                            backgroundColor: '#4096ff',
                            borderColor: '#e8e8e8',
                            color: '#999999',
                          }}
                        />
                      </FormControl>
                    </Col>
                    <Col span={12}>
                      {isSalary && (
                        <FormControl
                          label="Salary"
                          color="black"
                          errorMessage={errors && errors.salary && touched.salary && errors.salary}
                        >
                          <Field
                            as={Input}
                            placeholder="Please input the salary"
                            name="salary"
                          />
                        </FormControl>
                      )}
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <FormControl
                        label="Job Type"
                        color="black"
                        errorMessage={
                          errors && errors.jobType && touched.jobType && errors.jobType
                        }
                      >
                        <Field
                          style={{
                            width: '100%',
                          }}
                          as={Select}
                          name="jobType"
                          placeholder="Please choose the job type available"
                          onChange={(value) => {
                            setFieldValue('jobType', value);
                            setJobType(value);
                          }}
                          value={values.jobType}
                        >
                          <Option value="full time">Full Time</Option>
                          <Option value="contract">Contract</Option>
                          <Option value="freelance">Freelance</Option>
                          <Option value="internship">Internship</Option>
                        </Field>
                      </FormControl>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <FormControl
                        label="Description about the job"
                        color="black"
                        errorMessage={
                          errors && errors.description && touched.description && errors.description
                        }
                      >
                        <CKEditor
                          name="description"
                          editor={ClassicEditor}
                          data={description}
                          onChange={handleEditorChange}
                        />
                      </FormControl>
                    </Col>
                  </Row>
                  <Space>
                    <Link to="/dashboard/job">
                      <Button>Cancel</Button>
                    </Link>
                    <Button
                      htmlType="submit"
                      disabled={status === statusList.process}
                      type="primary"
                      ghost
                    >
                      {status === statusList.process ? 'Submit Process' : 'Submit'}
                    </Button>
                  </Space>
                </Form>
              )}
            </Formik>
          </Content>
        </Layout>
        <DashboardFooter />
      </Layout>
    </Layout>
  )
}
