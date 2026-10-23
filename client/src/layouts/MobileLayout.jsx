import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useDemo } from '../demo/DemoContext.jsx';
import ThemeSwitcher from '../components/ui/ThemeSwitcher.jsx';

const tabs = [
  { label: 'Home', path: '/engineer' },
  { label: 'Tasks', path: '/engineer/tasks' },
];

export default function MobileLayout() {
  const { data, currentUser, logout } = useDemo();
  const location = useLocation();
  const project = data.projects.find((item) => item.id === currentUser.projectId);

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-slate-100">
      <header className="flex items-center justify-between gap-2 bg-blue-800 px-4 py-3 text-white">
        <div className="min-w-0">
          <p className="truncate text-lg font-bold">{project?.name || 'No project yet'}</p>
          <p className="text-sm text-blue-100">{currentUser.name}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeSwitcher />
          <button
            onClick={logout}
            className="rounded-lg bg-blue-900 px-3 py-2 text-sm font-semibold transition active:scale-95"
          >
            Log Out
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 pb-24">
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </main>

      <nav className="fixed bottom-0 left-1/2 flex w-full max-w-md -translate-x-1/2 border-t border-slate-300 bg-white">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end
            className={({ isActive }) =>
              `flex-1 py-4 text-center text-base font-semibold transition active:scale-95 ${
                isActive ? 'text-blue-800' : 'text-slate-500'
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}