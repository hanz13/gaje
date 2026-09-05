import { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { YOUTUBE_VIDEO_ID } from '../data/music';

export default function AudioAmbience() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const isPlayingRef = useRef(true);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Send instantaneous commands to the YouTube iframe via postMessage
  const sendCommand = useCallback((func: string, args: unknown[] = []) => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func,
            args,
          }),
          '*'
        );
      } catch {
        // ignore cross-origin errors if any
      }
    }
  }, []);

  // Ensure playback starts on mobile / strict browsers on the first user interaction
  useEffect(() => {
    const handleFirstUserInteraction = () => {
      if (isPlayingRef.current) {
        sendCommand('unMute');
        sendCommand('playVideo');
      }
      // Remove listeners once interacted
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      window.removeEventListener('touchend', handleFirstUserInteraction);
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('pointerdown', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
    };

    window.addEventListener('touchstart', handleFirstUserInteraction, { passive: true });
    window.addEventListener('touchend', handleFirstUserInteraction, { passive: true });
    window.addEventListener('click', handleFirstUserInteraction);
    window.addEventListener('pointerdown', handleFirstUserInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstUserInteraction);

    return () => {
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      window.removeEventListener('touchend', handleFirstUserInteraction);
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('pointerdown', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
    };
  }, [sendCommand]);

  // When the iframe is ready / loaded
  const handleIframeLoad = () => {
    setIsIframeLoaded(true);

    // Initial handshake & trigger immediate unmuted playback
    sendCommand('listening');
    sendCommand('setVolume', [85]);

    // Multiple kickstarts to eliminate any browser / iframe buffer delay
    sendCommand('playVideo');
    if (isPlayingRef.current) {
      sendCommand('unMute');
      sendCommand('playVideo');
    }

    // Safety repeat after 400ms to guarantee YouTube internal player caught the command
    setTimeout(() => {
      if (isPlayingRef.current) {
        sendCommand('unMute');
        sendCommand('playVideo');
      }
    }, 400);

    setTimeout(() => {
      if (isPlayingRef.current) {
        sendCommand('unMute');
        sendCommand('playVideo');
      }
    }, 1200);
  };

  // Toggle behavior:
  // - sound: on -> unMute & play
  // - sound: off -> mute (silent, continues playing in background!)
  const toggleSound = () => {
    if (isPlaying) {
      // Turn sound OFF: mute without pausing
      sendCommand('mute');
      setIsPlaying(false);
    } else {
      // Turn sound ON: unmute
      sendCommand('unMute');
      sendCommand('playVideo');
      setIsPlaying(true);
    }
  };

  const originUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const embedUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=1&mute=0&controls=0&playsinline=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&origin=${encodeURIComponent(originUrl)}`;

  return (
    <div className="relative flex items-center select-none">
      {/* 
        Embedded YouTube Iframe:
        Placed at 1px size inside viewport (bottom: 0, right: 0, opacity: 0.01)
        This prevents iOS/Android from throttling it as "offscreen / inactive",
        while remaining totally invisible to the user.
      */}
      <div
        id="youtube-player-container"
        aria-hidden="true"
        className="fixed bottom-0 right-0 w-[1px] h-[1px] opacity-[0.01] pointer-events-none overflow-hidden z-[-1]"
      >
        <iframe
          ref={iframeRef}
          id="youtube-player-iframe"
          title="background ambient audio"
          src={embedUrl}
          onLoad={handleIframeLoad}
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
          className="w-[120px] h-[120px] border-0"
        />
      </div>

      {/* Clean original sound toggle button */}
      <button
        id="sound-toggle-btn"
        onClick={toggleSound}
        aria-label={isPlaying ? "Matikan suara (silent di latar belakang)" : "Nyalakan suara musik"}
        className="group flex items-center gap-2 text-xs font-mono tracking-widest text-[#737373] hover:text-[#d4d4d4] transition-colors duration-300 py-1 px-2.5 rounded border border-transparent hover:border-[#262626] bg-transparent focus:outline-none focus:ring-1 focus:ring-[#525252] cursor-pointer"
      >
        {isPlaying ? (
          <Volume2 className={`w-3.5 h-3.5 text-[#a3a3a3] ${isIframeLoaded ? 'animate-pulse' : 'opacity-70'}`} />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-[#525252] group-hover:text-[#8a8a8a]" />
        )}
        <span className="select-none lowercase">
          sound: {isPlaying ? 'on' : 'off'}
        </span>
        {isPlaying && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#a3a3a3] animate-ping ml-0.5" />
        )}
      </button>
    </div>
  );
}
