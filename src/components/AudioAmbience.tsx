import { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  const stopAudio = useCallback(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
      setTimeout(() => {
        try {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          noiseSourceRef.current?.stop();
          audioCtxRef.current?.close();
        } catch {
          // ignore cleanup errors
        }
        audioCtxRef.current = null;
      }, 600);
    }
    setIsPlaying(false);
  }, []);

  const startAudio = useCallback(async () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.setTargetAtTime(0.12, ctx.currentTime, 1.2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Low Warm Drone 1 (55Hz - A1)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);

      // Low Drone 2 with slight binaural detune (55.4Hz)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(55.4, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, ctx.currentTime);
      filter.Q.setValueAtTime(1.8, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);

      osc1.start();
      osc2.start();
      osc1Ref.current = osc1;
      osc2Ref.current = osc2;

      // Subtle Tape Hiss / Vinyl noise
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.015;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(800, ctx.currentTime);
      noiseFilter.Q.setValueAtTime(0.8, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, ctx.currentTime);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);

      whiteNoise.start();
      noiseSourceRef.current = whiteNoise;

      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const toggleSound = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    return () => {
      try {
        audioCtxRef.current?.close();
      } catch {
        // noop
      }
    };
  }, []);

  return (
    <button
      id="sound-toggle-btn"
      onClick={toggleSound}
      aria-label={isPlaying ? "Matikan suara ambience" : "Nyalakan suara ambience"}
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
  );
}
