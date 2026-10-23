import { useDemo } from '../../demo/DemoContext.jsx';
import { PRIORITY_TONE, TASK_STATUS_LABELS } from '../../demo/labels.js';
import { isTaskOverdue } from '../../demo/progress.js';
import ProgressBar from '../../components/ui/ProgressBar.jsx';
import StatusBadge from '../../components/ui/StatusBadge.jsx';

export default function EngineerTasksPage() {
  const { data, currentUser } = useDemo();
  const tasks = data.tasks.filter((task) => task.assignedTo === currentUser.id);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Tasks</h2>
      {tasks.length === 0 && <p className="text-slate-500">No tasks assigned yet.</p>}

      {tasks.map((task) => (
        <div key={task.id} className="rounded-2xl bg-white p-4 shadow">
          <div className="flex items-start justify-between gap-2">
            <p className="text-lg font-bold">{task.title}</p>
            <StatusBadge label={task.priority} tone={PRIORITY_TONE[task.priority]} />
          </div>
          <p className="mt-1 text-sm text-slate-600">
            {TASK_STATUS_LABELS[task.status]} | Deadline {task.deadline}
          </p>
          {isTaskOverdue(task) && <p className="mt-1 text-sm font-semibold text-red-700">Overdue</p>}
          <div className="mt-3">
            <ProgressBar value={task.completion} />
            <p className="mt-1 text-sm">{task.completion}% done (verified)</p>
          </div>
        </div>
      ))}
    </div>
  );
}