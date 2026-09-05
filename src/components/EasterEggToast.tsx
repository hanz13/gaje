import { useEffect } from 'react';

interface EasterEggToastProps {
  message: string | null;
  onClose: () => void;
}

export default function EasterEggToast({ message, onClose }: EasterEggToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-500 ease-out animate-subtle-pulse"
    >
      <div className="px-3.5 py-1.5 bg-[#0e0e0e]/95 border border-[#333333] shadow-2xl backdrop-blur-md rounded-sm">
        <p className="text-xs font-mono text-[#d4d4d4] tracking-wider text-center">
          {message}
        </p>
      </div>
    </div>
  );
}
