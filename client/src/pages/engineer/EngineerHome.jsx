import { Link } from 'react-router-dom';
import { useDemo } from '../../demo/DemoContext.jsx';
import { REQUEST_STATUS } from '../../demo/labels.js';
import StatusBadge from '../../components/ui/StatusBadge.jsx';

const TILES = [
  { label: 'Daily Work', icon: '📝', path: '/engineer/work' },
  { label: 'My Tasks', icon: '📋', path: '/engineer/tasks' },
  { label: 'Request Material', icon: '🧱', path: '/engineer/material' },
  { label: 'Report Issue', icon: '⚠️', path: '/engineer/issue' },
];

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function EngineerHome() {
  const { data, currentUser } = useDemo();
  const myRequests = data.materialRequests.filter((item) => item.requestedBy === currentUser.id).slice(0, 3);

  return (
    <div className="space-y-6">
      <h2 className="pop text-xl font-bold">
        {greeting()}, {currentUser.name.replace('Engineer ', '')} 👋
      </h2>

      <div className="stagger grid grid-cols-2 gap-4">
        {TILES.map((tile) => (
          <Link
            key={tile.path}
            to={tile.path}
            className="lift group flex min-h-32 flex-col items-center justify-center rounded-2xl bg-white p-4 text-center shadow"
          >
            <span className="text-4xl transition-transform duration-200 group-hover:scale-125 group-active:scale-90">
              {tile.icon}
            </span>
            <span className="mt-2 text-base font-bold">{tile.label}</span>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="mb-2 text-lg font-bold">My material requests</h2>
        {myRequests.length === 0 && <p className="text-slate-500">No requests yet.</p>}
        <div className="stagger space-y-2">
          {myRequests.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl bg-white p-3 shadow">
              <span>{item.quantity} {item.unit} {item.material}</span>
              <StatusBadge label={REQUEST_STATUS[item.status].label} tone={REQUEST_STATUS[item.status].tone} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}