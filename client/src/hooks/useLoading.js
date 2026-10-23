import { useEffect, useState } from 'react';

// Shows a loading state for a short time, so the demo feels like real data is loading.
export function useLoading(milliseconds = 700) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), milliseconds);
    return () => clearTimeout(timer);
  }, [milliseconds]);

  return loading;
}