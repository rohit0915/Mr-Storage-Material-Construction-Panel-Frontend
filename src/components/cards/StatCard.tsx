import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UploadIcon from "../../assets/uploadicon.svg";
import MaterialIcon from "../../assets/requesticon.svg";
import ChatIcon from "../../assets/teamcomicon.svg";
import SuccessModal from "../common/SuccessModal";
import RequestMaterialModel from "../requestMaterialModel";
import UploadWorkLogFileModal from "../../components/uploadWorkLogFileModal";

const STAT_STYLE_MAP = {
  activeProjects: {
    bg: "#1D51A4",
  },
  completionRate: {
    bg: "#3AB449",
  },
  pendingMaterials: {
    bg: "#EAB308",
  },
  safetyScore: {
    bg: "#FD8D5B",
  },
};

const ACTIONS_CONFIG = [
  {
    key: "uploadLog",
    title: "Upload Work Log",
    bg: "#16A34A",
    icon: UploadIcon,
  },
  {
    key: "requestMaterial",
    title: "Request Materials",
    bg: "#EA580C",
    icon: MaterialIcon,
  },
  {
    key: "teamCom",
    title: "Team Communication",
    bg: "#9333EA",
    icon: ChatIcon,
  },
];

type StatKey = keyof typeof STAT_STYLE_MAP;

export type StatItem = {
  key: StatKey;
  title: string;
  value: number | string;
  icon?: string;
  iconsvg?: string | any;
  bg?: string;
};

export type StatsOverviewProps = {
  stats: StatItem[];
  showActions?: boolean;
  showProgress?: boolean;
};

export default function StatsOverview({
  stats,
  showActions = false,
  showProgress = false,
}: StatsOverviewProps) {
  const navigate = useNavigate();
  const [openRequestModel, setRequestModel] = useState(false);
  const [openUploadWorkFileModel, setUploadWorkFileModel] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);
  const [successTitle, setSuccessTitle] = useState("");

  const handleActionClick = (key: string) => {
    switch (key) {
      case "uploadLog":
        setUploadWorkFileModel(true);
        break;

      case "requestMaterial":
        setRequestModel(true);
        break;

      case "teamCom":
        navigate("/communication");
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-6 gap-3 md:mb-6 mb-3">
        {stats.map((item, index) => {
          const style = STAT_STYLE_MAP[item.key];
          const backgroundColor = item.bg ?? style.bg;
          return (
            <div
              key={item.key}
              className="rounded-[8px] min-h-[106px] py-1.5 lg:px-6 px-3 flex items-center justify-between gap-1"
              style={{ backgroundColor: backgroundColor }}
            >
              <div className="text-white flex-1">
                <p className="text-[14px]">{item.title}</p>
                <p className="text-[24px] mt-1 font-semibold">{item.value}</p>
                {showProgress && index !== 1 && (
                  <div className="w-full bg-[#D9D9D9] rounded-full mt-1">
                    <p className="h-1.5 w-[80%] bg-black rounded-full"></p>
                  </div>
                )}

                {showProgress && index === 1 && (
                  <span className="block text-[12px]">days</span>
                )}
              </div>

              <div className="min-w-[36px] w-[36px] h-[36px] sm:min-w-[48px] sm:w-[48px] sm:h-[48px] bg-white rounded-[10px] flex items-center justify-center">
                {item.iconsvg ? (
                  <>{item.iconsvg}</>
                ) : (
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="sm:w-6 sm:h-6 w-4 h-4"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid md:grid-cols-3 grid-cols-2 md:gap-6 gap-3">
        {showActions &&
          ACTIONS_CONFIG.map((item) => (
            <button
              key={item.key}
              onClick={() => handleActionClick(item.key)}
              className="min-h-[85px] sm:px-6 px-3 rounded-[8px] flex flex-col items-center justify-center gap-2 cursor-pointer"
              style={{ backgroundColor: item.bg }}
            >
              <img src={item.icon} alt={item.title} className="w-5 h-5" />
              <p className="text-white text-[16px] font-medium">{item.title}</p>
            </button>
          ))}

        <RequestMaterialModel
          open={openRequestModel}
          onClose={() => setRequestModel(false)}
          onCreate={() => {
            setRequestModel(false);
            setSuccessTitle("Material Requested Successfully");
            setRedirectTo("/material-view-page");
            setSuccessOpen(true);
          }}
        />

        <UploadWorkLogFileModal
          open={openUploadWorkFileModel}
          onClose={() => setUploadWorkFileModel(false)}
          onSubmit={() => {
            setSuccessTitle("Work Log Uploaded Successfully");
            setSuccessOpen(true);
          }}
        />

        <SuccessModal
          open={successOpen}
          title={successTitle}
          onClose={() => setSuccessOpen(false)}
          redirectTo={redirectTo || undefined}
        />
      </div>
    </div>
  );
}
