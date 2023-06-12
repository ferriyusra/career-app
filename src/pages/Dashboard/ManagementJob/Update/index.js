import React, { useEffect, useState } from "react";
import ScaleLoader from 'react-spinners/ScaleLoader';
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Layout,
  Button,
  Col,
  DatePicker,
  Row,
  Space,
  Select,
  Switch,
  Input,
} from "antd";
import {
  LayoutOne,
  FormControl,
} from "upkit";
import { updateJob, getJobById } from "../../../../api/dashboard/job";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DashboardTopbar from "../../../../components/Dashboard/DashboardTopBar";
import DashboardSidebarMenu from "../../../../components/Dashboard/DashboardSidebarMenu";
import DashboardFooter from "../../../../components/Dashboard/DashboardFooter";

const { Content } = Layout;
const { Option } = Select;

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export default function UpdateJob() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Job Name is required"),
    period: Yup.array()
      .required("Job Period is required")
      .min(1, "Job Period is required"),
    jobType: Yup.string().required("Job Type is required"),
    salary: Yup.number()
      .typeError("Salary must be a number")
      .positive("Salary must be positive"),
  });

  const [job, setJob] = useState(null);
  const [description, setEditorData] = useState("");
  const [jobType, setJobType] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [isSalary, setIsSalary] = useState(true);
  const [status, setStatus] = useState(statusList.idle);

  const { params } = useRouteMatch();
  let history = useHistory();

  const notifEdit = () => {
    toast.success("Edit Job Success !", {
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

  const dateAdapter = (dates) => {
    return dates.map((date) => date.toDate());
  };

  const handleDateRangeChange = (dates) => {
    const adaptedDates = dateAdapter(dates);
    setDateRange(adaptedDates);
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  useEffect(() => {
    getJobById(params?.jobId)
      .then(({ data }) => {
        if (data?.data?.erorr) {
          throw new Error(data.data.message || "Terjadi kesalahan");
        }
        setJob(data.data);
      })
      .finally(() => setStatus('idle'));
  }, [params]);

  const onSubmit = async (formData) => {
    try {
      let { name, salary } = formData;

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
        salary,
      };

      setStatus(statusList.process);

      await updateJob(job.id, payload);

      setStatus(statusList.success);
      notifEdit();
      history.push("/dashboard/job");
    } catch (error) {
      setStatus(statusList.error);
    }
  };

  if (status === "process") {
    return (
      <LayoutOne>
        <div className="text-center py-10">
          <div className="inline-block">
            <ScaleLoader color="blue" />
          </div>
        </div>
      </LayoutOne>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <DashboardSidebarMenu />
      <Layout>
        <DashboardTopbar />
        <Layout>
          <Content
            style={{
              margin: "24px 16px 0",
            }}
          >
            {job && (
              <Formik
                initialValues={{
                  name: job?.jobName,
                  period: [moment(job?.periodFromAt), moment(job?.periodToAt)],
                  isSalary: job?.isSalary,
                  salary: job?.salary,
                  jobType: job?.jobType,
                  description: job?.description,
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
                            style={{ width: "100%" }}
                            inputReadOnly
                            getPopupContainer={(trigger) => trigger.parentElement}
                            disabledDate={(current) => current && current < moment().startOf("day")}
                            onChange={(dates) => {
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
                        {status === statusList.process ? 'Update Process' : 'Update'}
                      </Button>
                    </Space>
                  </Form>
                )}
              </Formik>
            )}
          </Content>
          <DashboardFooter />
        </Layout>
      </Layout>
    </Layout>
  );
}
