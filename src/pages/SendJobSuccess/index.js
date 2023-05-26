import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

export default function SendJobSuccess() {
  return (
    <>
      <section
        className="h-full w-full border-box lg:px-24 md:px-16 sm:px-8 px-8 sm:pt-10 pt-10 sm:pb-28 pb-20 transition-all duration-500 linear"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(31, 29, 43, 1), rgba(39, 37, 53, 1))",
        }}
      >
        <div className="empty-4-4">
          <div className="container mx-auto flex items-center justify-center flex-col">
            <img
              className="sm:w-auto w-5/6 mb-3 object-cover object-center"
              src="http://api.elements.buildwithangga.com/storage/files/2/assets/Empty%20State/EmptyState3/Empty-3-8.png"
              alt=""
            />
            <div className="text-center w-full">
              <h1 className="text-3xl mb-3 text-white font-semibold tracking-wide">
                Berhasil Kirim Lamaran
              </h1>
              <div className="flex justify-center">
                <Link to="/jobs">
                  <button className="btn-view inline-flex font-semibold text-white text-lg leading-7 py-4 px-8 rounded-xl focus:outline-none hover:shadow-lg">
                    Cari pekerjaan lain
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
