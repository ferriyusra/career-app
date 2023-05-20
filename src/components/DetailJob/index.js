import React from "react";
import moment from "moment";
import { useRouteMatch, Link, useHistory } from "react-router-dom";
import FaShoppingBag from "@meronex/icons/fa/FaShoppingBag";
import FaBookOpen from "@meronex/icons/fa/FaBookOpen";
import { useForm } from "react-hook-form";
// import { sendJob } from "../../api/applyJob";
import { getJobById } from "../../api/job";
import { config } from "../../config";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import { InputText, Button, FormControl } from "upkit";

export default function DetailJob() {
  let auth = useSelector((state) => state.auth);
  console.log("data user", auth);

  let history = useHistory();
  let { handleSubmit, register, errors, setValue, watch, getValues } =
    useForm();

  watch();

  const onSubmit = async (formHook) => {
    // let payload = new FormData();

    // payload.append("id_candidate", formHook.id_candidate);
    // payload.append("id_user_candidate", formHook.id_user_candidate);
    // payload.append("id_job", formHook.id_job);
    // payload.append("status", formHook.status);
    // payload.append("is_apply", formHook.is_apply);

    // let { data } = await sendJob(payload);
    // console.log("data create", data);

    // if (data.error) return;

    // history.push(`/kirim-Lamaran/berhasil`);
  };

  let [job, setJob] = React.useState([]);
  let [error, setError] = React.useState("");
  let [status, setStatus] = React.useState("process");

  let { params } = useRouteMatch();

  React.useEffect(() => {
    getJobById(params?.job_id)
      .then(({ data }) => {
        if (data?.error) {
          setError(data.message || "Terjadi kesalahan yang tidak diketahui");
        }
        setJob(data);
        console.log("data", data);
      })
      .finally(() => setStatus("idle"));
  }, [params]);

  if (error.length) {
    return <h1>Terjadi kesalahan yang saya aja gatau salahnya apa</h1>;
  }

  if (status === "process") {
    return (
      <div className="text-center py-10">
        <div className="inline-block">
          <ClipLoader color="#7b6eea" />
        </div>
      </div>
    );
  }

  let list_job_apply = auth.user.list_job_apply;
  const renderBtnApply = () => {
    if (list_job_apply.includes(job.data._id)) {
      return (
        <Link
          to={"/"}
          className="w-50 bg-indigo-800 text-white font-bold text-sm rounded hover:bg-indigo-700 flex items-center justify-center px-2 py-3 mt-4"
        >
          Diproses
        </Link>
      );
    } else {
      return (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="hidden"
              name="id_candidate"
              defaultValue={auth.user.user_candidate_id}
              ref={register}
            />
            <input
              type="hidden"
              name="id_user_candidate"
              defaultValue={auth.user._id}
              ref={register}
            />
            <input
              type="hidden"
              name="id_job"
              defaultValue={job.data._id}
              ref={register}
            />
            <input
              type="hidden"
              name="status"
              defaultValue={"review"}
              ref={register}
            />
            <input
              type="hidden"
              name="is_apply"
              defaultValue={true}
              ref={register}
            />
            <button className="w-50 bg-indigo-800 text-white font-bold text-sm capitalize rounded hover:bg-indigo-700 flex items-center justify-center px-2 py-3 mt-4">
              lamar
            </button>
          </form>
        </>
      );
    }
  };

  let job_skills = job.data.job_skills;
  let job_benefits = job.data.job_benefits;

  const listSkills = job_skills.map((skill) => (
    <span class="bg-gray-400 text-gray-100 py-2 px-5 mx-1 rounded-full text-xs font-bold">
      {skill.name}
    </span>
  ));

  const listBenefits = job_benefits.map((benefit) => (
    <span className="bg-emerald-800 text-gray-100 px-5 py-2 mx-1 rounded-full text-xs font-bold">
      {benefit}
    </span>
  ));
  return (
    <>
      <div className="bg-gray-200 dark:bg-gray-200">
        <div className="container flex items-center px-6 py-4 mx-auto overflow-y-auto whitespace-nowrap">
          <Link
            to="/jobs"
            className="flex items-center text-indigo-300 -px-2 dark:text-indigo-400 hover:underline"
          >
            <FaShoppingBag />
            <span className="mx-2">Pekerjaan</span>
          </Link>

          <span className="mx-5 text-gray-500 dark:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="black"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>

          <p className="flex items-center text-black-600 -px-2 dark:text-black-200">
            <FaBookOpen />
            <span className="mx-2">{job?.data.job_position}</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto flex flex-wrap py-6">
        <section className="w-full md:w-2/3 flex flex-col items-center px-3">
          <div className="w-full flex flex-col text-center md:text-left md:flex-row shadow bg-white mt-10 mb-10 p-6">
            <div className="w-full md:w-1/5 flex justify-center md:justify-start pb-4">
              <img
                src={`${config.api_host}/upload/company_profile/${job?.data.company_name.company_image_url}`}
                className="rounded-full shadow h-32 w-32"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center md:justify-start">
              <p
                className="font-semibold text-2xl"
                style={{ textTransform: "capitalize" }}
              >
                {job?.data.job_position}
              </p>
              <p className="pt-2" style={{ textTransform: "capitalize" }}>
                Nama Perusahaan : {job?.data.company_name.company_name}
              </p>
              <p className="pt-2" style={{ textTransform: "capitalize" }}>
                Industri : {job?.data.job_category.name}
              </p>
              <p className="pt-2" style={{ textTransform: "capitalize" }}>
                Tipe Pekerjaan : {job?.data.type}
              </p>
              <p className="pt-2" style={{ textTransform: "capitalize" }}>
                Pengalaman : {job?.data.minYearsOfExperience} -{" "}
                {job?.data.maxYearsOfExperience} Tahun
              </p>
              <p className="pt-2" style={{ textTransform: "capitalize" }}>
                <span>
                  Tanggal posting :{" "}
                  {moment(job?.data.createdAt).format("Do MMMM YYYY")}
                </span>
              </p>
              {renderBtnApply()}
            </div>
          </div>
          <article className="flex flex-col shadow my-4">
            <div className="bg-white flex flex-col justify-start p-6">
              <p
                className="pb-3"
                style={{ textAlign: "justify", textJustify: "inter-word" }}
                dangerouslySetInnerHTML={{ __html: job?.data.job_description }}
              />
              <h3 className="text-1xl font-bold pb-3">Skills wajib</h3>
              <p className="pb-3">{listSkills}</p>
              <h3 className="text-1xl font-bold pb-3 mt-2">
                Tunjangan dan keuntungan
              </h3>
              <div className="pb-3">{listBenefits}</div>
            </div>
          </article>
        </section>
      </div>
      <Footer />
    </>
  );
}
