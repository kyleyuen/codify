import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home.jsx";
import SkillTree from "../pages/SkillTree.jsx";
import ProjectsPage from "../pages/ProjectsPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
     {/* redirect / → /home */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/skilltree" element={<SkillTree />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/skilltrees" element={<SkillTree />} />
      
     {/* optional: 404 route */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}
