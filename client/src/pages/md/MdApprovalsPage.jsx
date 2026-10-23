import { useDemo } from '../../demo/DemoContext.jsx';
import { REQUEST_STATUS } from '../../demo/labels.js';
import Button from '../../components/ui/Button.jsx';
import StatusBadge from '../../components/ui/StatusBadge.jsx';

export default function MdApprovalsPage() {
  const { data, decideMaterial } = useDemo();
  const nameOf = (list, id) => list.find((item) => item.id === id)?.name || '';

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-2xl font-bold">Material Requests</h2>

      {data.materialRequests.length === 0 && <p className="text-slate-500">No requests yet.</p>}

      {data.materialRequests.map((request) => {
        const status = REQUEST_STATUS[request.status];
        return (
          <div key={request.id} className="rounded-2xl bg-white p-5 shadow">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-lg font-bold">{request.quantity} {request.unit} of {request.material}</p>
                <p className="text-sm text-slate-500">
                  {nameOf(data.projects, request.projectId)} | by {nameOf(data.users, request.requestedBy)} | {request.date}
                </p>
              </div>
              <StatusBadge label={status.label} tone={status.tone} />
            </div>

            {request.status === 'pending' && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button onClick={() => decideMaterial(request.id, 'approved')}>Approve</Button>
                <Button variant="danger" onClick={() => decideMaterial(request.id, 'rejected')}>Reject</Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}