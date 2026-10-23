// The black line marks where progress should be today (planned).
export default function ProgressBar({ value, planned }) {
  return (
    <div className="relative h-4 overflow-hidden rounded-full bg-slate-200">
      <div className="h-full rounded-full bg-blue-600" style={{ width: `${value}%` }} />
      {planned !== undefined && (
        <div className="absolute top-0 h-full w-1 bg-slate-900" style={{ left: `${Math.min(planned, 99)}%` }} />
      )}
    </div>
  );
}