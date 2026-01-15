import { useState } from "react";
import StatsOverview from "../components/cards/StatCard";
import ExportIcon from "../assets/exportIcon.svg";
import type { StatItem } from "../components/cards/StatCard";
import CustomSelect from "../components/common/CustomSelect";
import FolderIcon from "../assets/growthicon.svg";
import BoxIcon from "../assets/resourcicon.svg";
import ClockIcon from "../assets/ClockIcon";
import ShieldCheckIcon from "../assets/SieldIcon";
import SuccessModal from "../components/common/SuccessModal";

const stats: StatItem[] = [
  {
    key: "activeProjects",
    title: "Project Completion Rate",
    value: "68%",
    icon: FolderIcon,
    bg: "#EAB308",
  },
  {
    key: "completionRate",
    title: "Average Delay Time",
    value: 3.2,
    iconsvg: <ClockIcon color="#9333EA" />,
    bg: "#9333EA",
  },
  {
    key: "pendingMaterials",
    title: "Resource Utilization ",
    value: "85%",
    icon: BoxIcon,
    bg: "#1D51A4",
  },
  {
    key: "safetyScore",
    title: "Safety Compliance",
    value: "96%",
    iconsvg: <ShieldCheckIcon color="#3AB449" />,
    bg: "#3AB449",
  },
];

const rows = [
  {
    id: 1,
    project: "Downtown Office Complex",
    actual: 65,
    planned: 70,
    status: "On Track",
    createdDate: "2026-01-13",
  },
  {
    id: 2,
    project: "Residential Tower A",
    actual: 35,
    planned: 40,
    status: "Delayed",
    createdDate: "2025-12-20",
  },
  {
    id: 3,
    project: "Shopping Mall Renovation",
    actual: 0,
    planned: 0,
    status: "Not Started",
    createdDate: "2026-01-01",
  },
  {
    id: 4,
    project: "Industrial Warehouse",
    actual: 100,
    planned: 100,
    status: "Completed",
    createdDate: "2025-11-20",
  },
];

const statusStyles: Record<string, string> = {
  "On Track": "bg-[#DCFCE7] text-[#16A34A]",
  Passed: "bg-[#DCFCE7] text-[#16A34A]",
  Warning: "bg-[#FEF9C3] text-[#8C6A00]",
  Delayed: "bg-red-100 text-red-600",
  "Not Started": "bg-gray-200 text-gray-600",
  Completed: "bg-blue-100 text-blue-700",
};

const projectFilterOptions = [
  { label: "All Projects", value: "all" },
  { label: "Downtown Office Complex", value: "PRJ-001" },
  { label: "Residential Tower A", value: "PRJ-002" },
  { label: "Shopping Mall Renovation", value: "PRJ-003" },
  { label: "Industrial Warehouse", value: "PRJ-004" },
];

const timeFilterOptions = [
  { label: "All", value: "all" },
  { label: "This week", value: "this_week" },
  { label: "Last 3 weeks", value: "last_3_weeks" },
  { label: "This month", value: "this_month" },
  { label: "Last 6 months", value: "last_6_months" },
  { label: "This year", value: "this_year" },
];

const materials = [
  {
    name: "Steel",
    percent: 95,
    used: 950,
    planned: 1000,
    color: "bg-[#16A34A]",
  },
  {
    name: "Concrete",
    percent: 96,
    used: 520,
    planned: 500,
    color: "bg-[#16A34A]",
  },
  {
    name: "Electrical",
    percent: 90,
    used: 180,
    planned: 200,
    color: "bg-[#EAB308]",
  },
  {
    name: "Tiles",
    percent: 95,
    used: 285,
    planned: 300,
    color: "bg-[#16A34A]",
  },
];

const reports = [
  {
    title: "Safety & Compliance",
    project: "PRJ-001",
    date: "2026-01-10",
    status: "Passed",
    score: "98%",
  },
  {
    title: "Compliance Check",
    project: "PRJ-002",
    date: "2025-12-08",
    status: "Passed",
    score: "95%",
  },
  {
    title: "Equipment Check",
    project: "PRJ-001",
    date: "2025-12-05",
    status: "Warning",
    score: "95%",
  },
  {
    title: "Safety Training",
    project: "PRJ-002",
    date: "2025-02-03",
    status: "Completed",
    score: "100%",
  },
];

const projectNameMap: Record<string, string> = {
  "PRJ-001": "Downtown Office Complex",
  "PRJ-002": "Residential Tower A",
  "PRJ-003": "Shopping Mall Renovation",
  "PRJ-004": "Industrial Warehouse",
};

const isWithinTimeFilter = (date: string, time: string) => {
  if (time === "all") return true;

  const d = new Date(date);
  const now = new Date();
  const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);

  switch (time) {
    case "this_week":
      return diff <= 7;
    case "last_3_weeks":
      return diff <= 21;
    case "this_month":
      return diff <= 30;
    case "last_6_months":
      return diff <= 180;
    case "this_year":
      return diff <= 365;
    default:
      return true;
  }
};

