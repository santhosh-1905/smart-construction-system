import { useState } from 'react';
import { useDemo } from '../../demo/DemoContext.jsx';
import { REQUEST_STATUS } from '../../demo/labels.js';
import { useLoading } from '../../hooks/useLoading.js';
import { useToast } from '../../components/ui/ToastContext.jsx';
import Button from '../../components/ui/Button.jsx';
import StatusBadge from '../../components/ui/StatusBadge.jsx';
import { Skeleton, SkeletonCard } from '../../components/ui/Skeleton.jsx';

export default function MdApprovalsPage() {
  const { data, decideMaterial } = useDemo();
  const toast = useToast();
  const loading = useLoading(600);
  const [busy, setBusy] = useState('');

  const nameOf = (list, id) => list.find((item) => item.id === id)?.name || '';

  function decide(requestId, status) {
    setBusy(requestId + status);
    setTimeout(() => {
      decideMaterial(requestId, status);
      setBusy('');
      toast(status === 'approved' ? 'Request approved' : 'Request rejected', status === 'approved' ? 'good' : 'bad');
    }, 700);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <Skeleton className="h-8 w-56" />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-2xl font-bold">Material Requests</h2>

      {data.materialRequests.length === 0 && <p className="text-slate-500">No requests yet.</p>}

      <div className="stagger space-y-4">
        {data.materialRequests.map((request) => {
          const status = REQUEST_STATUS[request.status];
          return (
            <div key={request.id} className="lift rounded-2xl bg-white p-5 shadow">
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
                  <Button
                    loading={busy === request.id + 'approved'}
                    disabled={Boolean(busy)}
                    onClick={() => decide(request.id, 'approved')}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    loading={busy === request.id + 'rejected'}
                    disabled={Boolean(busy)}
                    onClick={() => decide(request.id, 'rejected')}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}