import { NavLink, Outlet } from 'react-router-dom';
import { useDemo } from '../demo/DemoContext.jsx';

const tabs = [
  { label: 'Home', path: '/engineer' },
  { label: 'Tasks', path: '/engineer/tasks' },
];

export default function MobileLayout() {
  const { data, currentUser, logout } = useDemo();
  const project = data.projects.find((item) => item.id === currentUser.projectId);

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-slate-100">
      <header className="flex items-center justify-between bg-blue-800 px-4 py-3 text-white">
        <div>
          <p className="text-lg font-bold">{project?.name || 'No project yet'}</p>
          <p className="text-sm text-blue-100">{currentUser.name}</p>
        </div>
        <button onClick={logout} className="rounded-lg bg-blue-900 px-3 py-2 text-sm font-semibold">
          Log Out
        </button>
      </header>

      <main className="flex-1 p-4 pb-24">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-1/2 flex w-full max-w-md -translate-x-1/2 border-t border-slate-300 bg-white">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end
            className={({ isActive }) =>
              `flex-1 py-4 text-center text-base font-semibold ${isActive ? 'text-blue-800' : 'text-slate-500'}`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}