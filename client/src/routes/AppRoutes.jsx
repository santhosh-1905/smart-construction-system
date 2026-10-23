import { Routes, Route, Navigate } from 'react-router-dom';
import { useDemo } from '../demo/DemoContext.jsx';
import { homePathFor } from '../demo/labels.js';
import ProtectedRoute from './ProtectedRoute.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import MobileLayout from '../layouts/MobileLayout.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import SystemStatusPage from '../pages/shared/SystemStatusPage.jsx';
import ProjectsOverview from '../pages/shared/ProjectsOverview.jsx';
import MdTasksPage from '../pages/md/MdTasksPage.jsx';
import MdApprovalsPage from '../pages/md/MdApprovalsPage.jsx';
import ManagerVerifyPage from '../pages/manager/ManagerVerifyPage.jsx';
import ManagerIssuesPage from '../pages/manager/ManagerIssuesPage.jsx';
import EngineerHome from '../pages/engineer/EngineerHome.jsx';
import EngineerTasksPage from '../pages/engineer/EngineerTasksPage.jsx';
import DailyWorkPage from '../pages/engineer/DailyWorkPage.jsx';
import MaterialRequestPage from '../pages/engineer/MaterialRequestPage.jsx';
import IssueReportPage from '../pages/engineer/IssueReportPage.jsx';

function RootRedirect() {
  const { currentUser } = useDemo();
  return <Navigate to={currentUser ? homePathFor(currentUser.role) : '/login'} replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/status" element={<SystemStatusPage />} />

      <Route element={<ProtectedRoute allow={['md']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/md" element={<ProjectsOverview />} />
          <Route path="/md/tasks" element={<MdTasksPage />} />
          <Route path="/md/approvals" element={<MdApprovalsPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allow={['chairman']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/chairman" element={<ProjectsOverview />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allow={['site_manager']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/manager" element={<ManagerVerifyPage />} />
          <Route path="/manager/issues" element={<ManagerIssuesPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allow={['site_engineer']} />}>
        <Route element={<MobileLayout />}>
          <Route path="/engineer" element={<EngineerHome />} />
          <Route path="/engineer/tasks" element={<EngineerTasksPage />} />
          <Route path="/engineer/work" element={<DailyWorkPage />} />
          <Route path="/engineer/material" element={<MaterialRequestPage />} />
          <Route path="/engineer/issue" element={<IssueReportPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}