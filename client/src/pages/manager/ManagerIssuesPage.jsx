import { useDemo } from '../../demo/DemoContext.jsx';
import Button from '../../components/ui/Button.jsx';
import StatusBadge from '../../components/ui/StatusBadge.jsx';

export default function ManagerIssuesPage() {
  const { data, currentUser, closeIssue } = useDemo();
  const issues = data.issues.filter((issue) => issue.projectId === currentUser.projectId);

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-2xl font-bold">Site Issues</h2>

      {issues.length === 0 && <p className="text-slate-500">No issues reported.</p>}

      {issues.map((issue) => (
        <div key={issue.id} className="rounded-2xl bg-white p-5 shadow">
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold">{issue.text}</p>
            <StatusBadge
              label={issue.status === 'open' ? 'Open' : 'Closed'}
              tone={issue.status === 'open' ? 'bad' : 'good'}
            />
          </div>
          <p className="mt-1 text-sm text-slate-500">Severity: {issue.severity} | {issue.date}</p>
          {issue.status === 'open' && (
            <div className="mt-4">
              <Button onClick={() => closeIssue(issue.id)}>Mark as Solved</Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}