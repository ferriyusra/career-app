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
  const [resume, setResume] = React.useState({ preview: "", raw: "" });

  watch();

  let history = useHistory();

  const handleChangePhoneNumber = (event) => {
    const inputValue = event.target.value;

    if (inputValue === '08' || inputValue === '62') {
      event.target.value = '62';
    }
  };

  const onChangeHandler = (e) => {
    if (e.target.files.length) {
      setResume({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const onSubmit = async (formHook) => {
    try {
      let payload = new FormData();

      payload.append("firstName", formHook.firstName);
      payload.append("lastName", formHook.lastName);
      payload.append("email", formHook.email);
      payload.append("phoneNumber", formHook.phoneNumber);
      payload.append('resume', resume.raw);

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

                  <FormControl errorMessage={errors.resume?.message}>
                    <input
                      type="file"
                      name="resume"
                      ref={register(rules.resume)}
                      onChange={onChangeHandler}
                    />
                  </FormControl>
                  <label htmlFor="upload-button">
                    {resume.preview ? (
                      <img
                        src={resume.preview}
                        alt="dummy"
                        required
                        width="300"
                        height="300"
                      />
                    ) : (
                      <>
                        <span className="fa-stack fa-2x mt-3 mb-2">
                          <i className="fas fa-circle fa-stack-2x" />
                          <i className="fas fa-store fa-stack-1x fa-inverse" />
                        </span>
                        <h5 className="text-left">Upload your resume</h5>
                      </>
                    )}
                  </label>
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