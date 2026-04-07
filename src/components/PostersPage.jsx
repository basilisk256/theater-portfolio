import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';

const posters = [
  {
    id: 1,
    title: 'Fish Delivery #95',
    year: '2024',
    image: '/assets/poster-fishdelivery.jpg',
    // Hotspot position (percentage based)
    top: '18%',
    left: '3%',
    width: '22%',
    height: '62%',
  },
  {
    id: 2,
    title: 'Frog and Toad Theme',
    year: '2024',
    image: '/assets/poster-frogandtoad.jpg',
    top: '18%',
    left: '27%',
    width: '22%',
    height: '62%',
  },
  {
    id: 3,
    title: 'Nocaretown',
    year: '2024',
    image: '/assets/poster-nocaretown.jpg',
    top: '18%',
    left: '51%',
    width: '22%',
    height: '62%',
  },
  {
    id: 4,
    title: 'The Jealous Boyfriend and a Man Under the Bed',
    year: '2025',
    image: '/assets/poster-jealousbf.jpg',
    top: '18%',
    left: '75%',
    width: '22%',
    height: '62%',
  },
];

function PosterHotspot({ poster, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute cursor-pointer z-20 transition-all duration-300"
      style={{
        top: poster.top,
        left: poster.left,
        width: poster.width,
        height: poster.height,
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
        boxShadow: isHovered ? '0 0 40px rgba(255, 237, 213, 0.3)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(poster)}
    />
  );
}

const postersPage2 = [
  {
    id: 5,
    title: 'Batch-9e',
    year: '2024',
    image: '/assets/poster-batch9e.jpg',
    top: '18%',
    left: '3%',
    width: '22%',
    height: '62%',
  },
  {
    id: 6,
    title: 'Peach Fuzz',
    year: '2024',
    image: '/assets/poster-peachfuzz.jpg',
    top: '18%',
    left: '27%',
    width: '22%',
    height: '62%',
  },
  {
    id: 7,
    title: '1,690 Photographs of 9/11 in Stop Motion',
    year: '2023',
    image: '/assets/poster-911.jpg',
    top: '18%',
    left: '51%',
    width: '22%',
    height: '62%',
  },
  {
    id: 8,
    title: 'Peach Fuzz (Alt)',
    year: '2024',
    image: '/assets/poster-peachfuzz-alt.jpg',
    top: '18%',
    left: '75%',
    width: '22%',
    height: '62%',
  },
];

const postersPage3 = [
  {
    id: 9,
    title: 'Peach Fuzz (Knives)',
    year: '2024',
    image: '/assets/poster-peachfuzz-knives.jpg',
    top: '18%',
    left: '3%',
    width: '22%',
    height: '62%',
  },
  {
    id: 10,
    title: 'The Jealous Boyfriend and a Man Under the Bed (Alt)',
    year: '2025',
    image: '/assets/poster-jealousbf-alt.jpg',
    top: '18%',
    left: '27%',
    width: '22%',
    height: '62%',
  },
];

// Page configurations - each page has its own background and posters
const pages = [
  {
    id: 1,
    background: '/assets/postersbackground.jpg',
    posters: posters,
  },
  {
    id: 2,
    background: '/assets/postersbackground2.jpg',
    posters: postersPage2,
  },
  {
    id: 3,
    background: '/assets/postersbackground3.jpg',
    posters: postersPage3,
  },
];

// All posters combined for mobile view
const allPosters = [...posters, ...postersPage2, ...postersPage3];

// Mobile poster images with high-res versions
const mobilePosters = [
  { mobile: '/assets/postermobile1.jpg', highRes: '/assets/poster-fishdelivery.jpg', title: 'Fish Delivery #95' },
  { mobile: '/assets/postermobile2.jpg', highRes: '/assets/poster-frogandtoad.jpg', title: 'Frog and Toad Theme' },
  { mobile: '/assets/postermobile3.jpg', highRes: '/assets/poster-nocaretown.jpg', title: 'Nocaretown' },
  { mobile: '/assets/postermobile4.jpg', highRes: '/assets/poster-jealousbf.jpg', title: 'The Jealous Boyfriend' },
  { mobile: '/assets/postermobile5.jpg', highRes: '/assets/poster-batch9e.jpg', title: 'Batch 9e' },
  { mobile: '/assets/postermobile6.jpg', highRes: '/assets/poster-peachfuzz.jpg', title: 'Peach Fuzz' },
  { mobile: '/assets/postermobile7.jpg', highRes: '/assets/poster-911.jpg', title: '1,690 Photographs of 9/11' },
  { mobile: '/assets/postermobile8.jpg', highRes: '/assets/poster-peachfuzz-alt.jpg', title: 'Peach Fuzz (Alt)' },
  { mobile: '/assets/postermobile9.jpg', highRes: '/assets/poster-peachfuzz-knives.jpg', title: 'Peach Fuzz (Knives)' },
  { mobile: '/assets/postermobile10.jpg', highRes: '/assets/poster-jealousbf-alt.jpg', title: 'The Jealous Boyfriend (Alt)' },
];

export default function PostersPage() {
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [mobilePosterIndex, setMobilePosterIndex] = useState(0);
  const isMobile = useIsMobile();

  // Image aspect ratio
  const aspectRatio = 16 / 9;

  const totalPages = pages.length;
  const page = pages[currentPage];

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const goToPrevMobilePoster = () => {
    setMobilePosterIndex((prev) => (prev > 0 ? prev - 1 : mobilePosters.length - 1));
  };

  const goToNextMobilePoster = () => {
    setMobilePosterIndex((prev) => (prev < mobilePosters.length - 1 ? prev + 1 : 0));
  };

  // Mobile layout - Full screen poster carousel
  if (isMobile) {
    const handleTouchStart = (e) => { window._swipeStartX = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
      const diff = window._swipeStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? goToNextMobilePoster() : goToPrevMobilePoster();
    };

    return (
      <div
        className="h-screen bg-[#0a0806] flex flex-col relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Full screen poster image - clickable */}
        <img
          src={mobilePosters[mobilePosterIndex].mobile}
          alt={mobilePosters[mobilePosterIndex].title}
          className="absolute inset-0 w-full h-full object-contain cursor-pointer"
          onClick={() => setSelectedPoster(mobilePosters[mobilePosterIndex])}
        />

        {/* Poster navigation - right under poster */}
        <div className="absolute bottom-[11%] left-0 right-0 flex justify-center">
          <div className="flex items-center gap-8">
            <button
              onClick={goToPrevMobilePoster}
              className="font-serif tracking-[0.15em] uppercase text-xl"
              style={{
                color: '#c4a882',
                textShadow: '0 0 15px rgba(196, 168, 130, 0.5), 0 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              ‹ Back
            </button>
            <span
              className="text-base"
              style={{ color: 'rgba(196, 168, 130, 0.5)' }}
            >
              {mobilePosterIndex + 1}/{mobilePosters.length}
            </span>
            <button
              onClick={goToNextMobilePoster}
              className="font-serif tracking-[0.15em] uppercase text-xl"
              style={{
                color: '#c4a882',
                textShadow: '0 0 15px rgba(196, 168, 130, 0.5), 0 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              Next ›
            </button>
          </div>
        </div>

        {/* Back to Site - at bottom */}
        <div className="absolute bottom-[4%] left-0 right-0 flex justify-center">
          <Link
            to="/"
            className="font-serif tracking-[0.15em] uppercase text-base"
            style={{
              color: '#c4a882',
              textShadow: '0 0 15px rgba(196, 168, 130, 0.5), 0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            Back to Site
          </Link>
        </div>

        {/* High-res poster modal */}
        <AnimatePresence>
          {selectedPoster && selectedPoster.highRes && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPoster(null)}
            >
              <motion.div
                className="relative max-h-[90vh] w-full flex flex-col items-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <img
                  src={selectedPoster.highRes}
                  alt={selectedPoster.title}
                  className="max-h-[80vh] w-auto object-contain"
                  style={{ boxShadow: '0 0 40px rgba(0,0,0,0.8)' }}
                />
                <p
                  className="mt-4 font-serif tracking-wide text-lg"
                  style={{ color: '#c4a882' }}
                >
                  {selectedPoster.title}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop layout (unchanged)
  return (
    <div className="relative w-screen h-screen overflow-auto bg-[#0a0908] flex items-center justify-center">
      {/* Aspect ratio container - scales to fill viewport */}
      <div
        className="relative"
        style={{
          width: '100%',
          height: '100%',
          minWidth: `calc(100vh * ${aspectRatio})`,
          minHeight: `calc(100vw / ${aspectRatio})`,
          aspectRatio: '16 / 9',
        }}
      >
        {/* Background Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={page.background}
            src={page.background}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Poster Hotspots */}
        {page.posters.map((poster) => (
          <PosterHotspot
            key={poster.id}
            poster={poster}
            onClick={setSelectedPoster}
          />
        ))}

      </div>

      {/* Left arrow - fixed to viewport */}
      {currentPage === 0 ? (
        <Link to="/">
          <motion.div
            className="fixed left-6 top-1/2 -translate-y-1/2 z-30 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1, x: -5 }}
          >
            <div
              className="text-8xl font-serif"
              style={{
                color: '#c4a882',
                textShadow: '0 0 20px rgba(196, 168, 130, 0.5), 0 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              ‹
            </div>
          </motion.div>
        </Link>
      ) : (
        <motion.div
          className="fixed left-6 top-1/2 -translate-y-1/2 z-30 cursor-pointer"
          onClick={goToPrevPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1, x: -5 }}
        >
          <div
            className="text-8xl font-serif"
            style={{
              color: '#c4a882',
              textShadow: '0 0 20px rgba(196, 168, 130, 0.5), 0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            ‹
          </div>
        </motion.div>
      )}

      {/* Right arrow - fixed to viewport */}
      {currentPage < totalPages - 1 && (
        <motion.div
          className="fixed right-6 top-1/2 -translate-y-1/2 z-30 cursor-pointer"
          onClick={goToNextPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1, x: 5 }}
        >
          <div
            className="text-8xl font-serif"
            style={{
              color: '#c4a882',
              textShadow: '0 0 20px rgba(196, 168, 130, 0.5), 0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            ›
          </div>
        </motion.div>
      )}

      {/* Back button - fixed to viewport bottom-right */}
      <Link to="/">
        <motion.div
          className="fixed z-30 cursor-pointer font-serif tracking-[0.2em] uppercase text-lg flex items-center gap-2"
          style={{
            bottom: '40px',
            right: '40px',
            color: '#c4a882',
            textShadow: '0 0 6px rgba(196, 168, 130, 0.4), 0 0 12px rgba(196, 168, 130, 0.2), 0 0 8px rgba(0,0,0,1), 0 0 16px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.9), 0 0 50px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,1)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{
            scale: 1.05,
            textShadow: '0 0 30px rgba(196, 168, 130, 0.8), 0 2px 4px rgba(0,0,0,0.8)',
          }}
        >
          Back to Theater →
        </motion.div>
      </Link>

      {/* Expanded poster modal */}
      <AnimatePresence>
        {selectedPoster && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPoster(null)}
          >
            <motion.div
              className="relative max-h-[90vh] mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute -top-10 right-0 text-white/70 hover:text-white text-lg font-serif tracking-wider"
                onClick={() => setSelectedPoster(null)}
              >
                CLOSE ×
              </button>

              {/* High-res poster image */}
              <img
                src={selectedPoster.image}
                alt={selectedPoster.title}
                className="max-h-[85vh] w-auto object-contain"
                style={{
                  boxShadow: '0 0 60px rgba(0,0,0,0.8)',
                }}
              />

              {/* Title below poster */}
              <div className="text-center mt-4">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
                  Poster Design
                </p>
                <h2
                  className="text-xl font-serif tracking-wide"
                  style={{ color: '#c4a882' }}
                >
                  {selectedPoster.title}
                </h2>
                <p className="text-white/40 text-sm">
                  {selectedPoster.year}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
