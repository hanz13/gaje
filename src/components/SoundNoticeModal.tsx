import { X } from 'lucide-react';

interface SoundNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SoundNoticeModal({ isOpen, onClose }: SoundNoticeModalProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    // Notify sound controller to ensure unmuted playback
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sound-modal-closed'));
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pemberitahuan"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md select-none"
    >
      <div className="relative w-full max-w-sm p-6 sm:p-7 bg-[#0a0a0a] border border-[#262626] rounded-xs shadow-[0_0_50px_rgba(0,0,0,0.8)] font-mono text-center flex flex-col items-center">
        {/* Close icon button at top-right */}
        <button
          onClick={handleClose}
          aria-label="Tutup pemberitahuan"
          className="absolute top-3 right-3 p-1 text-[#555555] hover:text-[#cccccc] transition-colors cursor-pointer focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Message text without speaker icon */}
        <p className="text-xs sm:text-[13px] text-[#cccccc] leading-relaxed tracking-wide mt-2 mb-6 text-center">
          hai kamu, ini web isinya ngeluarin isi keresahan yang ada di kepala. maafin kalau gaje karena sesuai nama project webnya wkwk
        </p>

        {/* Minimalist close action button */}
        <button
          onClick={handleClose}
          className="px-5 py-2 text-xs font-mono tracking-widest text-[#e0e0e0] bg-[#161616] hover:bg-[#222222] border border-[#333333] hover:border-[#4f4f4f] rounded-xs transition-colors duration-200 cursor-pointer focus:outline-none"
        >
          [ tutup ]
        </button>
      </div>
    </div>
  );
}
