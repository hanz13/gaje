import { useState, useEffect, useCallback, useRef, type MouseEvent } from 'react';
import AudioAmbience from './components/AudioAmbience';
import FakeLoading from './components/FakeLoading';
import RandomThought from './components/RandomThought';
import AtmosphericPhoto from './components/AtmosphericPhoto';
import TapedNote from './components/TapedNote';
import CustomCursor from './components/CustomCursor';
import EasterEggToast from './components/EasterEggToast';
import SoundNoticeModal from './components/SoundNoticeModal';
import {
  HeadlineUnderline,
  CelestialLoops,
  TangledYarn,
  SeismographAndCoordinates,
  TargetCrosshair,
  DustParticles,
} from './components/DoodleScribbles';

const FEELING_OPTIONS = [
  'kesepian.',
  'capek.',
  'hampa.',
  'kosong.',
  'bingung.',
  'entahlah.',
  'biasa aja.',
  'patah hati.',
  'campur aduk.',
  'ya gitu deh.'
  
];

const TIME_SNIPPETS = ['??:??', '03:17', '02:37', '04:04', '01:59', '??:??'];

export default function App() {
  const [feelingIndex, setFeelingIndex] = useState(0);
  const [timeIndex, setTimeIndex] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);
  const [easterEggMessage, setEasterEggMessage] = useState<string | null>(null);
  const [showSoundModal, setShowSoundModal] = useState(true);

  // Easter egg click counters
  const gajeClickCountRef = useRef(0);
  const blankClickCountRef = useRef(0);
  const lastBlankClickTimeRef = useRef(0);

  // Mouse parallax (subtle, desktop only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX / innerWidth) - 0.5) * 12;
      const y = ((e.clientY / innerHeight) - 0.5) * 12;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Periodic subtle glitch
  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
      }, 220);
    };

    const interval = setInterval(() => {
      if (Math.random() < 0.6) {
        triggerGlitch();
      }
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  // Slow random number / time cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeIndex((prev) => (prev + 1) % TIME_SNIPPETS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Easter egg: Clicking "gaje.lol"
  const handleGajeClick = useCallback(() => {
    gajeClickCountRef.current += 1;
    const count = gajeClickCountRef.current;

    if (count === 5) {
      setEasterEggMessage('ngapain diklik?');
    } else if (count === 8) {
      setEasterEggMessage('serius?');
    } else if (count === 12) {
      setEasterEggMessage('wkwk.');
    } else if (count === 16) {
      setEasterEggMessage('udah ah, ga ada apa-apa lagi di sini.');
    } else if (count > 20 && count % 5 === 0) {
      setEasterEggMessage('masih di sini aja...');
    }
  }, []);

  // Easter egg: Clicking random canvas area
  const handleBackgroundClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    // Ignore clicks on buttons, links, or cards
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.closest('#random-thoughts-box') ||
      target.closest('#atmospheric-photo-card') ||
      target.closest('#taped-note-element')
    ) {
      return;
    }

    const now = Date.now();
    if (now - lastBlankClickTimeRef.current < 2500) {
      blankClickCountRef.current += 1;
    } else {
      blankClickCountRef.current = 1;
    }
    lastBlankClickTimeRef.current = now;

    if (blankClickCountRef.current === 7) {
      setEasterEggMessage('lu gabut ya?');
      blankClickCountRef.current = 0;
    }
  }, []);

  // Cycle feelings on click
  const handleFeelingClick = () => {
    setFeelingIndex((prev) => (prev + 1) % FEELING_OPTIONS.length);
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="relative min-h-screen w-full bg-[#050505] text-[#c5c5c5] font-mono selection:bg-[#262626] selection:text-[#fafafa] flex flex-col justify-between overflow-x-hidden cursor-default"
    >
      {/* Background Atmosphere Layers */}
      <DustParticles />
      <div className="fixed inset-0 grain-overlay z-10" aria-hidden="true" />
      <div className="fixed inset-0 vignette-overlay z-10" aria-hidden="true" />

      {/* Center Atmospheric Nebula behind celestial loops */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] md:w-[680px] h-[340px] sm:h-[540px] md:h-[680px] rounded-full pointer-events-none transition-transform duration-1000 ease-out opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(200,210,230,0.02) 40%, transparent 75%)',
          transform: `translate(calc(-50% + ${mouseOffset.x * 0.8}px), calc(-50% + ${mouseOffset.y * 0.8}px))`,
        }}
        aria-hidden="true"
      />

      {/* Subtle Custom Desktop Cursor */}
      <CustomCursor />

      {/* Small floating Easter Egg notification */}
      <EasterEggToast
        message={easterEggMessage}
        onClose={() => setEasterEggMessage(null)}
      />

      {/* TOP BAR / SUBTLE HEADER */}
      <header className="relative z-20 w-full px-5 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between text-xs tracking-widest select-none">
        <button
          onClick={handleGajeClick}
          aria-label="gaje.lol brand logo"
          className="text-[#6e6e6e] hover:text-[#e0e0e0] transition-colors duration-300 font-mono focus:outline-none focus:ring-1 focus:ring-[#444] rounded px-1 py-0.5"
        >
          gaje.lol
        </button>

        <div className="flex items-center gap-4 sm:gap-6">
          <span
            className={`font-mono text-[#5c5c5c] text-[11px] sm:text-xs tracking-widest tabular-nums transition-opacity duration-500 ${
              isGlitching ? 'opacity-30' : 'opacity-80'
            }`}
          >
            {TIME_SNIPPETS[timeIndex]}
          </span>
          <AudioAmbience />
        </div>
      </header>

      {/* MAIN VIEWPORT CANVAS */}
      <main className="relative z-20 w-full flex-1 px-5 sm:px-10 py-6 sm:py-10 max-w-[1540px] mx-auto flex flex-col justify-center">
        {/* DESKTOP ASYMMETRIC GRID (lg:grid) / MOBILE VERTICAL COMPOSITION */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* LEFT COLUMN: HERO HEADLINE, QUESTIONS, RANDOM THOUGHTS BOX (Cols 1-5) */}
          <section className="lg:col-span-5 flex flex-col items-start space-y-7 sm:space-y-9">
            {/* Main distressed serif headline */}
            <div className="relative select-none">
              <h1
                onClick={handleGajeClick}
                className={`font-['Cormorant_Garamond',serif] text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#eaeaea] lowercase font-light cursor-pointer transition-all duration-200 ${
                  isGlitching ? 'glitch-periodic text-[#f5f5f5]' : 'hover:text-white'
                }`}
                style={{ fontVariationSettings: '"wght" 300' }}
              >
                gaje.lol
              </h1>
              <HeadlineUnderline />
            </div>

            {/* Sub-statements */}
            <div className="space-y-1 text-xs sm:text-sm font-mono tracking-wider text-[#8a8a8a] select-none">
              <p>ini bukan website.</p>
              <p>
                tapi <span className="text-[#bfbfbf] hover:text-white transition-colors cursor-help">isi kepala</span>.
              </p>
              <p className="text-[#4f4f4f] tracking-[0.25em] text-[10px] sm:text-xs pt-1">
                .....
              </p>
            </div>

            {/* Question & Answer: 'kamu lagi ngerasain apa?' -> 'entahlah.' */}
            <div className="pt-1 select-none">
              <p className="text-[11px] sm:text-xs font-mono text-[#666666] tracking-wider">
                kamu
              </p>
              <p className="text-xs sm:text-sm font-mono text-[#8c8c8c] tracking-wider mb-2">
                lagi ngerasain apa?
              </p>
              <button
                onClick={handleFeelingClick}
                title="Klik untuk ganti perasaan"
                className="group flex items-baseline gap-2 text-left focus:outline-none focus:underline"
              >
                <span className="font-['Newsreader',Georgia,serif] italic text-2xl sm:text-3xl text-[#d4d4d4] group-hover:text-white tracking-wide transition-colors">
                  {FEELING_OPTIONS[feelingIndex]}
                </span>
                <span className="text-[10px] font-mono text-[#525252] opacity-0 group-hover:opacity-100 transition-opacity">
                  (klik)
                </span>
              </button>
            </div>

            {/* Boxed pikiran random */}
            <RandomThought />

            {/* Bottom-left measurement & crosshairs */}
            <div className="pt-2 hidden lg:block">
              <TargetCrosshair />
            </div>
          </section>

          {/* CENTER COLUMN: CELESTIAL ORBITS & FAKE LOADING (Cols 6-8) */}
          <section className="lg:col-span-3 flex flex-col items-center justify-center py-4 lg:py-0 space-y-8 sm:space-y-12">
            {/* Celestial orbit scribble with mouse drift */}
            <div
              className="transition-transform duration-700 ease-out"
              style={{
                transform: `translate(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px)`,
              }}
            >
              <CelestialLoops />
            </div>

            {/* Absurd Fake Loading Bar */}
            <FakeLoading />
          </section>

          {/* RIGHT COLUMN: TAPED NOTE, PHOTO, TANGLED YARN, SEISMOGRAPH (Cols 9-12) */}
          <section className="lg:col-span-4 flex flex-col items-center lg:items-end space-y-7 sm:space-y-9">
            {/* Top-Right Taped Note */}
            <div
              className="self-center lg:self-end transition-transform duration-500 ease-out"
              style={{
                transform: `translate(${mouseOffset.x * -0.3}px, ${mouseOffset.y * -0.3}px)`,
              }}
            >
              <TapedNote />
            </div>

            {/* Taped Atmospheric Photo */}
            <div
              className="transition-transform duration-700 ease-out"
              style={{
                transform: `translate(${mouseOffset.x * -0.5}px, ${mouseOffset.y * -0.5}px)`,
              }}
            >
              <AtmosphericPhoto />
            </div>

            {/* Tangled Yarn ball scribble & quotation */}
            <div className="self-center lg:self-end pt-1">
              <TangledYarn />
            </div>
          </section>

        </div>
      </main>

      {/* FOOTER AREA / BOTTOM METRICS */}
      <footer className="relative z-20 w-full px-5 sm:px-10 pb-6 sm:pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
        {/* Mobile crosshair display */}
        <div className="lg:hidden self-start">
          <TargetCrosshair />
        </div>

        {/* Faint existential copyright & Mas Han credit */}
        <div className="text-[10px] sm:text-[11px] font-mono text-[#555555] tracking-widest text-center sm:text-left flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span>ga jelas, tapi somehow indah.</span>
          <span className="hidden sm:inline text-[#2e2e2e]">/</span>
          <span className="text-[#888888]">dibuat sama Mas Han.</span>
        </div>

        {/* Seismograph glitch line and Jakarta coordinates */}
        <SeismographAndCoordinates />
      </footer>

      {/* Pop-up modal notice to enable sound */}
      <SoundNoticeModal
        isOpen={showSoundModal}
        onClose={() => setShowSoundModal(false)}
      />
    </div>
  );
}
