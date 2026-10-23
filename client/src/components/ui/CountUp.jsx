import { useEffect, useState } from 'react';

export default function CountUp({ value, duration = 800, suffix = '' }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setShown(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return <>{shown}{suffix}</>;
}