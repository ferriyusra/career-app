import Topbar from "../../components/Topbar";
import SectionJobs from "../../components/SectionJobs";

export default function Jobs() {
  return (
    <div className="h-full w-full border-box transition-all duration-500 linear">
      <div className="headerID__2 font-noto">
        <Topbar />
        <SectionJobs />
      </div>
    </div>
  );
}
