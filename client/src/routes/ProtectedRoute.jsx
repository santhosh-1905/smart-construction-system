import { Navigate, Outlet } from 'react-router-dom';
import { useDemo } from '../demo/DemoContext.jsx';
import { homePathFor } from '../demo/labels.js';

export default function ProtectedRoute({ allow }) {
  const { currentUser } = useDemo();

  if (!currentUser) return <Navigate to="/login" replace />;
  if (!allow.includes(currentUser.role)) {
    return <Navigate to={homePathFor(currentUser.role)} replace />;
  }
  return <Outlet />;
}