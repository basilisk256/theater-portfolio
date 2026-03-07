import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function VideoCard({ video, index, onOpen }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isLocal = video.localSrc;
  const thumbnailUrl = video.customThumb
    ? video.customThumb
    : isLocal
      ? null
      : `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
  const embedUrl = isLocal ? null : `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`;

  const handleClick = () => {
    if (video.about) {
      onOpen(video);
    } else {
      setIsPlaying(true);
    }
  };

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
        {isLocal ? (
          <video
            src={video.localSrc}
            className="w-full h-full object-cover"
            controls
            playsInline
          />
        ) : isPlaying ? (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={handleClick}
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

function VideoModal({ video, onClose }) {
  const [modalTab, setModalTab] = useState('WATCH');
  const isLocal = video.localSrc;
  const embedUrl = isLocal ? null : `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`;
  const tabs = ['WATCH', 'ABOUT'];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{ background: 'rgba(0, 0, 0, 0.85)' }}
    >
      <motion.div
        className="relative w-[92%] max-w-4xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, rgba(42, 36, 32, 0.98) 0%, rgba(26, 22, 20, 0.98) 100%)',
          border: '2px solid #3d3530',
          borderRadius: '8px',
          boxShadow: '0 0 60px rgba(0, 0, 0, 0.8)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-white/50 hover:text-white text-2xl z-10 cursor-pointer"
        >
          ×
        </button>

        {/* Title */}
        <h2
          className="text-center pt-6 pb-1 text-2xl md:text-3xl tracking-[0.15em]"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: '#c4a882',
          }}
        >
          {video.title}
        </h2>

        {/* Modal tabs */}
        <div className="flex justify-center gap-8 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setModalTab(tab)}
              className="relative px-4 py-2 tracking-[0.25em] transition-all cursor-pointer"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '0.95rem',
                color: modalTab === tab ? '#c4a882' : 'rgba(196, 168, 130, 0.35)',
                background: 'none',
                border: 'none',
              }}
            >
              {tab}
              {modalTab === tab && (
                <motion.div
                  layoutId="modal-tab-underline"
                  className="absolute bottom-0 left-[15%] right-[15%] h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, #c4a882, transparent)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="px-6 pb-8 md:px-10">
          {modalTab === 'WATCH' ? (
            <div
              className="aspect-video rounded overflow-hidden bg-black"
              style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              {isLocal ? (
                <video
                  src={video.localSrc}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          ) : (
            <div
              className="leading-relaxed text-sm md:text-base"
              style={{ color: 'rgba(196, 168, 130, 0.85)' }}
            >
              {video.about}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

const commercialVideos = [
  { youtubeId: 'SBTTkawe4ho', title: 'OCTRA 2', about: '' },
  { youtubeId: '7q08EuFDdwE', title: 'GROK ANNIE', customThumb: '/grok-annie-thumb.png', about: '' },
  { youtubeId: 'RCbfqQNils8', title: 'LIQUID DEATH', about: '' },
  { youtubeId: '59cpVc6vhtQ', title: 'CYGNET GIN', about: '' },
  { youtubeId: '8pSX52Irk1U', title: 'NEURO', about: '' },
  { youtubeId: 'BKw0ox-HpP0', title: 'NOVA VODKA', about: '' },
  { youtubeId: 'TouTcXdS_5g', title: 'MIDJOURNEY', about: '' },
  { youtubeId: '7mlFitv-n9w', title: 'HEARO (IN PROGRESS)', about: '' },
  { youtubeId: 'adOs2-quMUc', title: 'FACT MACHINE - CONFESSIONS', about: '' },
  { youtubeId: 'mRIGg3EKw2c', title: 'FACT MACHINE - ALIENS', about: '' },
  { youtubeId: 'u_OmktU01lI', title: 'FACT MACHINE - ROBBERS', about: '' },
  { youtubeId: 'i_c8JtvB85o', title: 'VOSS', about: '' },
  { youtubeId: 'SOvNKNnSmXg', title: 'ONYX COFFEE', about: '' },
  { youtubeId: 'JSLVwRgoNSY', title: 'PHOTOSHOP', about: '' },
  { youtubeId: 'Gs05J424Hck', title: 'OCTRA', about: '' },
];

const experimentalVideos = [
  { youtubeId: '8iyfNhPHdvg', title: 'SHAPE STORE', about: '' },
];

function TabBar({ activeTab, setActiveTab, isMobile }) {
  const tabs = ['COMMERCIAL', 'EXPERIMENTAL'];
  return (
    <div className="flex justify-center gap-8" style={{ marginTop: isMobile ? '16px' : '24px' }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className="relative px-6 py-2 tracking-[0.25em] transition-all cursor-pointer"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isMobile ? '0.85rem' : '1.05rem',
            color: activeTab === tab ? '#c4a882' : 'rgba(196, 168, 130, 0.35)',
            background: 'none',
            border: 'none',
          }}
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              layoutId="tab-underline"
              className="absolute bottom-0 left-[15%] right-[15%] h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #c4a882, transparent)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

export default function AIVideoPage() {
  const [activeTab, setActiveTab] = useState('COMMERCIAL');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const currentVideos = activeTab === 'COMMERCIAL' ? commercialVideos : experimentalVideos;

  return (
    <div className="min-h-screen bg-[#0a0806] md:fixed md:inset-0 md:overflow-y-auto">
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
          <p
            className="text-xs mt-3 tracking-[0.3em] uppercase"
            style={{ color: 'rgba(196, 168, 130, 0.5)' }}
          >
            AI Video
          </p>
          <TabBar activeTab={activeTab} setActiveTab={setActiveTab} isMobile={true} />
        </motion.div>

        <motion.div
          key={activeTab}
          className="w-full grid grid-cols-1 gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {currentVideos.map((video, index) => (
            <VideoCard key={video.youtubeId || video.localSrc} video={video} index={index} onOpen={setSelectedVideo} />
          ))}
        </motion.div>

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
          <p
            className="text-base mt-4 tracking-[0.3em] uppercase"
            style={{ color: 'rgba(196, 168, 130, 0.5)' }}
          >
            AI Video
          </p>
          <TabBar activeTab={activeTab} setActiveTab={setActiveTab} isMobile={false} />
        </motion.div>

        <motion.div
          key={activeTab}
          className={`w-full max-w-7xl mb-16 px-2 grid gap-10 ${
            currentVideos.length === 1 ? 'grid-cols-1 max-w-3xl' : 'grid-cols-2'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {currentVideos.map((video, index) => (
            <VideoCard key={video.youtubeId || video.localSrc} video={video} index={index} onOpen={setSelectedVideo} />
          ))}
        </motion.div>

      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
        )}
      </AnimatePresence>

      {/* Fixed "Back to Site" button */}
      <Link
        to="/"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 tracking-[0.2em] text-sm px-8 py-3 border border-[#c4a882]/40 text-[#c4a882] hover:bg-[#c4a882]/10 hover:border-[#c4a882]/60 transition-all rounded"
        style={{ backgroundColor: 'rgba(10, 8, 6, 0.8)', backdropFilter: 'blur(8px)' }}
      >
        BACK TO SITE
      </Link>
    </div>
  );
}
