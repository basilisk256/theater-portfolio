import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const commercialWorks = [
  { id: 1, title: 'Brand Campaign', client: 'Client A', year: '2025' },
  { id: 2, title: 'Product Launch', client: 'Client B', year: '2025' },
  { id: 3, title: 'Documentary', client: 'Client C', year: '2024' },
  { id: 4, title: 'Music Video', client: 'Client D', year: '2024' },
  { id: 5, title: 'Commercial Spot', client: 'Client E', year: '2024' },
  { id: 6, title: 'Corporate Film', client: 'Client F', year: '2023' },
];

function WorkCard({ work, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '280px',
        height: '180px',
      }}
    >
      {/* Frame - like a display case in a lobby */}
      <div
        className="absolute inset-0 rounded"
        style={{
          background: 'linear-gradient(145deg, #2a2420 0%, #1a1614 50%, #0f0d0c 100%)',
          border: '3px solid #3d3530',
          boxShadow: isHovered
            ? '0 0 30px rgba(196, 168, 130, 0.3), inset 0 0 20px rgba(0,0,0,0.5)'
            : 'inset 0 0 20px rgba(0,0,0,0.5)',
        }}
      />

      {/* Content placeholder */}
      <div className="absolute inset-3 bg-black/60 rounded flex items-center justify-center">
        <div className="text-center">
          <h3
            className="text-lg font-serif tracking-wide"
            style={{ color: '#c4a882' }}
          >
            {work.title}
          </h3>
          <p className="text-sm text-white/50 mt-1">{work.client}</p>
          <p className="text-xs text-white/30 mt-1">{work.year}</p>
        </div>
      </div>

      {/* Hover glow */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(196, 168, 130, 0.1) 0%, transparent 70%)',
          }}
        />
      )}
    </motion.div>
  );
}

export default function CommercialPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Theater lobby background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 100%, #2a1f18 0%, #0f0a08 60%),
            linear-gradient(to bottom, #1a1410 0%, #0a0806 100%)
          `,
        }}
      />

      {/* Floor reflection */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{
          background: 'linear-gradient(to top, rgba(196, 168, 130, 0.05) 0%, transparent 100%)',
        }}
      />

      {/* Ornate ceiling detail */}
      <div
        className="absolute top-0 left-0 right-0 h-24"
        style={{
          background: 'linear-gradient(to bottom, #1a1510 0%, transparent 100%)',
          borderBottom: '2px solid #2a2420',
        }}
      />

      {/* Wall sconces - decorative lights */}
      {[20, 80].map((left) => (
        <div
          key={left}
          className="absolute top-32"
          style={{ left: `${left}%` }}
        >
          <div
            className="w-4 h-8 rounded-full"
            style={{
              background: 'radial-gradient(ellipse at center, #ffedd5 0%, #c4a882 50%, transparent 100%)',
              boxShadow: '0 0 30px 10px rgba(255, 237, 213, 0.2)',
            }}
          />
        </div>
      ))}

      {/* Title */}
      <motion.h1
        className="absolute top-12 left-1/2 -translate-x-1/2 z-20 text-3xl md:text-5xl font-serif tracking-[0.3em] uppercase"
        style={{
          color: '#c4a882',
          textShadow: '0 0 30px rgba(196, 168, 130, 0.5), 0 2px 4px rgba(0,0,0,0.8)',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Commercial
      </motion.h1>

      {/* Works grid */}
      <div className="absolute inset-0 flex items-center justify-center pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {commercialWorks.map((work, index) => (
            <WorkCard key={work.id} work={work} index={index} />
          ))}
        </div>
      </div>

      {/* Back button */}
      <Link to="/">
        <motion.button
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 cursor-pointer font-serif tracking-wider"
          style={{
            background: 'linear-gradient(180deg, #2a2420 0%, #1a1614 100%)',
            border: '2px solid #3d3530',
            borderRadius: '4px',
            color: '#c4a882',
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 20px rgba(196, 168, 130, 0.3)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          BACK TO THEATER
        </motion.button>
      </Link>
    </div>
  );
}
