import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function BiographyPage() {
  const [showPanel, setShowPanel] = useState(false);
  const [activeTab, setActiveTab] = useState('bio');

  // Image aspect ratio
  const aspectRatio = 16 / 9;

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
        <img
          src="/assets/biographybackground.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Clickable desk area */}
        <div
          className="absolute cursor-pointer z-20"
          style={{
            top: '55%',
            left: '30%',
            width: '40%',
            height: '35%',
          }}
          onClick={() => setShowPanel(true)}
        />

        {/* Gold sign on desk */}
        <motion.div
          className="absolute z-20 pointer-events-none text-2xl md:text-3xl tracking-[0.3em] uppercase font-serif"
          style={{
            top: '82%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#c4a882',
            textShadow: '0 0 20px rgba(196, 168, 130, 0.5), 0 2px 4px rgba(0,0,0,0.8)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showPanel ? 0 : 1 }}
          transition={{ delay: 0.5 }}
        >
          Click Desk to View
        </motion.div>

        {/* Back button - bottom right, in line with Click Desk to View */}
        <Link to="/">
          <motion.div
            className="absolute z-30 cursor-pointer font-serif tracking-[0.3em] uppercase text-2xl md:text-3xl"
            style={{
              top: '82%',
              right: '2%',
              color: '#c4a882',
              textShadow: '0 0 20px rgba(196, 168, 130, 0.5), 0 2px 4px rgba(0,0,0,0.8)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: showPanel ? 0 : 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{
              scale: 1.05,
              textShadow: '0 0 30px rgba(196, 168, 130, 0.8), 0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            Back to Theater
          </motion.div>
        </Link>
      </div>

      {/* Bio Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPanel(false)}
          >
            <motion.div
              className="relative max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(145deg, rgba(42, 36, 32, 0.98) 0%, rgba(26, 22, 20, 0.98) 100%)',
                border: '2px solid #3d3530',
                borderRadius: '8px',
                padding: '32px',
                boxShadow: '0 0 60px rgba(0,0,0,0.8)',
              }}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl"
                onClick={() => setShowPanel(false)}
              >
                ×
              </button>

              {/* Tabs */}
              <div className="flex gap-6 mb-6 border-b border-white/10 pb-4">
                {['bio', 'resume'].map((tab) => (
                  <button
                    key={tab}
                    className={`font-serif tracking-wider text-sm uppercase transition-colors ${
                      activeTab === tab ? 'text-[#c4a882]' : 'text-white/40 hover:text-white/60'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              {activeTab === 'bio' && (
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Photo */}
                  <div className="flex-shrink-0">
                    <img
                      src="/assets/headshot.jpg"
                      alt="Luke Wolsko"
                      className="w-80 h-auto rounded"
                      style={{
                        boxShadow: '0 0 30px rgba(0,0,0,0.5)',
                      }}
                    />
                  </div>
                  {/* Bio text */}
                  <div>
                    <h2
                      className="text-2xl font-serif tracking-wide mb-4"
                      style={{ color: '#c4a882' }}
                    >
                      Luke Wolsko
                    </h2>
                    <div
                      className="text-sm leading-relaxed space-y-4"
                      style={{ color: '#a0a0a0' }}
                    >
                      <p>
                        Luke Wolsko is a filmmaker from Boulder, Colorado, recently graduated from NYU's Film & Television program, where he also studied the business of entertainment, media, and technology.
                      </p>
                      <p>
                        He works across stop motion animation, live-action narrative, and experimental video, always with the aim of telling the truth, regardless of form. His projects often explore myth and memory through a highly visual, hands-on process.
                      </p>
                      <p>
                        He has previously worked at Factory 25, Metalwork Pictures, Cygnet Gin, and JV8 Casting, and contributed animation to an upcoming documentary by Caveh Zahedi. He is currently training under director Andrew Levitas.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'resume' && (
                <div
                  className="text-sm leading-relaxed space-y-6"
                  style={{ color: '#a0a0a0' }}
                >
                  <div>
                    <h3 className="text-white/80 font-medium mb-2">Experience</h3>
                    <ul className="space-y-1">
                      <li>Cygnet Gin — Creative Producer (Current)</li>
                      <li>Metalwork Pictures — Development Executive (Current)</li>
                      <li>JV8 Casting — Intern</li>
                      <li>Factory 25 — Intern</li>
                      <li>Caveh Zahedi — Animator</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-white/80 font-medium mb-2">Selected Films</h3>
                    <ul className="space-y-1">
                      <li><em>Listen</em> — Producer</li>
                      <li><em>Nocaretown</em> — Producer</li>
                      <li><em>The Jealous Boyfriend and a Man Under the Bed</em> — Director</li>
                      <li><em>Fish Delivery #95</em> — Director</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-white/80 font-medium mb-2">Education</h3>
                    <p>NYU Film & Television, Minor in Business of Entertainment</p>
                    <p className="text-xs mt-1">GPA: 3.95</p>
                  </div>

                  <div>
                    <h3 className="text-white/80 font-medium mb-2">Skills</h3>
                    <div className="space-y-2">
                      <p><span className="text-white/60">Editing + Post Production:</span> Premiere Pro, DaVinci Resolve, After Effects, Adobe Suite, Metadata</p>
                      <p><span className="text-white/60">AI + Generative Tools:</span> Runway, Kling, Stable Diffusion, Midjourney, Elevenlabs, Veo3, Prompt writing and iteration, Scene generation</p>
                      <p><span className="text-white/60">Creative & Production:</span> Storyboarding, Post supervision, Branded content editing, Directing, Animation, Script breakdown, Casting workflows</p>
                      <p><span className="text-white/60">Coding:</span> CSS, HTML, JavaScript, Python</p>
                      <p><span className="text-white/60">Other:</span> Google Suite, Photoshop, Canva, Backstage, Breakdown Express, Web & Deck Design</p>
                    </div>
                  </div>

                  <div className="flex gap-6 pt-4 border-t border-white/10">
                    <a
                      href="https://www.imdb.com/name/nm15865993/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c4a882] hover:text-white transition-colors tracking-wider"
                    >
                      IMDB
                    </a>
                    <a
                      href="https://www.linkedin.com/in/luke-wolsko/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c4a882] hover:text-white transition-colors tracking-wider"
                    >
                      LINKEDIN
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
