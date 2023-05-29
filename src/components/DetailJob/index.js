import React, { useEffect } from "react";
import moment from "moment";
import { useRouteMatch, Link } from "react-router-dom";
import FaShoppingBag from "@meronex/icons/fa/FaShoppingBag";
import FaBookOpen from "@meronex/icons/fa/FaBookOpen";
import { getJobById } from "../../api/job";
import { config } from "../../config";
import ClipLoader from "react-spinners/ClipLoader";
import Footer from "../../components/Footer";
import FormApplicants from "../FormApplicants";

export default function DetailJob() {

  let [job, setJob] = React.useState([]);
  let [error, setError] = React.useState("");
  let [status, setStatus] = React.useState("process");

  let { params } = useRouteMatch();

  useEffect(() => {
    getJobById(params?.jobId)
      .then(({ data }) => {
        if (data?.error) {
          setError(data.message || "Terjadi kesalahan");
        }
        setJob(data);
      })
      .finally(() => setStatus("idle"));
  }, [params]);

  if (error.length) {
    return <h1>Terjadi kesalahan</h1>;
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
            <span className="mx-2">{job?.data.jobName}</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto flex flex-wrap py-6">
        <section className="w-full md:w-2/3 flex flex-col items-center px-3">
          <div className="w-full flex flex-col text-center md:text-left md:flex-row shadow bg-white mt-10 mb-10 p-6">
            <div className="w-full md:w-1/5 flex justify-center md:justify-start pb-4">
              <img
                src={`${config.api_host}/upload/user/${job.data.companyImage}`}
                alt={`${job.data.companyName}`}
                className="rounded-full shadow h-32 w-32"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center md:justify-start">
              <p
                className="font-semibold text-2xl"
                style={{ textTransform: "capitalize" }}
              >
                {job?.data.jobName}
              </p>
              <p className="pt-2" style={{ textTransform: "capitalize" }}>
                Nama Perusahaan : {job?.data.companyName}
              </p>
              <p className="pt-2" style={{ textTransform: "capitalize" }}>
                Tipe Pekerjaan : {job?.data.jobType}
              </p>
              <p className="pt-2" style={{ textTransform: "capitalize" }}>
                Gaji : {job?.data.jobIsSalary ? job.data.jobSalary : "Gaji dirahasiakan"}
              </p>
              <p className="pt-2" style={{ textTransform: "capitalize" }}>
                <span>
                  Tanggal posting :{" "}
                  {moment(job?.data.createdAt).format("Do MMMM YYYY")}
                </span>
              </p>
            </div>
          </div>
          <article className="flex flex-col shadow my-4">
            <div className="bg-white flex flex-col justify-start p-6">
              <p
                className="font-semibold text-2xl pb-4"
                style={{ textTransform: "capitalize" }}
              >
                tentang pekerjaan ini
              </p>
              <p
                className="pb-3"
                style={{ textAlign: "left", textJustify: "inter-word" }}
                dangerouslySetInnerHTML={{ __html: job?.data.jobDescription }}
              />
            </div>
          </article>
          <FormApplicants />
        </section>
      </div>
      <Footer />
    </>
  );
}
