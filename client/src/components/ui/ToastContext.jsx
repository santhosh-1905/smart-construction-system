import { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((message, tone = 'good') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => setToasts((prev) => prev.filter((item) => item.id !== id)), 2800);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[100] flex flex-col items-center gap-2 px-4 md:bottom-6">
        {toasts.map((item) => (
          <div
            key={item.id}
            className={`toast-in pointer-events-auto rounded-xl px-5 py-3 text-base font-semibold text-white shadow-lg ${
              item.tone === 'bad' ? 'bg-red-600' : 'bg-green-600'
            }`}
          >
            {item.tone === 'bad' ? '✖' : '✔'} {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}