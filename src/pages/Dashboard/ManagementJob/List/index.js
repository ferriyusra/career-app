import React, { useEffect, useState } from "react";
import CreateJob from "../Create";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import { Link } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchOutlined } from "@ant-design/icons";
import { Pagination } from "upkit";
import { Layout, Button, Input, Table, Space, message, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobs,
  setPerPage,
  goToNextPage,
  goToPrevPage,
} from "../../../../features/Dashboard/Jobs/actions";
import { deleteJob } from "../../../../api/dashboard/job";

const { Content } = Layout;
const { Search } = Input;

export default function ListJobs() {

  const columns = [
    {
      title: 'No.',
      dataIndex: 'counter',
      key: 'counter',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Job Name',
      dataIndex: 'jobName',
      key: 'jobName',
    },
    {
      title: 'Job Period',
      dataIndex: 'jobPeriod',
      key: 'jobPeriod',
      render: (_, record) => (
        <span>
          {`${moment(record.jobPeriodFrom).utcOffset('+0700').format('YYYY-MM-DD HH:mm:ss')} to ${moment(record.jobPeriodTo).utcOffset('+0700').format('YYYY-MM-DD HH:mm:ss')}`}
        </span>
      ),
    },
    {
      title: 'Job Description',
      dataIndex: 'jobDescription',
      key: 'jobDescription',
      render: (text) => {
        if (text.length > 50) {
          return text.substring(0, 50) + '...';
        }
        return text;
      },
    },
    {
      title: 'Job Salary',
      dataIndex: 'jobSalary',
      key: 'jobSalary',
    },
    {
      title: 'Job Salary Showing',
      dataIndex: 'jobIsSalary',
      key: 'jobIsSalary',
      render: (jobIsSalary) => (jobIsSalary ? 'Gaji ditampilkan' : 'Gaji tidak ditampilkan')
    },
    {
      title: 'Job Type',
      dataIndex: 'jobType',
      key: 'jobType',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <Link to={`/dashboard/update-job/${record.id}`}>
            <Button
              ghost
              type="primary"
              className="custom-button"
              icon={<EditOutlined />}>
              Update Job
            </Button>
          </Link> */}
          <Popconfirm
            title="Delete this job ?"
            description="Are you sure to delete this job?"
            onConfirm={() => handleDelete(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ style: { backgroundColor: 'red', color: 'white' } }}
          >
            <Button danger className="custom-button" icon={<DeleteOutlined />}>Delete Job</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    deleteJob(id);
    notifDelete();
    setDeletestatus(1);
    message.success('Delete Success');
  };

  const cancel = (e) => {
    console.log(e);
    message.error('Delete Cancel');
  };

  const notifDelete = () => {
    toast.success('Delete Job Success !', {
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

  let dispatch = useDispatch();
  let dashboardJobs = useSelector((state) => state.dashboardJobs);
  let [delStatus, setDeletestatus] = useState(0);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch, delStatus, dashboardJobs.page]);

  const isLoading = !dashboardJobs.data;

  return (
    <Content style={{ padding: 24, background: "#FFFFFF", color: "black" }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ flex: 1 }}>
          <CreateJob />
        </div>
        {/* <div style={{ marginLeft: 'auto', marginRight: 16 }}>
          <Search
            placeholder="Cari Pekerjaan..."
            enterButton={<SearchOutlined />}
            style={{ width: 200, maxWidth: '100%' }}
            size="large"
          />
        </div> */}
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <br />
      <br />

      <Table
        columns={columns}
        dataSource={isLoading ? [] : dashboardJobs.data}
        pagination={false}
        bordered
        loading={isLoading} />
      <div style={{ marginTop: 16, textAlign: "right" }}>
        <Pagination
          color="blue"
          totalItems={dashboardJobs.total}
          page={dashboardJobs.page}
          perPage={dashboardJobs.perPage}
          onChange={(page) => dispatch(setPerPage(page))}
          onNext={(_) => dispatch(goToNextPage())}
          onPrev={(_) => dispatch(goToPrevPage())}
        />
      </div>

    </Content>
  )
}