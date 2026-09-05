import { useState } from 'react';

export default function AtmosphericPhoto() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id="atmospheric-photo-card"
      className="relative flex flex-col items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Photo Frame Container with tilt */}
      <div className="relative group p-2 bg-[#0c0c0c] border border-[#202020] shadow-2xl transition-transform duration-700 ease-out hover:rotate-[-0.5deg]">
        {/* Top-Right Frosted Scotch Tape */}
        <div 
          className="scotch-tape absolute -top-3.5 right-6 w-14 h-5 rotate-[7deg] z-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Top-Left Frosted Scotch Tape */}
        <div 
          className="scotch-tape absolute -top-3 -left-4 w-12 h-5 rotate-[-12deg] z-20 pointer-events-none opacity-80"
          aria-hidden="true"
        />

        {/* Photo with subtle film grain, dark tint, and slight blur that sharpens on hover */}
        <div className="relative w-44 sm:w-56 h-56 sm:h-72 overflow-hidden bg-[#070707]">
          <img
            src="/images/mood.jpg"
            alt="moody twilight melancholic sky with wires"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover grayscale contrast-125 brightness-75 transition-all duration-1000 ease-out ${
              isHovered ? 'scale-105 filter blur-none brightness-90' : 'filter blur-[0.4px] brightness-70'
            }`}
          />
          {/* Subtle noise and dark vignette layer over photo */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-[#080d14]/15 mix-blend-overlay pointer-events-none" />

          {/* Faint cross mark on the photo like reference */}
          <span 
            className="absolute bottom-3 right-3 text-[#737373] text-xs font-mono opacity-50 select-none pointer-events-none"
            aria-hidden="true"
          >
            ✕
          </span>
        </div>

        {/* Polaroid bottom border subtle margin */}
        <div className="h-4 w-full bg-[#0c0c0c]" />
      </div>

      {/* Hand-drawn scribble signature under photo like reference */}
      <div className="w-full max-w-[200px] mt-2 flex justify-center opacity-40 hover:opacity-75 transition-opacity duration-300">
        <svg
          viewBox="0 0 160 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-36 h-7 stroke-[#a3a3a3]"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 18 C25 24, 40 10, 60 18 C80 25, 95 12, 115 17 C130 20, 145 10, 155 16" />
          <path d="M20 22 C50 12, 85 24, 120 15 C135 12, 145 19, 158 14" opacity="0.6" />
        </svg>
      </div>

      {/* Melancholic caption underneath */}
      <p className="text-[11px] sm:text-xs font-mono text-[#787878] tracking-widest mt-2 select-none text-center">
        ga semua luka keliatan.
      </p>
    </div>
  );
}
