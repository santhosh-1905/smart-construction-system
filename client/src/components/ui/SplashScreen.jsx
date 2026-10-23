import { useEffect, useState } from 'react';

export default function SplashScreen({ children }) {
  const [phase, setPhase] = useState('show');

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase('hide'), 1400);
    const removeTimer = setTimeout(() => setPhase('gone'), 1900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {children}
      {phase !== 'gone' && (
        <div
          className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-blue-900 text-white transition-opacity duration-500 ${
            phase === 'hide' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="float text-7xl">🏗️</div>
          <h1 className="pop mt-4 text-3xl font-bold">Smart Construction</h1>
          <p className="mt-1 text-blue-100">Loading your sites...</p>
          <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-blue-800">
            <div className="splash-bar h-full rounded-full bg-white" />
          </div>
        </div>
      )}
    </>
  );
}