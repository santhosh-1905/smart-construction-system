import { createContext, useContext, useEffect, useState } from 'react';

const KEY = 'demo-theme-v1';
const DEFAULT_THEME = { mode: 'light', accent: 'blue' };

export const ACCENTS = [
  { id: 'blue', color: '#1d4ed8' },
  { id: 'green', color: '#047857' },
  { id: 'orange', color: '#c2410c' },
  { id: 'purple', color: '#6d28d9' },
];

const ThemeContext = createContext(null);

function loadTheme() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(loadTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme.mode === 'dark');
    document.documentElement.dataset.accent = theme.accent;
    localStorage.setItem(KEY, JSON.stringify(theme));
  }, [theme]);

  const value = {
    mode: theme.mode,
    accent: theme.accent,
    toggleMode: () => setTheme((prev) => ({ ...prev, mode: prev.mode === 'dark' ? 'light' : 'dark' })),
    setAccent: (accent) => setTheme((prev) => ({ ...prev, accent })),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}