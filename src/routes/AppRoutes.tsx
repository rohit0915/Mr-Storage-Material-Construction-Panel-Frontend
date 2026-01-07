import { Route, Routes } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Dashboard from "../app/Dashboard";
import Projects from "../app/Projects";
import Tasks from "../app/Tasks";
import Materials from "../app/Materials";
import Reports from "../app/Reports";
import Communication from "../app/Communication";
import Notifications from "../app/Notifications";
import MaterialsViewPage from "../app/MaterialsViewPage";
import ProjectViewPage from "../app/ProjectViewPage"; 
import DrawingAttachment from "../app/DrawingAttachment";
import Login from "../components/home/login";
import ProfilePage from "../app/Profile";
import SettingPage from "../app/Settings";
import ForgotPassword from "../components/home/ForgotPassword";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project-view-page" element={<ProjectViewPage />} />
        <Route path="/drawing-attachment" element={<DrawingAttachment />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/material-view-page" element={<MaterialsViewPage />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>

      {/* <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route> */}
    </Routes>
  );
};

export default AppRoutes;
