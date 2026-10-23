import { useState } from 'react';
import { ACCENTS, useTheme } from '../../theme/ThemeContext.jsx';

export default function ThemeSwitcher() {
  const { mode, accent, setAccent, toggleMode } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change theme"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-xl transition hover:rotate-12 active:scale-90"
      >
        🎨
      </button>

      {open && (
        <div className="pop absolute right-0 z-50 mt-2 w-56 rounded-2xl bg-white p-4 text-slate-800 shadow-xl">
          <p className="mb-2 text-sm font-semibold">Mode</p>
          <button
            onClick={toggleMode}
            className="mb-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-200 font-semibold transition active:scale-95"
          >
            {mode === 'dark' ? '☀️ Light mode' : '🌙 Dark mode'}
          </button>

          <p className="mb-2 text-sm font-semibold">Color</p>
          <div className="flex gap-3">
            {ACCENTS.map((item) => (
              <button
                key={item.id}
                onClick={() => setAccent(item.id)}
                aria-label={item.id}
                className={`h-9 w-9 rounded-full transition hover:scale-110 active:scale-90 ${
                  accent === item.id ? 'ring-4 ring-slate-400' : ''
                }`}
                style={{ backgroundColor: item.color }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}