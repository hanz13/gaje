import { useState, useEffect } from 'react';
import { RANDOM_THOUGHTS } from '../data/thoughts';

export default function RandomThought() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out'>('fade-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setCurrentIndex((prev) => {
          let next = Math.floor(Math.random() * RANDOM_THOUGHTS.length);
          while (next === prev && RANDOM_THOUGHTS.length > 1) {
            next = Math.floor(Math.random() * RANDOM_THOUGHTS.length);
          }
          return next;
        });
        setFadeState('fade-in');
      }, 700);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="random-thoughts-box"
      className="border border-[#262626] bg-[#0a0a0a]/60 backdrop-blur-xs p-4 sm:p-5 w-full max-w-[270px] sm:max-w-[290px] relative transition-all duration-300 hover:border-[#383838]"
    >
      {/* Corner accents */}
      <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-[#555555]" />
      <div className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-[#555555]" />
      <div className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-[#555555]" />
      <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-[#555555]" />

      <p className="text-[11px] font-mono tracking-widest text-[#666666] mb-3 select-none">
        pikiran random:
      </p>

      <div className="space-y-1 text-xs font-mono text-[#888888] tracking-wide select-none">
        <p>hidup gaje.</p>
        <p>masa depan gaje.</p>
        <p>semuanya gaje.</p>
      </div>

      <div className="my-2.5 h-[1px] bg-[#1a1a1a]" />

      {/* Dynamic fluctuating thought */}
      <div className="min-h-[38px] flex items-center">
        <p
          className={`text-xs font-mono text-[#b5b5b5] italic transition-opacity duration-700 ease-in-out ${
            fadeState === 'fade-in' ? 'opacity-90' : 'opacity-0'
          }`}
        >
          "{RANDOM_THOUGHTS[currentIndex]}"
        </p>
      </div>
    </div>
  );
}
