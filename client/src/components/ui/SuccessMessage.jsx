import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6'];

export default function SuccessMessage({ message, backTo = '/engineer' }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        x: (Math.random() - 0.5) * 320,
        y: -(60 + Math.random() * 180),
        r: Math.random() * 720,
        color: COLORS[index % COLORS.length],
        delay: Math.random() * 0.15,
      })),
    []
  );

  return (
    <div className="pop relative overflow-hidden rounded-2xl bg-green-50 p-6 text-center shadow">
      <div className="pointer-events-none absolute left-1/2 top-24">
        {pieces.map((piece) => (
          <span
            key={piece.id}
            className="confetti"
            style={{
              '--x': `${piece.x}px`,
              '--y': `${piece.y}px`,
              '--r': `${piece.r}deg`,
              backgroundColor: piece.color,
              animationDelay: `${piece.delay}s`,
            }}
          />
        ))}
      </div>

      <svg viewBox="0 0 52 52" className="mx-auto h-20 w-20">
        <circle cx="26" cy="26" r="24" fill="none" stroke="#16a34a" strokeWidth="3" className="draw-circle" />
        <path
          d="M14 27l8 8 16-17"
          fill="none"
          stroke="#16a34a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="draw-check"
        />
      </svg>

      <p className="mt-3 text-xl font-bold text-green-800">{message}</p>
      <Link
        to={backTo}
        className="mt-6 block min-h-12 rounded-xl bg-blue-700 px-6 py-3 text-base font-semibold text-white transition active:scale-95"
      >
        Back to Home
      </Link>
    </div>
  );
}