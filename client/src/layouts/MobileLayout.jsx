import { NavLink, Outlet } from 'react-router-dom';

const tabs = [
  { label: 'Home', path: '/mobile-preview' },
  { label: 'Tasks', path: '/mobile-preview/tasks' },
  { label: 'Alerts', path: '/mobile-preview/alerts' },
];
// Real tabs and icons will be added in Phase 4.

export default function MobileLayout() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-slate-100">
      <header className="bg-blue-800 px-4 py-4 text-lg font-bold text-white">
        Smart Construction
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
              `flex-1 py-4 text-center text-base font-semibold ${
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