import { useState, useEffect, useRef } from 'react';

export default function FakeLoading() {
  const [progress, setProgress] = useState(0);
  const directionRef = useRef<'up' | 'down'>('up');

  useEffect(() => {
    // Strictly sequential: increments by exactly 1% per second (1000ms) up to 99%,
    // then decrements by exactly 1% per second down to 0%, without skipping numbers.
    const INTERVAL_MS = 1000;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (directionRef.current === 'up') {
          if (prev >= 99) {
            directionRef.current = 'down';
            return 98;
          }
          return prev + 1;
        } else {
          if (prev <= 0) {
            directionRef.current = 'up';
            return 1;
          }
          return prev - 1;
        }
      });
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div id="fake-loading-section" className="flex flex-col items-center select-none text-center">
      <p className="text-xs font-mono tracking-widest text-[#737373] mb-2.5">
        loading perasaan ...
      </p>

      {/* Retro / distressed bar container */}
      <div
        role="progressbar"
        aria-label="Loading perasaan"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={99}
        className="w-48 sm:w-56 h-[10px] sm:h-3 border border-[#333333] bg-[#0c0c0c] p-[2px] relative overflow-hidden shadow-inner"
      >
        {/* Progress fill synchronized smoothly with the 1-second cadence */}
        <div
          className="h-full bg-gradient-to-r from-[#525252] to-[#888888] transition-all duration-1000 ease-linear opacity-85"
          style={{ width: `${progress}%` }}
        />
        {/* Subtle striped overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 2px, transparent 2px, transparent 4px)',
          }}
        />
      </div>

      <span className="text-[11px] font-mono tracking-wider text-[#666666] mt-2 tabular-nums">
        {progress}%
      </span>
    </div>
  );
}
