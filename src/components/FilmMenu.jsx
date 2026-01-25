import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const films = [
  {
    id: 1,
    title: 'THE JEALOUS BOYFRIEND AND A MAN UNDER THE BED',
    color: '#1a1a2e',
    textColor: '#ffffff',
    thumbnail: '/assets/thumbnails/jealousbf.png',
    titleImage: '/assets/titles/jealousbf.png',
    titleScale: 1.2,
    videoUrl: 'https://youtu.be/aKyOTh-tpYk'
  },
  {
    id: 2,
    title: 'BATCH 9e',
    color: '#0f3460',
    textColor: '#e94560',
    thumbnail: '/assets/thumbnails/batch9e.jpg',
    titleImage: '/assets/titles/batch9e.png',
    videoUrl: 'https://youtu.be/H3ljzv12g5E'
  },
  {
    id: 3,
    title: 'FISH DELIVERY #95',
    color: '#16213e',
    textColor: '#f1f1f1',
    thumbnail: '/assets/thumbnails/fishdelivery.jpg',
    titleImage: '/assets/titles/fishdelivery.png',
    videoUrl: 'https://youtu.be/1ASspcJOmys'
  },
  {
    id: 4,
    title: '1690 PHOTOGRAPHS OF 9/11 IN STOP MOTION',
    color: '#1a1a1a',
    textColor: '#c4a35a',
    thumbnail: '/assets/thumbnails/911thumbnail.png',
    titleImage: '/assets/titles/1690.png',
    titleScale: 1.2,
    videoUrl: 'https://youtu.be/8IJGYRLbktw'
  },
  {
    id: 5,
    title: 'FROG AND TOAD THEME',
    color: '#1e5128',
    textColor: '#d8e9a8',
    thumbnail: '/assets/thumbnails/frogandtoad.png',
    titleImage: '/assets/titles/frogandtoad.png',
    titleScale: 1.2,
    videoUrl: 'https://youtu.be/3tG_8cL3CkM'
  },
  {
    id: 6,
    title: '',
    color: '#0a0a0a',
    textColor: '#333',
    empty: true
  },
];

