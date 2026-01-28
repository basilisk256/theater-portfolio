import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

const films = [
  {
    id: 1,
    title: 'THE JEALOUS BOYFRIEND AND A MAN UNDER THE BED',
    year: '2025',
    role: 'Director',
    thumbnail: '/assets/thumbnails/jealousbf.png',
    videoUrl: 'https://youtu.be/aKyOTh-tpYk',
  },
  {
    id: 2,
    title: 'FISH DELIVERY #95',
    year: '2024',
    role: 'Director',
    thumbnail: '/assets/thumbnails/fishdelivery.jpg',
    videoUrl: 'https://youtu.be/1ASspcJOmys',
  },
  {
    id: 3,
    title: 'FROG AND TOAD THEME',
    year: '2024',
    role: 'Director',
    thumbnail: '/assets/thumbnails/frogandtoad.png',
    videoUrl: 'https://youtu.be/3tG_8cL3CkM',
  },
  {
    id: 4,
    title: 'BATCH 9e',
    year: '2024',
    role: 'Director',
    thumbnail: '/assets/thumbnails/batch9e.jpg',
    videoUrl: 'https://youtu.be/H3ljzv12g5E',
  },
  {
    id: 5,
    title: '1690 PHOTOGRAPHS OF 9/11 IN STOP MOTION',
    year: '2023',
    role: 'Director',
    thumbnail: '/assets/thumbnails/911thumbnail.png',
    videoUrl: 'https://youtu.be/8IJGYRLbktw',
  },
];

// Playbill style - thumbnail left, title right
function FilmCard({ film, index }) {
  return (
    <a
      href={film.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <motion.div
        className="mx-4 mb-3 flex gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.08 }}
      >
        {/* Thumbnail */}
        <div
          className="w-24 h-16 flex-shrink-0 overflow-hidden rounded"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          }}
        >
          <img
            src={film.thumbnail}
            alt={film.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title and details */}
        <div className="flex-1 flex flex-col justify-center">
          <h3
            className="text-lg leading-tight"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: '#c4a882',
              letterSpacing: '0.03em',
            }}
          >
            {film.title}
          </h3>
          <p
            className="text-[10px] tracking-wider uppercase mt-0.5"
            style={{ color: 'rgba(196, 168, 130, 0.5)' }}
          >
            {film.year} • {film.role}
          </p>
        </div>
      </motion.div>
    </a>
  );
}

export default function NowShowingPage() {
  const isMobile = useIsMobile();

  // Click regions for each film (percentages of image dimensions)
  const clickRegions = [
    { film: films[0], top: 14, height: 17 },  // The Jealous Boyfriend
    { film: films[1], top: 30.5, height: 16 },  // Fish Delivery #95
    { film: films[2], top: 45.5, height: 16 },  // Frog and Toad Theme
    { film: films[3], top: 61, height: 15 },    // Batch 9e
    { film: films[4], top: 76, height: 15 },    // 1690 Photographs
  ];

  // Mobile layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#0a0806] flex flex-col">
        {/* Full-screen image with click regions */}
        <div className="relative w-full h-screen">
          <img
            src="/assets/mobilemovies.jpg"
            alt="Movies"
            className="w-full h-full object-contain"
          />

          {/* Clickable film regions */}
          {clickRegions.map(({ film, top, height }) => (
            <a
              key={film.id}
              href={film.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-0 right-0 cursor-pointer hover:bg-white/10 transition-colors"
              style={{
                top: `${top}%`,
                height: `${height}%`,
              }}
              aria-label={film.title}
            />
          ))}

          {/* Back to Site button */}
          <Link
            to="/"
            className="absolute left-0 right-0 bottom-0 h-[9%] cursor-pointer hover:bg-white/10 transition-colors"
            aria-label="Back to site"
          />
        </div>
      </div>
    );
  }

  // Desktop - redirect to home (films are on the main projector screen)
  return (
    <div className="min-h-screen bg-[#0a0806] flex items-center justify-center">
      <div className="text-center">
        <p className="text-white/50 mb-4">Films are displayed on the projector screen</p>
        <Link
          to="/"
          className="font-serif tracking-wider text-[#c4a882] hover:text-white transition-colors"
        >
          Go to Theater →
        </Link>
      </div>
    </div>
  );
}
