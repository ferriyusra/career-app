import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../features/Auth/actions";
import { rules } from "./validation";
import {
  LayoutOne,
  FormControl,
  InputText,
  InputPassword,
  Button,
} from "upkit";
import { login } from "../../api/auth";

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export default function Login() {
  const { register, handleSubmit, errors, setError } = useForm();
  const [status, setStatus] = React.useState(statusList.idle);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async ({ email, password }) => {

    try {
      setStatus(statusList.process);

      let { data } = await login(email, password);
      let {
        data: {
          name,
          token
        } } = data;

      dispatch(userLogin(name, token));

      history.push("/");

      setStatus(statusList.success);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;

        setError("password", {
          type: "invalidCredential",
          message,
        });

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
                Masuk untuk melanjutkan
              </h3>
              <p className="caption leading-7 text-sm">
                Mohon masuk menggunakan akun
                <br />
                akun yang telah terdaftar diwebsite.
              </p>

              <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                <LayoutOne size="full">
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                  </form>
                </LayoutOne>

                <Button
                  type="submit"
                  color="indigo"
                  fitContainer
                  size="large"
                  disabled={status === statusList.process}
                >
                  {status === statusList.process ? "Sedang memproses" : "Masuk"}
                </Button>
              </form>

              <p className="mt-8 text-center text-sm text-foot">
                Belum punya akun ?
                <Link to="/register">
                  {" "}
                  <p className="font-medium hover:underline text-link">
                    {" "}
                    Daftar sekarang.{" "}
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