export default function Reports() {
  const [time, setTime] = useState("all");
  const [projectName, setProjectName] = useState("all");
  const [successOpen, setSuccessOpen] = useState(false);
  const filteredRows = rows.filter((row) => {
    const projectMatch =
      projectName === "all"
        ? true
        : row.project === projectNameMap[projectName];

    const timeMatch = isWithinTimeFilter(row.createdDate, time);

    return projectMatch && timeMatch;
  });

  const filteredReports = reports.filter(
    (r) =>
      (projectName === "all" || r.project === projectName) &&
      isWithinTimeFilter(r.date, time)
  );

  const filteredMaterials =
    projectName === "all" ? materials : materials.slice(0, 2);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex md:flex-row flex-col gap-6 md:items-center justify-between mb-8">
          <div>
            <h1 className="text-[#111827] lg:text-[30px] text-[24px] font-bold leading-[36px]">
              KPIs & Reports
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <CustomSelect
              title="This Week"
              options={timeFilterOptions}
              value={time}
              onChange={setTime}
            />

            <CustomSelect
              title="All Projects"
              options={projectFilterOptions}
              value={projectName}
              onChange={setProjectName}
              width="250px"
              searchable
            />

            <button
              onClick={() => setSuccessOpen(true)}
              className="bg-[#2563EB] h-[38px] gap-2 text-[14px] flex justify-center items-center text-white px-4 rounded-[8px]"
            >
              <img src={ExportIcon} alt="" />
              Export Report
            </button>
            
            <SuccessModal
              open={successOpen}
              title="Report Exported Successfully"
              onClose={() => setSuccessOpen(false)}
            />
          </div>
        </div>

        <StatsOverview stats={stats} showProgress />

        <div className="rounded-[8px] bg-white border border-[#F3F4F6] shadow overflow-hidden mt-6">
          <div className="lg:px-6 px-3 py-5 border-b">
            <h2 className="text-[20px] font-medium text-[#111827]">
              Project Progress vs Plan
            </h2>
          </div>

          <div className="overflow-x-auto scroll-hide w-[calc(100vw-26px)] lg:w-[calc(100vw-324px)]">
            <table className="min-w-[900px] w-full border-collapse rounded-[8px]">
              <tbody>
                {filteredRows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b last:border-b-0 even:bg-[#F9FAFB]"
                  >
                    <td className="lg:px-6 px-3 lg:py-6 py-3 text-[13px] text-[#111827]">
                      {row.project}
                    </td>
                    <td className="lg:px-6 px-3 lg:py-6 py-3">
                      <div className="flex items-center gap-4">
                        <div className="w-[160px] lg:w-[260px] h-2 bg-[#D9D9D9] rounded-full">
                          <div
                            className="h-2 bg-[#2563EB] rounded-full"
                            style={{ width: `${row.actual}%` }}
                          />
                        </div>
                        <span className="text-[13px]">{row.actual}%</span>
                      </div>
                    </td>
                    <td className="lg:px-6 px-3 lg:py-6 py-3">
                      <div className="flex items-center gap-4">
                        <div className="w-[160px] lg:w-[260px] h-2 bg-[#D9D9D9] rounded-full">
                          <div
                            className="h-2 bg-[#9CA3AF] rounded-full"
                            style={{ width: `${row.planned}%` }}
                          />
                        </div>
                        <span className="text-[13px]">{row.planned}%</span>
                      </div>
                    </td>
                    <td className="lg:px-6 px-3 lg:py-6 py-3">
                      <span
                        className={`px-4 py-2 rounded-full text-[13px] ${
                          statusStyles[row.status]
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredRows.length === 0 && (
                  <p className="text-center text-sm text-[#6B7280] py-8">
                    No projects found
                  </p>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-6 mt-6">
          <div className="flex-1 rounded-[8px] lg:p-6 p-3 border bg-white">
            <h2 className="text-[20px] font-medium mb-6">
              Material Usage Efficiency
            </h2>

            {filteredMaterials.map((m) => (
              <div key={m.name} className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-[13px] font-medium">{m.name}</span>
                  <span className="text-[13px] font-medium">{m.percent}%</span>
                </div>
                <div className="h-[8px] bg-[#E5E7EB] rounded-full">
                  <div
                    className={`h-full rounded-full ${m.color}`}
                    style={{ width: `${m.percent}%` }}
                  />
                </div>
              </div>
            ))}
            {filteredMaterials.length === 0 && (
              <p className="text-center text-sm text-[#6B7280] py-8">
                No materials found
              </p>
            )}
          </div>

          <div className="flex-1 rounded-[8px] lg:p-6 p-3 border bg-white">
            <h2 className="text-[20px] font-medium mb-6">
              Safety & Compliance Report
            </h2>

            {filteredReports.map((item, idx) => (
              <div key={idx} className="flex justify-between mb-6 last:mb-0">
                <div>
                  <p className="text-[13px] font-semibold">{item.title}</p>
                  <p className="text-[12px] text-[#6B7280]">
                    {item.project}, {item.date}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-4 py-1 rounded-full text-[13px] ${
                      statusStyles[item.status]
                    }`}
                  >
                    {item.status}
                  </span>
                  <p className="text-[12px] text-[#6B7280] mt-1">
                    Score-{item.score}
                  </p>
                </div>
              </div>
            ))}
            {filteredReports.length === 0 && (
              <p className="text-center text-sm text-[#6B7280] py-8">
                No reports found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
