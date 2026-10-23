export const ROLE_LABELS = {
  chairman: 'Chairman',
  md: 'Managing Director',
  site_manager: 'Site Manager',
  site_engineer: 'Site Engineer',
};

export function homePathFor(role) {
  const paths = {
    md: '/md',
    chairman: '/chairman',
    site_manager: '/manager',
    site_engineer: '/engineer',
  };
  return paths[role] || '/login';
}

export const PRIORITY_TONE = { High: 'bad', Medium: 'warning', Low: 'neutral' };

export const TASK_STATUS_LABELS = {
  pending: 'Pending',
  assigned: 'Assigned',
  in_progress: 'In Progress',
  paused: 'Paused',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const REQUEST_STATUS = {
  pending: { label: 'Waiting', tone: 'warning' },
  approved: { label: 'Approved', tone: 'good' },
  rejected: { label: 'Rejected', tone: 'bad' },
  verified: { label: 'Verified', tone: 'good' },
};