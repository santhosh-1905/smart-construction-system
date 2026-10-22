import { NavLink, Outlet } from 'react-router-dom';

const menuItems = [{ label: 'Home', path: '/' }];
// More menu items will be added per role in later phases.

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 bg-blue-900 p-4 text-white md:block">
        <h1 className="mb-8 text-xl font-bold">Smart Construction</h1>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 text-base font-medium ${
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
        <header className="flex h-16 items-center justify-between bg-white px-4 shadow-sm">
          <span className="font-bold text-blue-900 md:hidden">Smart Construction</span>
          <span className="ml-auto text-sm text-slate-500">Profile (coming soon)</span>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}