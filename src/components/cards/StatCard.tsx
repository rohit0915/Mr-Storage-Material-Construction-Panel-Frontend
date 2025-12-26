import FolderIcon from "../../assets/activeproject.svg";
import MoneyIcon from "../../assets/completionicon.svg";
import BoxIcon from "../../assets/pendingmaterialicon.svg";
import ShieldIcon from "../../assets/safetyscoreicon.svg";

import PlusIcon from "../../assets/plusicon.svg";
import UploadIcon from "../../assets/uploadicon.svg";
import MaterialIcon from "../../assets/requesticon.svg";
import ChatIcon from "../../assets/teamcomicon.svg";

const STAT_STYLE_MAP = {
  activeProjects: {
    bg: "#1D51A4",
    icon: FolderIcon,
  },
  completionRate: {
    bg: "#3AB449",
    icon: MoneyIcon,
  },
  pendingMaterials: {
    bg: "#EAB308",
    icon: BoxIcon,
  },
  safetyScore: {
    bg: "#FD8D5B",
    icon: ShieldIcon,
  },
};

const ACTIONS_CONFIG = [
  {
    key: "addProject",
    title: "Add New Project",
    bg: "#2563EB",
    icon: PlusIcon,
  },
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
};

export type StatsOverviewProps = {
  stats: StatItem[];
  showActions?: boolean;
};

export default function StatsOverview({
  stats,
  showActions = false,
}: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((item) => {
        const style = STAT_STYLE_MAP[item.key];
        return (
          <div
            key={item.key}
            className="rounded-[8px] min-h-[106px] px-6 flex items-center justify-between"
            style={{ backgroundColor: style.bg }}
          >
            <div className="text-white">
              <p className="text-[14px]">{item.title}</p>
              <p className="text-[24px] mt-1 font-semibold">
                {item.value}
              </p>
            </div>

            <div className="w-[48px] h-[48px] bg-white rounded-[10px] flex items-center justify-center">
              <img
                src={style.icon}
                alt={item.title}
                className="w-6 h-6"
              />
            </div>
          </div>
        );
      })}

      {showActions &&
        ACTIONS_CONFIG.map((item) => (
          <button
            key={item.key}
            className="min-h-[85px] rounded-[8px] flex flex-col items-center justify-center gap-2 cursor-pointer"
            style={{ backgroundColor: item.bg }}
          >
            <img src={item.icon} alt={item.title} className="w-5 h-5" />
            <p className="text-white text-[16px] font-medium">
              {item.title}
            </p>
          </button>
        ))}
    </div>
  );
}

