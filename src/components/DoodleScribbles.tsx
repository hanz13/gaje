import { useMemo } from 'react';

// Hand-drawn underline under the main headline
export function HeadlineUnderline() {
  return (
    <svg
      viewBox="0 0 240 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-48 sm:w-64 h-3 stroke-[#555555] opacity-60 mt-1 pointer-events-none"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 11 C40 16, 90 6, 140 12 C180 16, 210 9, 236 10" />
      <path d="M30 14 C80 9, 150 15, 220 11" opacity="0.4" strokeWidth="0.8" />
    </svg>
  );
}

// Center celestial orbital loops scribble
export function CelestialLoops() {
  return (
    <div className="relative w-44 h-44 sm:w-60 sm:h-60 pointer-events-none select-none flex items-center justify-center">
      {/* Soft atmospheric cloud behind the celestial loop */}
      <div className="absolute w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-radial from-white/[0.04] via-white/[0.015] to-transparent blur-2xl" />

      {/* Orbit paths with gentle slow spin */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full stroke-[#8a8a8a] opacity-45 animate-slow-spin"
        strokeWidth="0.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {/* Orbital ellipse 1 */}
        <ellipse cx="100" cy="100" rx="78" ry="32" transform="rotate(-25 100 100)" />
        {/* Orbital ellipse 2 */}
        <ellipse cx="100" cy="100" rx="84" ry="24" transform="rotate(35 100 100)" strokeDasharray="3 4" opacity="0.6" />
        {/* Orbital ellipse 3 */}
        <ellipse cx="100" cy="100" rx="60" ry="38" transform="rotate(70 100 100)" opacity="0.5" />
        {/* Loose hand-drawn scribble loops */}
        <path d="M70 90 C60 120, 140 140, 130 95 C120 50, 65 70, 95 115 C115 145, 145 100, 110 75" opacity="0.7" />
        {/* Center tiny planetary nucleus */}
        <circle cx="100" cy="100" r="1.5" fill="#e5e5e5" />
        <circle cx="138" cy="88" r="1" fill="#a3a3a3" />
        <circle cx="65" cy="120" r="0.8" fill="#737373" />
      </svg>

      {/* Subtle glowing nucleus below */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.6)] animate-pulse" />
    </div>
  );
}

// Tangled scribble thread ball (like in reference bottom right)
export function TangledYarn() {
  return (
    <div className="relative flex flex-col items-start select-none">
      <svg
        viewBox="0 0 120 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-24 sm:w-28 h-14 sm:h-16 stroke-[#6b7280] opacity-40 hover:opacity-75 transition-opacity duration-300 pointer-events-auto cursor-help"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 35 C15 20, 45 12, 65 25 C85 38, 105 20, 95 45 C85 70, 40 60, 30 45 C20 30, 80 15, 90 35 C100 55, 60 65, 45 50 C30 35, 50 15, 75 30 C100 45, 80 60, 55 55 C30 50, 25 30, 45 25 C65 20, 85 40, 65 50 C45 60, 35 40, 50 30 C65 20, 90 35, 75 48 C60 61, 40 45, 55 35" />
        <path d="M25 40 Q40 55, 65 42 T95 38" opacity="0.6" />
        <path d="M35 25 Q60 10, 80 28 T90 52" opacity="0.4" />
      </svg>

      <div className="mt-2 text-left font-mono text-[11px] sm:text-xs text-[#737373] leading-relaxed tracking-wider">
        <p>terkadang, diem</p>
        <p>adalah cara paling</p>
        <p className="text-[#a3a3a3]">jujur.</p>
      </div>
    </div>
  );
}

// Bottom right seismograph line & GPS coordinates
export function SeismographAndCoordinates() {
  return (
    <div className="flex flex-col items-end gap-1.5 select-none pointer-events-none">
      <svg
        viewBox="0 0 180 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-32 sm:w-44 h-4 stroke-[#444444] opacity-50"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M0 10 L60 10 L65 4 L70 16 L75 8 L80 14 L85 10 L150 10 L154 2 L158 18 L162 10 L180 10" />
      </svg>
      <span className="text-[10px] font-mono text-[#525252] tracking-widest">
        -6.2088, 106.8456
      </span>
    </div>
  );
}

// Bottom left crosshair measurement
export function TargetCrosshair() {
  return (
    <div className="flex items-center gap-3 select-none pointer-events-none opacity-40">
      <svg
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 stroke-[#666666]"
        strokeWidth="1"
        aria-hidden="true"
      >
        <circle cx="15" cy="15" r="9" />
        <line x1="15" y1="2" x2="15" y2="28" strokeDasharray="2 2" />
        <line x1="2" y1="15" x2="28" y2="15" strokeDasharray="2 2" />
      </svg>
      {/* Small tick scale */}
      <div className="flex flex-col gap-1">
        <span className="w-2 h-[1px] bg-[#555555]" />
        <span className="w-4 h-[1px] bg-[#666666]" />
        <span className="w-2 h-[1px] bg-[#555555]" />
      </div>
    </div>
  );
}

// Floating atmospheric dust specks
export function DustParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 95}%`,
      left: `${Math.random() * 95}%`,
      size: Math.random() * 2.2 + 0.8,
      duration: `${Math.random() * 8 + 10}s`,
      delay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.4 + 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-white animate-dust"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
