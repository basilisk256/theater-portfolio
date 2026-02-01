import { motion } from 'framer-motion';

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  // Handle youtu.be short links
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  // Handle youtube.com/watch links
  const longMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}`;
  return null;
}

export default function VideoPlayer({ film, onBack }) {
  const youtubeEmbedUrl = getYouTubeEmbedUrl(film.videoUrl);

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center w-full h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button - Top Left */}
      <motion.button
        onClick={onBack}
        className="absolute top-2 left-2 z-20
                   text-white/70 hover:text-white
                   font-typewriter text-xs tracking-wider
                   transition-colors duration-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ x: -2 }}
      >
        ← BACK
      </motion.button>

      {/* Video Container */}
      <div className="relative w-full max-w-[90%] aspect-video bg-black/90 rounded-sm overflow-hidden">
        {film.onFestivalCircuit ? (
          // Festival circuit message
          <div className="w-full h-full flex flex-col items-center justify-center text-white/70 px-8">
            <p className="font-typewriter text-sm tracking-wider text-center text-[#c4a882]">
              CURRENTLY ON THE FESTIVAL CIRCUIT
            </p>
            <p className="mt-4 text-xs text-center opacity-60 max-w-md leading-relaxed">
              This film is currently screening at film festivals and will be available to watch online once the festival run is complete.
            </p>
          </div>
        ) : youtubeEmbedUrl ? (
          <iframe
            src={`${youtubeEmbedUrl}?autoplay=1&rel=0&modestbranding=1&controls=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        ) : film.videoUrl ? (
          <video
            src={film.videoUrl}
            controls
            className="w-full h-full object-contain"
            autoPlay
          />
        ) : (
          // Placeholder when no video URL
          <div className="w-full h-full flex flex-col items-center justify-center text-white/50">
            <motion.div
              className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-3 h-3 bg-white/30 rounded-full" />
            </motion.div>
            <p className="mt-4 font-typewriter text-sm tracking-wider">
              FILM REEL LOADING...
            </p>
            <p className="mt-2 text-xs opacity-50">
              Add video URL to film data
            </p>
          </div>
        )}

      </div>

      {/* Film metadata */}
      <div className="text-center mt-2">
        <p className="text-xs text-[var(--cinema-black)]/50 font-typewriter tracking-widest">
          {film.year} • DIRECTOR'S CUT
        </p>
      </div>
    </motion.div>
  );
}
