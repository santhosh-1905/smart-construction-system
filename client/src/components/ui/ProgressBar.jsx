import { useEffect, useState } from 'react';

// The bar grows from 0 when it appears. The dark line marks where progress should be today.
export default function ProgressBar({ value, planned }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-4 overflow-hidden rounded-full bg-slate-200">
      <div
        className="h-full rounded-full bg-blue-600 transition-[width] duration-1000 ease-out"
        style={{ width: `${ready ? value : 0}%` }}
      />
      {planned !== undefined && (
        <div
          className="absolute top-0 h-full w-1 bg-slate-900 transition-[left] duration-1000 ease-out"
          style={{ left: `${ready ? Math.min(planned, 99) : 0}%` }}
        />
      )}
    </div>
  );
}