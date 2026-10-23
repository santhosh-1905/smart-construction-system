import { useState } from 'react';
import { useDemo } from '../../demo/DemoContext.jsx';
import { useLoading } from '../../hooks/useLoading.js';
import { useToast } from '../../components/ui/ToastContext.jsx';
import Button from '../../components/ui/Button.jsx';
import StatusBadge from '../../components/ui/StatusBadge.jsx';
import { Skeleton, SkeletonCard } from '../../components/ui/Skeleton.jsx';

export default function ManagerVerifyPage() {
  const { data, currentUser, reviewReport } = useDemo();
  const toast = useToast();
  const loading = useLoading(700);
  const [busy, setBusy] = useState('');

  const pending = data.reports.filter(
    (report) => report.projectId === currentUser.projectId && report.status === 'pending'
  );
  const taskOf = (id) => data.tasks.find((task) => task.id === id);
  const engineerOf = (id) => data.users.find((user) => user.id === id)?.name || '';

  function review(reportId, approved) {
    setBusy(reportId + approved);
    setTimeout(() => {
      reviewReport(reportId, approved);
      setBusy('');
      toast(approved ? 'Work verified' : 'Work sent back', approved ? 'good' : 'bad');
    }, 700);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <Skeleton className="h-8 w-48" />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-2xl font-bold">Verify Work</h2>
      <p className="text-slate-500">Work counts as official only after you verify it.</p>

      {pending.length === 0 && (
        <div className="pop rounded-2xl bg-white p-6 text-center shadow">
          <p className="text-4xl">✅</p>
          <p className="mt-2 font-semibold">Nothing waiting for verification.</p>
        </div>
      )}

      <div className="stagger space-y-4">
        {pending.map((report) => {
          const task = taskOf(report.taskId);
          return (
            <div key={report.id} className="lift rounded-2xl bg-white p-5 shadow">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-lg font-bold">{task?.title}</p>
                  <p className="text-sm text-slate-500">{engineerOf(report.engineerId)} | {report.date}</p>
                </div>
                <StatusBadge label={`${report.percent}% done`} tone="warning" />
              </div>

              <p className="mt-3 text-sm">
                Before: {task?.completion}% | Workers: {report.workers}
              </p>
              {report.note && <p className="mt-2 rounded-lg bg-slate-50 p-3 text-sm">{report.note}</p>}
              {report.hasPhoto && <p className="mt-2 text-sm font-semibold text-blue-800">📷 Photo attached</p>}

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button
                  loading={busy === report.id + true}
                  disabled={Boolean(busy)}
                  onClick={() => review(report.id, true)}
                >
                  Verify
                </Button>
                <Button
                  variant="danger"
                  loading={busy === report.id + false}
                  disabled={Boolean(busy)}
                  onClick={() => review(report.id, false)}
                >
                  Send Back
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}