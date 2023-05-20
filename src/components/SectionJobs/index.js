import React from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { config } from "../../config";
import MdcBriefcaseSearch from "@meronex/icons/mdc/MdcBriefcaseSearch";
import {
  fetchJobs,
  setPage,
  setKeyword,
  goToNextPage,
  goToPrevPage,
} from "../../features/Jobs/actions";

import Footer from "../../components/Footer";

import { Pagination, InputText, ButtonCircle, CardInfo } from "upkit";

export default function Jobs() {
  let dispatch = useDispatch();
  let jobs = useSelector((state) => state.jobs);

  React.useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch, jobs.currentPage, jobs.keyword]);

  return (
    <>
      <section className="h-auto bg-white ">
        <main className="flex flex-col gap-12 px-4 py-16 mx-auto max-w-screen-2xl lg:px-24">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="text-lg font-bold text-center text-purple-400 uppercase">
              Daftar Lowongan
            </div>
            <div className="text-4xl font-bold leading-normal text-center md:text-3xl text-dark-1 lg:leading-snug font-maven-pro">
              Temukan beragam informasi karir yang menarik,
              <br className="hidden lg:block" />
              <span className="px-2 bg-purple-200">hanya di halaman ini.</span>
            </div>
          </div>
          <div className="w-full text-center mt-5">
            <InputText
              iconBefore={
                <ButtonCircle
                  size="small"
                  color="indigo"
                  icon={<MdcBriefcaseSearch color="#FFFFFF" />}
                />
              }
              fullRound
              value={jobs.keyword}
              placeholder="cari posisi pekerjaan contoh (staff administrasi)"
              fitContainer
              onChange={(e) => {
                dispatch(setKeyword(e.target.value));
              }}
            />
          </div>
          <div>
            {" "}
            <div className="text-lg font-bold text-left text-black-400 ml-2">
              Jumlah Lowongan yang tersedia : {jobs.totalItems}
            </div>
            <div className="grid items-center justify-center h-full border border-gray-400 divide-y divide-gray-400 lg:divide-y-0 md:divide-x md:grid-cols-12 rounded-3xl mt-5">
              {jobs.status === "process" && !jobs.data.length ? (
                <div className="w-full h-full md:col-span-6 lg:col-span-4">
                  <div className="relative flex flex-col items-center justify-center px-20 py-10 group">
                    <ClipLoader color="#7b6eea" className="" />
                  </div>
                </div>
              ) : null}
              {jobs.status === "process" && !jobs.data.length ? (
                <div className="w-full h-full md:col-span-6 lg:col-span-4">
                  <div className="relative flex flex-col items-center justify-center px-20 py-10 group">
                    <ClipLoader color="#7b6eea" className="" />
                  </div>
                </div>
              ) : null}
              {jobs.status === "process" && !jobs.data.length ? (
                <div className="w-full h-full md:col-span-6 lg:col-span-4">
                  <div className="relative flex flex-col items-center justify-center px-20 py-10 group">
                    <ClipLoader color="#7b6eea" className="" />
                  </div>
                </div>
              ) : null}
              {jobs.data.length === 0 ? (
                <>
                  <div className="w-full h-full md:col-span-6 lg:col-span-4">
                    <CardInfo
                      title="Tunggu ya data sedang ditampilkan"
                      message="Apabila pesan ini tetap muncul mungkin data yang dicari tidak ditemukan"
                    />
                  </div>
                  <div className="w-full h-full md:col-span-6 lg:col-span-4">
                    <CardInfo
                      title="Tunggu ya data sedang ditampilkan"
                      message="Apabila pesan ini tetap muncul mungkin data yang dicari tidak ditemukan"
                    />
                  </div>
                  <div className="w-full h-full md:col-span-6 lg:col-span-4">
                    <CardInfo
                      title="Tunggu ya data sedang ditampilkan"
                      message="Apabila pesan ini tetap muncul mungkin data yang dicari tidak ditemukan"
                    />
                  </div>
                </>
              ) : (
                jobs.data.map((job, index) => {
                  return (
                    <div className="w-full h-full md:col-span-6 lg:col-span-4">
                      <div className="relative flex flex-col items-center justify-center px-20 py-10 group">
                        <div className="relative">
                          <Link to={`/jobs/${job._id}`}>
                            <img
                              src={`${config.api_host}/upload/company_profile/${job.company_name.company_image_url}`}
                              alt={index}
                              style={{ width: 80 + "px" }}
                            />
                          </Link>
                        </div>
                        <div className="mt-3 mb-1 text-sm font-semibold text-dark-1">
                          {job.job_position.length > 25
                            ? `${job.job_position.substring(0, 25)}...`
                            : job.job_position}
                        </div>
                        <p className="text-base font-medium text-center text-nogrey">
                          {job.company_name.company_name}
                        </p>
                        <p className="text-base font-medium text-center text-nogrey">
                          {job.job_location}
                        </p>
                        <div className="mb-1 text-2md font-bold text-dark-1 font-passion-one mt-4">
                          <NumberFormat
                            value={job.job_salaries_min}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp"}
                          />
                          -
                          <NumberFormat
                            value={job.job_salaries_max}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp"}
                          />
                        </div>
                        <p className="text-sm font-medium text-center text-nogrey mb-7">
                          {job.minYearsOfExperience} -{" "}
                          {job.maxYearsOfExperience} Tahun
                        </p>
                        <Link
                          to={`/job/${job._id}`}
                          className="relative z-30 px-6 py-4 text-center transition duration-300 ease-out bg-white border border-gray-400 rounded-lg text-nogrey group-hover:bg-purple-600 focus:bg-purple-600 focus:ring-2 group-hover:text-white focus:text-black group-hover:border-opacity-0 focus:border-opacity-0"
                        >
                          <span className="text-base font-semibold">
                            Lamar Pekerjaan
                          </span>
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="text-center my-10">
              <Pagination
                color="indigo"
                totalItems={jobs.totalItems}
                page={jobs.currentPage}
                perPage={jobs.perPage}
                onChange={(page) => dispatch(setPage(page))}
                onNext={(_) => dispatch(goToNextPage())}
                onPrev={(_) => dispatch(goToPrevPage())}
              />
            </div>{" "}
          </div>
        </main>
      </section>
      <Footer />
    </>
  );
}
