import Topbar from "../../components/Topbar";
import DetailJob from "../../components/DetailJob";

export default function Job() {
  return (
    <div className="h-full w-full border-box transition-all duration-500 linear">
      <div className="headerID__2 font-noto">
        <Topbar />
        <DetailJob />
      </div>
    </div>
  );
}
