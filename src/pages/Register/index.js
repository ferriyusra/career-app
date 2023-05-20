import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { rules } from "./validation";
import {
  LayoutOne,
  FormControl,
  InputText,
  InputPassword,
  Button,
} from "upkit";
import { registerUser } from "../../api/auth";

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export default function Register() {
  let { register, handleSubmit, errors, setError } = useForm();
  let [status, setStatus] = React.useState(statusList.idle);

  let history = useHistory();

  const onSubmit = async (formData) => {
    let { password, password_confirmation } = formData;

    if (password !== password_confirmation) {
      return setError("password_confirmation", {
        type: "equality",
        message: "Konfirmasi kata sandi harus sama dengan kata sandi",
      });
    }

    setStatus(statusList.process);

    let { data } = await registerUser(formData);

    if (data.error) {
      let fields = Object.keys(data.fields);

      fields.forEach((field) => {
        setError(field, {
          type: "server",
          message: data.fields[field]?.properties?.message,
        });
      });
      setStatus(statusList.error);
      return;
    }
    setStatus(statusList.success);
    history.push("/register/berhasil");
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

              <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                <LayoutOne size="full">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl errorMessage={errors.first_name?.message}>
                      <InputText
                        name="first_name"
                        placeholder="Nama depan"
                        fitContainer
                        ref={register(rules.first_name)}
                      />
                    </FormControl>
                    <FormControl errorMessage={errors.last_name?.message}>
                      <InputText
                        name="last_name"
                        placeholder="Nama belakang"
                        fitContainer
                        ref={register(rules.last_name)}
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

                    <FormControl errorMessage={errors.password?.message}>
                      <InputPassword
                        name="password"
                        placeholder="Kata sandi"
                        fitContainer
                        ref={register(rules.password)}
                      />
                    </FormControl>

                    <FormControl
                      errorMessage={errors.password_confirmation?.message}
                    >
                      <InputPassword
                        name="password_confirmation"
                        placeholder="Konfirmasi kata sandi"
                        fitContainer
                        ref={register(rules.password_confirmation)}
                      />
                    </FormControl>
                    <InputText
                      type="hidden"
                      name="role"
                      fitContainer
                      value="candidate"
                      ref={register}
                    />
                  </form>
                </LayoutOne>

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
              </form>

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
