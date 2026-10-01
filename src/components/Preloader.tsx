import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const STEPS = ['boot suite', 'load fixtures', 'run smoke', 'run regression', 'verify api', 'write report'];

export function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let raf = 0;
    let timer = 0;
    const start = performance.now();
    const dur = 1500;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(p * 47));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timer = window.setTimeout(onDone, 350);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [onDone]);

  const step = STEPS[Math.min(STEPS.length - 1, Math.floor((n / 47) * STEPS.length))];

  return (
    <motion.div
      className="preloader"
      role="status"
      aria-live="polite"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <p className="mono">RUNNING SUITE</p>
      <p className="pre-count">
        {String(n).padStart(2, '0')}
        <span>/47</span>
      </p>
      <p className="mono pre-step">› {step}{n === 47 ? ' ... ALL PASSED' : ''}</p>
      <div className="pre-bar">
        <i style={{ transform: `scaleX(${n / 47})` }} />
      </div>
    </motion.div>
  );
}
