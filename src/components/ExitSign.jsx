import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ExitSign({
  label,
  position = 'left', // 'left' or 'right'
  onClick,
  playSound,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const positionClasses =
    position === 'left' ? 'left-6 md:left-10' :
    position === 'right' ? 'right-6 md:right-10' :
    'left-1/2 -translate-x-1/2';

  return (
    <motion.button
      className={`
        fixed bottom-6 md:bottom-10 ${positionClasses} z-40
        cursor-pointer select-none
      `}
      onMouseEnter={() => {
        setIsHovered(true);
        playSound?.('hover');
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        onClick?.();
        playSound?.('click');
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow backdrop */}
      <motion.div
        className="absolute inset-0 blur-xl rounded-lg"
        animate={{
          backgroundColor: isHovered
            ? 'rgba(255, 42, 42, 0.4)'
            : 'rgba(255, 42, 42, 0.1)',
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Sign container */}
      <motion.div
        className={`
          relative px-4 py-2 rounded-sm
          border border-[var(--exit-red)]
          font-typewriter text-sm md:text-base tracking-[0.2em]
          ${isHovered ? 'animate-neon-buzz' : ''}
        `}
        style={{
          color: isHovered ? 'var(--exit-red)' : 'var(--exit-red-dim)',
          textShadow: isHovered
            ? '0 0 10px var(--exit-red), 0 0 20px var(--exit-red)'
            : '0 0 5px var(--exit-red-dim)',
          borderColor: isHovered ? 'var(--exit-red)' : 'var(--exit-red-dim)',
          boxShadow: isHovered
            ? '0 0 15px var(--exit-red-dim), inset 0 0 10px rgba(255, 42, 42, 0.1)'
            : 'none',
        }}
        animate={{
          opacity: isHovered ? 1 : 0.4,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Bracket decoration */}
        <span className="opacity-60">[</span>
        <span className="mx-1">{label}</span>
        <span className="opacity-60">]</span>

        {/* Small indicator light */}
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
          style={{
            backgroundColor: isHovered ? 'var(--exit-red)' : 'var(--exit-red-dim)',
            boxShadow: isHovered
              ? '0 0 8px var(--exit-red)'
              : '0 0 3px var(--exit-red-dim)',
          }}
          animate={{
            opacity: isHovered ? [1, 0.6, 1] : 0.3,
          }}
          transition={{
            duration: 0.5,
            repeat: isHovered ? Infinity : 0,
          }}
        />
      </motion.div>
    </motion.button>
  );
}
