import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Topbar() {
  let auth = useSelector((state) => state.auth);

  return (
    <div className="h-full w-full border-box transition-all duration-500 linear lg:px-16 md:px-12 px-4 py-6 bg-white">
      <div className="container mx-auto flex flex-wrap flex-row items-center justify-between">
        <Link to="/" className="flex font-medium items-center">
          <img src="https://img.icons8.com/external-flat-wichaiwi/64/000000/external-job-workation-flat-wichaiwi.png" />
        </Link>
        <label for="menu-toggle" className="cursor-pointer lg:hidden block">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="#092A33"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />
        <div
          className="hidden lg:flex lg:items-center lg:w-auto w-full lg:ml-auto lg:mr-auto flex-wrap items-center text-base justify-center"
          id="menu"
        >
          <nav className="lg:space-x-10 space-x-0 lg:flex items-center justify-between text-base pt-8 lg:pt-0 lg:space-y-0 space-y-6">
            <Link to="/" className="block nav-link font-medium">
              Beranda
            </Link>
            <Link to="/jobs" className="block nav-link">
              Lowongan
            </Link>
          </nav>
        </div>
        <div
          className="hidden lg:flex lg:items-center lg:w-auto w-full md:space-x-4"
          id="menu"
        >
          <Link to={auth.user ? `/dashboard/job` : `/login`}>
            <button
              className="btn-outline md:w-auto w-full text-base items-center border-0 py-3 px-4 focus:outline-none rounded-full mt-6 lg:mt-0"
              style={{ textTransform: "capitalize" }}
            >
              {auth.user ? "Dashboard" : "Masuk"}
            </button>
          </Link>
          <Link to={auth.user ? "/logout" : "/register"}>
            <button className="btn-fill md:w-auto w-full py-3 px-4 text-white rounded-full bg-purple-1 transition-all duration-300 mt-6 lg:mt-0">
              {auth.user ? "Keluar" : "Daftar"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
