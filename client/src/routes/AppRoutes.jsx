import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import MobileLayout from '../layouts/MobileLayout.jsx';
import SystemStatusPage from '../pages/shared/SystemStatusPage.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Layout for MD, Site Manager and Chairman */}
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<SystemStatusPage />} />
      </Route>

      {/* Layout for Site Engineer (phone) */}
      <Route element={<MobileLayout />}>
        <Route path="/mobile-preview" element={<SystemStatusPage />} />
      </Route>
    </Routes>
  );
}