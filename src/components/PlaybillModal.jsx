import { motion, AnimatePresence } from 'framer-motion';

export default function PlaybillModal({ isOpen, onClose, type, playSound }) {
  const content = {
    biography: {
      header: 'BIOGRAPHY',
      body: `A visual storyteller drawn to the spaces between light and shadow.

Working across narrative and experimental forms, exploring themes of memory, displacement, and the uncanny persistence of the past.

Based in the ruins of tomorrow.`,
      footer: 'EST. 2020',
    },
    posters: {
      header: 'POSTERS',
      body: `Film posters and promotional artwork.

Available for purchase as limited edition prints.

Contact for pricing and availability.`,
      footer: 'LIMITED EDITIONS',
    },
    misc: {
      header: 'MISCELLANEOUS',
      body: `Other works, experiments, and ephemera.

Behind the scenes, process documentation, and works in progress.`,
      footer: 'ETC.',
    },
  };

  const data = content[type] || content.biography;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              onClose();
              playSound?.('click');
            }}
          />

          {/* Modal Content - Playbill Style */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-md w-full pointer-events-auto"
              initial={{ y: 50, opacity: 0, rotateX: -10 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: 50, opacity: 0, rotateX: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Paper texture background */}
              <div
                className="absolute inset-0 rounded-sm"
                style={{
                  background: 'linear-gradient(135deg, #f5f0e6 0%, #e8e3d3 100%)',
                  boxShadow: `
                    0 25px 50px -12px rgba(0, 0, 0, 0.5),
                    0 0 0 1px rgba(0, 0, 0, 0.1)
                  `,
                }}
              />

              {/* Aged paper texture overlay */}
              <div
                className="absolute inset-0 opacity-20 rounded-sm"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Content */}
              <div className="relative p-8 md:p-10">
                {/* Close button */}
                <motion.button
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                             text-[var(--cinema-black)]/50 hover:text-[var(--cinema-black)]
                             transition-colors font-typewriter text-xl"
                  onClick={() => {
                    onClose();
                    playSound?.('click');
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>

                {/* Decorative border */}
                <div className="absolute inset-4 border border-[var(--cinema-black)]/20 rounded-sm pointer-events-none" />
                <div className="absolute inset-5 border border-[var(--cinema-black)]/10 rounded-sm pointer-events-none" />

                {/* Header */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-8 h-px bg-[var(--cinema-black)]/30" />
                    <div className="w-2 h-2 rotate-45 border border-[var(--cinema-black)]/30" />
                    <div className="w-8 h-px bg-[var(--cinema-black)]/30" />
                  </div>
                  <h2 className="font-typewriter text-xl md:text-2xl tracking-[0.2em] text-[var(--cinema-black)]">
                    {data.header}
                  </h2>
                  <div className="flex items-center justify-center gap-3 mt-3">
                    <div className="w-8 h-px bg-[var(--cinema-black)]/30" />
                    <div className="w-2 h-2 rotate-45 border border-[var(--cinema-black)]/30" />
                    <div className="w-8 h-px bg-[var(--cinema-black)]/30" />
                  </div>
                </div>

                {/* Body */}
                <div className="font-typewriter text-sm md:text-base leading-relaxed text-[var(--cinema-black)]/80 whitespace-pre-line">
                  {data.body}
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <div className="inline-block px-4 py-1 border-t border-b border-[var(--cinema-black)]/20">
                    <span className="font-typewriter text-xs tracking-[0.3em] text-[var(--cinema-black)]/50">
                      {data.footer}
                    </span>
                  </div>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[var(--cinema-black)]/20" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[var(--cinema-black)]/20" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[var(--cinema-black)]/20" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[var(--cinema-black)]/20" />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
