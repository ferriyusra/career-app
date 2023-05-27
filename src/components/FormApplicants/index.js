import React from "react";
import { useForm } from "react-hook-form";
import { sendApplicants } from "../../api/applicants";
import { useRouteMatch, useHistory } from "react-router-dom";
import { rules } from "./validation";
import {
  FormControl,
  InputText,
  Button,
} from "upkit";
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export default function FormApplicants() {
  let { params } = useRouteMatch();
  const jobId = params?.jobId;

  let { handleSubmit, register, errors, watch } = useForm();
  let [status, setStatus] = React.useState(statusList.idle);
  const [resume, setResume] = React.useState([]);

  watch();

  let history = useHistory();

  const handleChangePhoneNumber = (event) => {
    const inputValue = event.target.value;

    if (inputValue === '08' || inputValue === '62') {
      event.target.value = '62';
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  }

  const handleFileChange = ({ fileList }) => {
    setResume(fileList);
  };

  const handleFileRemove = (file) => {
    const newFileList = resume.filter((f) => f.uid !== file.uid);
    setResume(newFileList);
  };

  const onSubmit = async (formHook) => {
    try {
      let payload = new FormData();

      payload.append("firstName", formHook.firstName);
      payload.append("lastName", formHook.lastName);
      payload.append("email", formHook.email);
      payload.append("phoneNumber", `62${formHook.phoneNumber}`);
      payload.append('resume', resume[0].originFileObj);

      await sendApplicants(jobId, payload);

      history.push(`/success-send-applicants`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setStatus(statusList.error);
      } else {
        setStatus(statusList.error);
      }
    }
  };

  return (
    <section className="h-full w-full border-box transition-all duration-500 linear" >
      <div className="content-8-1">
        <div className="flex flex-col items-center h-full lg:flex-row">
          <div className="flex w-full h-full px-8 width-right sm:px-16 py-16 lg:mx-0 mx-auto items-left justify-left bg-medium-white">
            <div className="w-full sm:w-7/8 md:w-7/8 lg:w-7/8 xl:w-7/8 mx-auto lg:mx-0">
              <h3 className="text-3xl font-semibold mb-3">
                Lengkapi data dibawah ini
              </h3>
              <p className="caption leading-7 text-sm">
                Mohon untuk melengkapi data yang dibutuhkan
              </p>

              <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl errorMessage={errors.firstName?.message}>
                    <InputText
                      name="firstName"
                      placeholder="Nama depan"
                      fitContainer
                      ref={register(rules.firstName)}
                    />
                  </FormControl>

                  <FormControl errorMessage={errors.lastName?.message}>
                    <InputText
                      name="lastName"
                      placeholder="Nama belakang"
                      fitContainer
                      ref={register(rules.lastName)}
                    />
                  </FormControl>

                  <FormControl errorMessage={errors.email?.message}>
                    <InputText
                      name="email"
                      placeholder="Alamat Email"
                      fitContainer
                      ref={register(rules.email)}
                    />
                  </FormControl>

                  <FormControl errorMessage={errors.phoneNumber?.message}>
                    <InputText
                      name="phoneNumber"
                      placeholder="Nomor HandPhone"
                      fitContainer
                      onChange={handleChangePhoneNumber}
                      ref={register(rules.phoneNumber)}
                    />
                  </FormControl>

                  <FormControl
                    errorMessage={errors.resume?.message}
                  >
                    <Upload
                      name="resume"
                      customRequest={dummyRequest}
                      listType="picture"
                      fileList={resume}
                      onChange={handleFileChange}
                      onRemove={handleFileRemove}
                    >
                      <Button
                        size="medium"
                        type="button"
                        color="indigo"
                        iconBefore={<UploadOutlined />}
                        fitContainer
                      >
                        Upload CV Kamu
                      </Button>
                    </Upload>
                  </FormControl>
                  <br />
                  <Button
                    type="submit"
                    color="indigo"
                    fitContainer
                    size="large"
                    disabled={status === statusList.process}
                  >
                    {status === statusList.process ? "Sedang memproses" : "Kirim Lamaran"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}