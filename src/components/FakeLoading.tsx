import { useState, useEffect } from 'react';

export default function FakeLoading() {
  const [progress, setProgress] = useState(38);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Fluctuates unpredictably between 20 and 89
        const isBackwards = Math.random() < 0.38;
        const delta = Math.floor(Math.random() * 7) + 1;
        
        let next = isBackwards ? prev - delta : prev + delta;
        if (next > 89) next = 89 - Math.floor(Math.random() * 12);
        if (next < 20) next = 20 + Math.floor(Math.random() * 10);
        return next;
      });
    }, 2800);

    return () => clearInterval(interval);
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
        aria-valuemax={100}
        className="w-48 sm:w-56 h-[10px] sm:h-3 border border-[#333333] bg-[#0c0c0c] p-[2px] relative overflow-hidden shadow-inner"
      >
        {/* Progress fill */}
        <div
          className="h-full bg-gradient-to-r from-[#525252] to-[#888888] transition-all duration-700 ease-out opacity-85"
          style={{ width: `${progress}%` }}
        />
        {/* Subtle striped overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 2px, transparent 2px, transparent 4px)'
          }}
        />
      </div>

      <span className="text-[11px] font-mono tracking-wider text-[#666666] mt-2 tabular-nums">
        {progress}%
      </span>
    </div>
  );
}
