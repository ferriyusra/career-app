import React from "react";
import Topbar from "../../components/Topbar";
import SectionJobs from '../../components/SectionJobs';
import SectionLandingHero from "../../components/SectionLandingHero";

export default function Home() {
  return (
    <>
      <section className="h-full w-full border-box transition-all duration-500 linear">
        <main className="headerID__2 font-noto">
          <Topbar />
          <SectionLandingHero />
          <SectionJobs />
        </main>
      </section>
    </>
  );
}
