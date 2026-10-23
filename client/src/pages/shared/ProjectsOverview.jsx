import { useDemo } from '../../demo/DemoContext.jsx';
import { projectProgress, projectState, isTaskOverdue } from '../../demo/progress.js';
import { useLoading } from '../../hooks/useLoading.js';
import ProgressBar from '../../components/ui/ProgressBar.jsx';
import StatusBadge from '../../components/ui/StatusBadge.jsx';
import CountUp from '../../components/ui/CountUp.jsx';
import { Skeleton, SkeletonCard } from '../../components/ui/Skeleton.jsx';

function StatCard({ label, value, tone = 'text-slate-800' }) {
  return (
    <div className="lift rounded-2xl bg-white p-4 shadow">
      <p className={`text-3xl font-bold ${tone}`}>
        <CountUp value={value} />
      </p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

export default function ProjectsOverview() {
  const { data } = useDemo();
  const loading = useLoading(900);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((item) => <Skeleton key={item} className="h-24" />)}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((item) => <SkeletonCard key={item} />)}
        </div>
      </div>
    );
  }

  const rows = data.projects.map((project) => {
    const tasks = data.tasks.filter((task) => task.projectId === project.id);
    const { actual, planned } = projectProgress(tasks);
    return {
      project,
      actual,
      planned,
      state: projectState(actual, planned),
      overdue: tasks.filter(isTaskOverdue).length,
      openIssues: data.issues.filter((issue) => issue.projectId === project.id && issue.status === 'open').length,
    };
  });

  const delayedCount = rows.filter((row) => row.state.label === 'Delayed').length;
  const openIssueCount = rows.reduce((sum, row) => sum + row.openIssues, 0);
  const pendingRequests = data.materialRequests.filter((item) => item.status === 'pending').length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">All Projects</h2>

      <div className="stagger grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Projects" value={rows.length} />
        <StatCard label="Delayed" value={delayedCount} tone="text-red-600" />
        <StatCard label="Open issues" value={openIssueCount} tone="text-amber-600" />
        <StatCard label="Material requests waiting" value={pendingRequests} />
      </div>

      <div className="stagger grid gap-4 md:grid-cols-2">
        {rows.map(({ project, actual, planned, state, overdue, openIssues }) => (
          <div key={project.id} className="lift rounded-2xl bg-white p-5 shadow">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold">{project.name}</h3>
                <p className="text-sm text-slate-500">{project.location}</p>
              </div>
              <StatusBadge label={state.label} tone={state.tone} />
            </div>

            <ProgressBar value={actual} planned={planned} />
            <p className="mt-2 text-sm text-slate-600">
              Actual {actual}% | Should be {planned}% by today (dark line)
            </p>

            {state.label !== 'On track' && (
              <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
                Behind by {state.gap}%. {overdue} overdue task(s), {openIssues} open issue(s).
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}