const COLORS = {
  good: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  bad: 'bg-red-100 text-red-800',
  neutral: 'bg-slate-200 text-slate-700',
};

export default function StatusBadge({ label, tone = 'neutral' }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${COLORS[tone]}`}>
      {label}
    </span>
  );
}