// Dust particle component
function DustParticles({ active }) {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/60"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={active ? {
            y: [0, -20, 0],
            x: [0, 5, -5, 0],
            opacity: [0, 0.8, 0],
          } : { opacity: 0 }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function FilmMenu({ onSelectFilm }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Calculate projector beam position based on hovered tile
  const getBeamTarget = (index) => {
    if (index === null) return { x: 50, y: 50 }; // Center when nothing hovered
    const row = Math.floor(index / 2);
    const col = index % 2;
    return {
      x: col === 0 ? 25 : 75,
      y: row === 0 ? 16.6 : row === 1 ? 50 : 83.3,
    };
  };

  const beamTarget = getBeamTarget(hoveredIndex);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main projector beam from the side - always visible */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-40"
        animate={{
          background: hoveredIndex !== null
            ? `radial-gradient(ellipse 60% 80% at ${beamTarget.x}% ${beamTarget.y}%, rgba(255,248,220,0.25) 0%, rgba(255,248,220,0.1) 30%, transparent 60%)`
            : `radial-gradient(ellipse 120% 120% at 50% 50%, rgba(255,248,220,0.12) 0%, rgba(255,248,220,0.05) 40%, transparent 70%)`,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Projector light cone from bottom-left corner */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          background: `conic-gradient(from 45deg at -20% 120%, transparent 0deg, rgba(255,245,200,0.08) 20deg, rgba(255,245,200,0.15) 35deg, rgba(255,245,200,0.08) 50deg, transparent 70deg)`,
        }}
        animate={{
          opacity: hoveredIndex !== null ? 0.3 : 1,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Secondary light wash from right */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          background: `linear-gradient(105deg, transparent 30%, rgba(255,250,240,0.06) 50%, rgba(255,250,240,0.1) 70%, rgba(255,250,240,0.04) 85%, transparent 100%)`,
        }}
        animate={{
          opacity: hoveredIndex !== null ? 0.2 : 0.7,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Animated dust particles in the projector beam */}
      <DustParticles active={true} />

      {/* Film flicker effect overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay"
        animate={{
          opacity: [0.02, 0.05, 0.02, 0.04, 0.02],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          ease: "steps(5)",
        }}
        style={{ backgroundColor: 'white' }}
      />

      {/* Grid of films */}
      <div className="absolute inset-0 w-full h-full grid grid-cols-2 grid-rows-3">
        {films.map((film, index) => {
          const isHovered = hoveredIndex === index;
          const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

          return (
            <motion.button
              key={film.id}
              disabled={film.empty}
              className={`
                relative overflow-hidden
                flex items-center justify-center
                font-typewriter text-[10px] sm:text-xs md:text-sm lg:text-base
                leading-tight text-center
                ${film.empty ? 'cursor-default' : 'cursor-pointer'}
              `}
              style={{
                backgroundColor: film.color,
                color: film.textColor,
                backgroundImage: film.thumbnail ? `url(${film.thumbnail})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onClick={() => !film.empty && onSelectFilm(film)}
              onMouseEnter={() => !film.empty && setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                zIndex: isHovered ? 20 : 1,
              }}
              whileTap={!film.empty ? { scale: 0.98 } : {}}
              transition={{ duration: 0.3 }}
            >
              {/* Base dark overlay */}
              {!film.empty && film.thumbnail && (
                <motion.div
                  className="absolute inset-0 bg-black z-0"
                  animate={{
                    opacity: isHovered ? 0.2 : isOtherHovered ? 0.7 : 0.4,
                  }}
                  transition={{ duration: 0.4 }}
                />
              )}

              {/* Focused projector spotlight on hovered tile */}
              <AnimatePresence>
                {isHovered && !film.empty && (
                  <>
                    {/* Main spotlight */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: `
                          radial-gradient(ellipse 80% 100% at 50% 50%,
                            rgba(255,250,230,0.3) 0%,
                            rgba(255,250,230,0.15) 40%,
                            transparent 70%
                          )
                        `,
                      }}
                    />

                    {/* Projector beam cone effect */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        background: `
                          conic-gradient(
                            from 200deg at 50% 130%,
                            transparent 30deg,
                            rgba(255,248,220,0.15) 60deg,
                            rgba(255,248,220,0.25) 90deg,
                            rgba(255,248,220,0.15) 120deg,
                            transparent 150deg
                          )
                        `,
                      }}
                    />

                    {/* Hot center glow */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      exit={{ opacity: 0 }}
                      style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 50%)`,
                      }}
                    />

                    {/* Light rays */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      style={{
                        background: `
                          repeating-linear-gradient(
                            95deg,
                            transparent 0px,
                            transparent 15px,
                            rgba(255,255,255,0.03) 15px,
                            rgba(255,255,255,0.03) 17px
                          )
                        `,
                      }}
                    />

                    {/* Vignette focus effect */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        boxShadow: 'inset 0 0 30px rgba(255,250,230,0.3)',
                      }}
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Darkening overlay for non-hovered tiles */}
              <AnimatePresence>
                {isOtherHovered && !film.empty && (
                  <motion.div
                    className="absolute inset-0 bg-black pointer-events-none z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              {/* Film title overlay */}
              {!film.empty && (
                <motion.div
                  className="absolute inset-0 z-20 flex items-center justify-center"
                  animate={{
                    opacity: isOtherHovered ? 0.5 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {film.titleImage ? (
                    <img
                      src={film.titleImage}
                      alt={film.title}
                      className="absolute inset-0 w-full h-full object-contain p-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                      style={{ transform: film.titleScale ? `scale(${film.titleScale})` : 'none' }}
                    />
                  ) : (
                    <span className="relative px-2 py-1 max-w-[90%] text-shadow-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {film.title}
                    </span>
                  )}
                </motion.div>
              )}

              {/* Film grain texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay z-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
