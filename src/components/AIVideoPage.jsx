import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function VideoCard({ video, index }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`;

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div
        className="aspect-video rounded overflow-hidden bg-black relative"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        {isPlaying ? (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setIsPlaying(true)}
            className="w-full h-full relative cursor-pointer"
          >
            <img
              src={thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-colors">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(4px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <svg
                  className="w-8 h-8 ml-1"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>
      {video.title && (
        <h3
          className="mt-5 text-center text-base md:text-lg tracking-[0.2em]"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: '#c4a882',
          }}
        >
          {video.title}
        </h3>
      )}
    </motion.div>
  );
}

const videos = [
  { youtubeId: '8pSX52Irk1U', title: 'NEURO' },
  { youtubeId: 'BKw0ox-HpP0', title: 'NOVA VODKA' },
  { youtubeId: '59cpVc6vhtQ', title: 'CYGNET GIN' },
  { youtubeId: 'TouTcXdS_5g', title: 'MIDJOURNEY' },
  { youtubeId: 'adOs2-quMUc', title: 'FACT MACHINE - CONFESSIONS' },
  { youtubeId: 'mRIGg3EKw2c', title: 'FACT MACHINE - ALIENS' },
  { youtubeId: 'u_OmktU01lI', title: 'FACT MACHINE - ROBBERS' },
  { youtubeId: 'JSLVwRgoNSY', title: 'PHOTOSHOP' },
  { youtubeId: 'Gs05J424Hck', title: 'OCTRA' },
  { youtubeId: 'i_c8JtvB85o', title: 'VOSS' },
];

export default function AIVideoPage() {
  return (
    <div className="fixed inset-0 bg-[#0a0806] overflow-y-auto">
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center pb-16 px-4" style={{ paddingTop: '60px' }}>
        <motion.div
          className="text-center"
          style={{ marginBottom: '50px' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="text-4xl font-bold"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: '#c4a882',
              letterSpacing: '0.08em',
              textShadow: '0 0 40px rgba(196, 168, 130, 0.3)',
            }}
          >
            LUKE WOLSKO
          </h1>
          <div
            className="mt-3 mx-auto"
            style={{
              width: '40px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #c4a882, transparent)',
            }}
          />
          <p
            className="text-xs mt-3 tracking-[0.3em] uppercase"
            style={{ color: 'rgba(196, 168, 130, 0.5)' }}
          >
            Spec AI Ads
          </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 gap-8 mb-12">
          {videos.map((video, index) => (
            <VideoCard key={video.youtubeId} video={video} index={index} />
          ))}
        </div>

        <Link
          to="/"
          className="tracking-[0.2em] text-sm px-8 py-3 border border-[#c4a882]/40 text-[#c4a882] hover:bg-[#c4a882]/10 transition-all rounded"
        >
          BACK TO THEATER
        </Link>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col items-center pb-16 px-12" style={{ paddingTop: '100px' }}>
        <motion.div
          className="text-center"
          style={{ marginBottom: '80px' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="text-7xl font-bold"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: '#c4a882',
              letterSpacing: '0.08em',
              textShadow: '0 0 40px rgba(196, 168, 130, 0.3)',
            }}
          >
            LUKE WOLSKO
          </h1>
          <div
            className="mt-4 mx-auto"
            style={{
              width: '60px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #c4a882, transparent)',
            }}
          />
          <p
            className="text-base mt-4 tracking-[0.3em] uppercase"
            style={{ color: 'rgba(196, 168, 130, 0.5)' }}
          >
            Spec AI Ads
          </p>
        </motion.div>

        <div className="w-full max-w-7xl grid grid-cols-2 gap-10 mb-16 px-2">
          {videos.map((video, index) => (
            <VideoCard key={video.youtubeId} video={video} index={index} />
          ))}
        </div>

        <motion.div
          className="pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            to="/"
            className="tracking-[0.2em] text-sm px-8 py-3 border border-[#c4a882]/40 text-[#c4a882] hover:bg-[#c4a882]/10 hover:border-[#c4a882]/60 transition-all rounded"
          >
            BACK TO THEATER
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
