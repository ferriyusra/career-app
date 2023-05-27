import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { rules } from "./validation";
import {
  FormControl,
  InputText,
  InputPassword,
  Button,
  Textarea
} from "upkit";
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { registerUser } from "../../api/auth";

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export default function Register() {

  const [image, setImage] = React.useState([]);
  let { register, handleSubmit, errors, setError } = useForm();
  let [status, setStatus] = React.useState(statusList.idle);

  let history = useHistory();

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  }

  const handleFileChange = ({ fileList }) => {
    setImage(fileList);
  };

  const handleFileRemove = (file) => {
    const newFileList = image.filter((f) => f.uid !== file.uid);
    setImage(newFileList);
  };

  const onSubmit = async (formData) => {

    try {
      let {
        name,
        email,
        location,
        companyDescription,
        password,
        passwordConfirmation
      } = formData;

      if (password !== passwordConfirmation) {
        return setError("passwordConfirmation", {
          type: "equality",
          message: "Konfirmasi kata sandi harus sama dengan kata sandi",
        });
      }

      let payload = new FormData();
      payload.append("name", name);
      payload.append("password", password);
      payload.append("location", location);
      payload.append("companyDescription", companyDescription);
      payload.append("email", email);
      payload.append('image', image[0].originFileObj);

      setStatus(statusList.process);

      await registerUser(payload);

      setStatus(statusList.success);
      history.push("/register/success");

    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setStatus(statusList.error);
      } else {
        setStatus(statusList.error);
      }
    }
  };

  return (
    <section
      className="h-full w-full border-box transition-all duration-500 linear"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <div className="content-4-1">
        <div className="flex flex-col items-center h-full lg:flex-row">
          <div className="relative hidden lg:block h-full width-left">
            <img
              className="absolute object-fill centered"
              src="https://images.unsplash.com/photo-1579389083395-4507e98b5e67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
              alt=""
            />
          </div>
          <div className="flex w-full h-full px-8 width-right sm:px-16 py-32 lg:mx-0 mx-auto items-left justify-left bg-medium-white">
            <div className="w-full sm:w-7/12 md:w-8/12 lg:w-9/12 xl:w-7/12 mx-auto lg:mx-0">
              <div className="items-center justify-center lg:hidden flex">
                <img
                  src="https://images.unsplash.com/photo-1579389083395-4507e98b5e67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  alt=""
                />
              </div>
              <h3 className="text-3xl font-semibold mb-3">
                Silahkan mendaftar untuk melanjutkan.
              </h3>
              <p className="caption leading-7 text-sm">
                Mohon isi data-data dengan benar
                <br />
                agar akun anda tetap aman.
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl errorMessage={errors.name?.message}>
                  <InputText
                    name="name"
                    placeholder="Nama Perusahaan"
                    fitContainer
                    ref={register(rules.name)}
                  />
                </FormControl>

                <FormControl errorMessage={errors.email?.message}>
                  <InputText
                    name="email"
                    placeholder="Alamat email"
                    fitContainer
                    ref={register(rules.email)}
                  />
                </FormControl>

                <FormControl errorMessage={errors.location?.message}>
                  <InputText
                    name="location"
                    placeholder="Lokasi Perusahaan"
                    fitContainer
                    ref={register(rules.location)}
                  />
                </FormControl>

                <FormControl errorMessage={errors.companyDescription?.message}>
                  <Textarea
                    name="companyDescription"
                    placeholder="Deskripsi Perusahaan"
                    fitContainer
                    ref={register(rules.companyDescription)}
                  />
                </FormControl>

                <FormControl errorMessage={errors.password?.message}>
                  <InputPassword
                    name="password"
                    placeholder="Kata sandi"
                    fitContainer
                    ref={register(rules.password)}
                  />
                </FormControl>

                <FormControl
                  errorMessage={errors.passwordConfirmation?.message}
                >
                  <InputPassword
                    name="passwordConfirmation"
                    placeholder="Konfirmasi kata sandi"
                    fitContainer
                    ref={register(rules.passwordConfirmation)}
                  />
                </FormControl>

                <FormControl
                  errorMessage={errors.image?.message}
                >
                  <Upload
                    name="image"
                    customRequest={dummyRequest}
                    listType="picture"
                    fileList={image}
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
                      Upload Logo Perusahaan
                    </Button>
                  </Upload>
                </FormControl>

                <Button
                  type="submit"
                  color="indigo"
                  fitContainer
                  size="large"
                  disabled={status === statusList.process}
                >
                  {status === statusList.process
                    ? "Sedang memproses"
                    : "Mendaftar"}
                </Button>

                <p className="mt-8 text-center text-sm text-foot">
                  Sudah punya akun ?
                  <Link to="/login">
                    {" "}
                    <p className="font-medium hover:underline text-link">
                      {" "}
                      Masuk sekarang.{" "}
                    </p>{" "}
                  </Link>
                </p>
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
