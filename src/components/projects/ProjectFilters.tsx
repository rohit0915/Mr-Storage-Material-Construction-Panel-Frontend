import { MenuItem, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

export default function ProjectFilters() {
  const [project, setProject] = useState("all");
  const [manager, setManager] = useState("all");
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs("2024-01-01")
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(
    dayjs("2024-12-31")
  );

  return (
    <div className="rounded-[8px] p-6 border !bg-white border-[#F3F4F6] !shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="grid grid-cols-4 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-[#374151]">
              Project
            </label>
            <Select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              fullWidth
              displayEmpty
              sx={inputStyle}
            >
              <MenuItem value="all">All Projects</MenuItem>
              <MenuItem value="p1">Project A</MenuItem>
              <MenuItem value="p2">Project B</MenuItem>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-[#374151]">
              Start Date
            </label>
            <DatePicker
              value={startDate}
              onChange={setStartDate}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: inputStyle,
                },
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-[#374151]">
              End Date
            </label>
            <DatePicker
              value={endDate}
              onChange={setEndDate}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: inputStyle,
                },
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-[#374151]">
              Field Manager
            </label>
            <Select
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              fullWidth
              displayEmpty
              sx={inputStyle}
            >
              <MenuItem value="all">All Managers</MenuItem>
              <MenuItem value="m1">John Doe</MenuItem>
              <MenuItem value="m2">Jane Smith</MenuItem>
            </Select>
          </div>
        </div>
      </LocalizationProvider>
    </div>
  );
}

const inputStyle = {
  height: 40,
  fontSize:14,
  borderRadius: "10px",
  backgroundColor: "#fff",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    borderColor: "#D1D5DB",
  },
  "& .MuiPickersOutlinedInput-root": {
    borderRadius: "8px",
    borderColor: "#D1D5DB",
    fontSize:14,
    height: 40,
  },
  "& .MuiPickersInputBase-sectionsContainer": {
    padding: 0,
    fontSize:14,
  },
};
