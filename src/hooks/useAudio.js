import { useCallback, useRef, useEffect } from 'react';

// Audio context for generating sounds programmatically
// No external audio files needed - creates authentic cinema sounds

export function useAudio(enabled = true) {
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Initialize audio context on first user interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
    };

    // Audio context requires user interaction to start
    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('keydown', initAudio, { once: true });

    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };
  }, []);

  const playSound = useCallback((type) => {
    if (!enabled || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    switch (type) {
      case 'click': {
        // Mechanical click - like a slide projector advancing
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }

      case 'hover': {
        // Subtle electric hum - neon sign buzz
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(60, now); // 60Hz hum

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(120, now); // First harmonic

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.02, now + 0.1);
        gain.gain.linearRampToValueAtTime(0, now + 0.3);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.3);
        osc2.stop(now + 0.3);
        break;
      }

      case 'flicker': {
        // Quick static burst
        const bufferSize = ctx.sampleRate * 0.05;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.1;
        }

        const source = ctx.createBufferSource();
        const gain = ctx.createGain();

        source.buffer = buffer;
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        source.connect(gain);
        gain.connect(ctx.destination);

        source.start(now);
        break;
      }

      case 'open': {
        // Modal open - deeper mechanical sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.2);
        break;
      }

      case 'close': {
        // Modal close - reverse of open
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }

      default:
        break;
    }
  }, [enabled]);

  return { playSound };
}
