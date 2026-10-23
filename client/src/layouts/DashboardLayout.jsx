import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useDemo } from '../demo/DemoContext.jsx';
import { ROLE_LABELS } from '../demo/labels.js';
import Button from '../components/ui/Button.jsx';
import ThemeSwitcher from '../components/ui/ThemeSwitcher.jsx';

const MENUS = {
  md: [
    { label: 'Dashboard', path: '/md' },
    { label: 'Tasks', path: '/md/tasks' },
    { label: 'Material Approvals', path: '/md/approvals' },
  ],
  site_manager: [
    { label: 'Verify Work', path: '/manager' },
    { label: 'Issues', path: '/manager/issues' },
  ],
  chairman: [{ label: 'Dashboard', path: '/chairman' }],
};

export default function DashboardLayout() {
  const { currentUser, logout } = useDemo();
  const location = useLocation();
  const menuItems = MENUS[currentUser.role] || [];

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 bg-blue-900 p-4 text-white md:block">
        <h1 className="mb-8 text-xl font-bold">🏗️ Smart Construction</h1>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 hover:translate-x-1 ${
                  isActive ? 'bg-blue-700' : 'hover:bg-blue-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 bg-white px-4 py-3 shadow-sm">
          <span className="font-bold text-blue-900 md:hidden">Smart Construction</span>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-right text-sm">
              <p className="font-semibold">{currentUser.name}</p>
              <p className="text-slate-500">{ROLE_LABELS[currentUser.role]}</p>
            </div>
            <ThemeSwitcher />
            <Button variant="secondary" onClick={logout}>Log Out</Button>
          </div>
        </header>

        <nav className="flex gap-2 overflow-x-auto bg-white px-4 pb-3 md:hidden">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 ${
                  isActive ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 p-4 md:p-8">
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}