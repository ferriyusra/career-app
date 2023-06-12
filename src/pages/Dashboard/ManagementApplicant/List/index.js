import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchOutlined } from "@ant-design/icons";
import {
  Layout,
  Button,
  Input,
  Table,
  Space,
  message,
  Popconfirm,
  Pagination,
  Tag
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApplicants,
  setPerPage,
} from "../../../../features/Dashboard/Applicants/actions";
import { deleteJob } from "../../../../api/dashboard/job";

const { Content } = Layout;
const { Search } = Input;

export default function ListApplicants() {

  const columns = [
    {
      title: 'No.',
      dataIndex: 'counter',
      key: 'counter',
      render: (_, __, index) => (dashboardApplicants.page - 1) * dashboardApplicants.perPage + index + 1,
    },
    {
      title: 'Job Name',
      dataIndex: 'jobName',
      key: 'jobName',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Resume / CV',
      dataIndex: 'resume',
      key: 'resume',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let tagColor = '';
        let tagText = '';
        console.log(status)
        if (status === 'process') {
          tagColor = 'cyan';
          tagText = 'Process';
        } else if (status === 'success') {
          tagColor = 'green';
          tagText = 'Hiring';
        } else if (status === 'declined') {
          tagColor = 'red';
          tagText = 'Declined';
        }
        return (
          <Tag color={tagColor}>{tagText}</Tag>
        );
      },
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
            title="Declined this applicant ?"
            description="Are you sure to decline this applicant?"
            onConfirm={() => handleDelete(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ style: { backgroundColor: 'red', color: 'white' } }}
          >
            <Button danger className="custom-button" icon={<DeleteOutlined />}>Decline Applicant</Button>
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
    toast.success('Delete Applicant Success !', {
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
  let dashboardApplicants = useSelector((state) => state.dashboardApplicants);
  let [delStatus, setDeletestatus] = useState(0);

  useEffect(() => {
    dispatch(fetchApplicants());
  }, [dispatch, delStatus, dashboardApplicants.page]);

  const isLoading = !dashboardApplicants.data;

  const totalItems = isLoading ? 0 : dashboardApplicants.data.length;

  return (
    <Content style={{ padding: 24, background: "#FFFFFF", color: "black" }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ flex: 1 }}>
        </div>
        {/* <div style={{ marginLeft: 'auto', marginRight: 16 }}>
          <Search
            placeholder="Search Name Applicant or Job..."
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
        dataSource={isLoading ? [] : dashboardApplicants.data}
        pagination={false}
        bordered
        loading={isLoading} />
      <div style={{ marginTop: 16, textAlign: "right" }}>
        <Pagination
          current={dashboardApplicants.page}
          pageSize={dashboardApplicants.perPage}
          total={dashboardApplicants.total}
          onChange={(current) => dispatch(setPerPage(current))}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${totalItems} items`}
        />
      </div>
    </Content>
  )
}