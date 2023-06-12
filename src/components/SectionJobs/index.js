import React, { useEffect } from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../config";
import MdcBriefcaseSearch from "@meronex/icons/mdc/MdcBriefcaseSearch";
import {
  fetchJobs,
  setPerPage,
  setKeyword,
  goToNextPage,
  goToPrevPage,
} from "../../features/Jobs/actions";

import Footer from "../../components/Footer";

import { Pagination, InputText, ButtonCircle } from "upkit";
import { Avatar, Card, Skeleton } from 'antd';

export default function Jobs() {

  let dispatch = useDispatch();
  let jobs = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs())
  }, [dispatch, jobs.page]);

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
            {/* <InputText
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
            /> */}
          </div>
          <div>
            {" "}
            <div className="text-lg font-bold text-left text-black-400 ml-2">
              Jumlah Lowongan yang tersedia : {jobs.total}
            </div>
            <div className="grid items-center justify-center h-full border border-gray-400 divide-y divide-gray-400 lg:divide-y-0 md:divide-x md:grid-cols-12 rounded-3xl mt-5">
              {
                !jobs.data || jobs.data.length === 0 ? (
                  <>
                    {[...Array(6)].map((_, index) => (
                      <div className="w-full h-full md:col-span-6 lg:col-span-4" key={index}>
                        <div className="relative flex flex-col items-center justify-center px-20 py-10 group">
                          <Skeleton active />
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  jobs.data.map((job, _index) => (
                    <div className="w-full h-full md:col-span-6 lg:col-span-4" key={job.id}>
                      <div className="relative flex flex-col items-center justify-center px-20 py-10 group">
                        <Card className="w-full">
                          <div className="flex flex-col items-start">
                            <Card.Meta
                              avatar={
                                <Avatar src={`${config.api_host}/upload/user/${job.companyImage}`} className="w-24 h-24" />
                              }
                            />
                            <p className="text-base font-medium text-center text-black-800 mt-4">
                              {job.companyName}
                            </p>
                            <div className="mt-3 mb-1 text-sm font-semibold text-dark-1">
                              {job.jobName.length > 25 ? `${job.jobName.substring(0, 25)}...` : job.jobName}
                            </div>
                          </div>
                          {job.jobIsSalary ? (
                            <div className="mb-1 text-2md font-bold text-dark-1 font-passion-one mt-4">
                              <NumberFormat
                                value={job.jobSalary}
                                displayType="text"
                                thousandSeparator={true}
                                prefix="Rp"
                              />
                            </div>
                          ) : (
                            <p className="mb-1 text-2md font-bold text-dark-1 font-passion-one mt-4">
                              Gaji dirahasiakan
                            </p>
                          )}
                          <div className="flex justify-center mt-5">
                            <div className="w-full md:w-auto">
                              <Link
                                to={`/job/${job.id}`}
                                className="relative z-30 block w-full md:inline-block md:w-auto px-6 py-4 text-center transition duration-300 ease-out bg-white border border-gray-400 rounded-lg text-gray-600 group-hover:bg-purple-600 focus:bg-purple-600 focus:ring-2 group-hover:text-white focus:text-black group-hover:border-opacity-0 focus:border-opacity-0"
                              >
                                <span className="text-base font-semibold">Lamar Pekerjaan</span>
                              </Link>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  ))
                )
              }
            </div>
            <div className="text-center my-10">
              <Pagination
                color="indigo"
                totalItems={jobs.total}
                page={jobs.page}
                perPage={jobs.perPage}
                onChange={(page) => dispatch(setPerPage(page))}
                onNext={(_) => dispatch(goToNextPage())}
                onPrev={(_) => dispatch(goToPrevPage())}
              />
            </div>{" "}
          </div>
        </main>
      </section >
      <Footer />
    </>
  );
}
