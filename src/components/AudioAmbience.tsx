import { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { YOUTUBE_VIDEO_ID } from '../data/music';

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  getPlayerState: () => number;
  destroy: () => void;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          videoId: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number; target: YTPlayer }) => void;
            onError?: (event: unknown) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function AudioAmbience() {
  // Toggle is ON by default as requested
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef<YTPlayer | null>(null);
  const isPlayingRef = useRef(true);

  // Keep ref in sync for event callbacks
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const initPlayer = useCallback(() => {
    if (!window.YT || !window.YT.Player) return;

    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch {
        // ignore
      }
      playerRef.current = null;
    }

    try {
      playerRef.current = new window.YT.Player('youtube-hidden-player', {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          modestbranding: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(80);

            // Attempt direct unmuted playback
            try {
              event.target.unMute();
              event.target.playVideo();
            } catch {
              // fallback
            }

            // Fallback for browsers with strict unmuted autoplay restriction:
            // start playback immediately (even if browser requires mute first)
            // and unmute on the very first user interaction
            const handleFirstGesture = () => {
              if (isPlayingRef.current && playerRef.current) {
                try {
                  playerRef.current.unMute();
                  playerRef.current.playVideo();
                } catch {
                  // ignore
                }
              }
              window.removeEventListener('click', handleFirstGesture);
              window.removeEventListener('keydown', handleFirstGesture);
              window.removeEventListener('touchstart', handleFirstGesture);
            };

            window.addEventListener('click', handleFirstGesture, { once: true });
            window.addEventListener('keydown', handleFirstGesture, { once: true });
            window.addEventListener('touchstart', handleFirstGesture, { once: true });
          },
          onStateChange: (event) => {
            // Loop video automatically when finished
            if (window.YT && event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          },
        },
      });
    } catch {
      // ignore
    }
  }, []);

  // Load YouTube IFrame API script
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prevCallback) prevCallback();
      initPlayer();
    };

    if (!document.getElementById('youtube-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, [initPlayer]);

  // Toggle behavior:
  // - sound: on -> unMute (sound active)
  // - sound: off -> mute (silent, but still plays in background!)
  const toggleSound = () => {
    const player = playerRef.current;
    if (isPlaying) {
      // Turn sound OFF: mute without pausing
      if (player) {
        try {
          player.mute();
        } catch {
          // ignore
        }
      }
      setIsPlaying(false);
    } else {
      // Turn sound ON: unmute
      if (player) {
        try {
          player.unMute();
          player.playVideo();
        } catch {
          // ignore
        }
      }
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative flex items-center select-none">
      {/* Hidden YouTube Iframe Player */}
      <div
        id="youtube-player-wrapper"
        aria-hidden="true"
        className="fixed -top-[9999px] -left-[9999px] w-[200px] h-[200px] opacity-0 pointer-events-none z-[-10]"
      >
        <div id="youtube-hidden-player" />
      </div>

      {/* Clean original sound toggle button */}
      <button
        id="sound-toggle-btn"
        onClick={toggleSound}
        aria-label={isPlaying ? "Matikan suara (silent di latar belakang)" : "Nyalakan suara musik"}
        className="group flex items-center gap-2 text-xs font-mono tracking-widest text-[#737373] hover:text-[#d4d4d4] transition-colors duration-300 py-1 px-2.5 rounded border border-transparent hover:border-[#262626] bg-transparent focus:outline-none focus:ring-1 focus:ring-[#525252] cursor-pointer"
      >
        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-[#a3a3a3] animate-pulse" />
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
