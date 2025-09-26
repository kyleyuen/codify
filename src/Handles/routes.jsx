import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home.jsx";
import SkillTree from "../pages/SkillTree.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* redirect / → /home */}
      <Route path="/" element={<Navigate to="/home" replace />} />
  <Route path="/home" element={<Home />} />
  <Route path="/skilltree" element={<SkillTree />} />
  {/* alias: support plural path /skilltrees as user requested */}
  <Route path="/skilltrees" element={<SkillTree />} />
  {/* optional: 404 route */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}
