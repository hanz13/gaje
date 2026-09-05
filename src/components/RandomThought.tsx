import { useState, useEffect, useRef } from 'react';
import { RANDOM_THOUGHTS } from '../data/thoughts';

// Fisher-Yates shuffle to create a randomized queue of all thoughts
function createShuffledDeck(length: number, previousLastIndex?: number): number[] {
  const deck = Array.from({ length }, (_, i) => i);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  // Prevent immediate repetition across shuffle cycles
  if (previousLastIndex !== undefined && deck.length > 1 && deck[0] === previousLastIndex) {
    [deck[0], deck[deck.length - 1]] = [deck[deck.length - 1], deck[0]];
  }
  return deck;
}

export default function RandomThought() {
  const deckRef = useRef<number[]>([]);
  const pointerRef = useRef<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out'>('fade-in');

  // Initialize randomized deck on first mount
  useEffect(() => {
    const initialDeck = createShuffledDeck(RANDOM_THOUGHTS.length);
    deckRef.current = initialDeck;
    pointerRef.current = 0;
    setCurrentIndex(initialDeck[0]);
  }, []);

  useEffect(() => {
    // 7-second interval to allow comfortable reading
    const interval = setInterval(() => {
      setFadeState('fade-out');

      setTimeout(() => {
        if (deckRef.current.length === 0) {
          deckRef.current = createShuffledDeck(RANDOM_THOUGHTS.length);
          pointerRef.current = 0;
        }

        // Advance pointer to the next thought in the queue
        pointerRef.current += 1;

        // When all thoughts in the deck have appeared once, shuffle a fresh deck
        if (pointerRef.current >= deckRef.current.length) {
          const lastShown = deckRef.current[deckRef.current.length - 1];
          deckRef.current = createShuffledDeck(RANDOM_THOUGHTS.length, lastShown);
          pointerRef.current = 0;
        }

        const nextIndex = deckRef.current[pointerRef.current];
        setCurrentIndex(nextIndex);
        setFadeState('fade-in');
      }, 600);
    }, 7000);

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
        isi kepala sekarang:
      </p>

      <div className="space-y-1 text-xs font-mono text-[#888888] tracking-wide select-none">
        <p>hidup gaje.</p>
        <p>masa depan gaje.</p>
        <p>kisah cinta gaje.</p>
        <p>beberapa hal juga gaje.</p>
        <p>jadi harus gimana?</p>
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
