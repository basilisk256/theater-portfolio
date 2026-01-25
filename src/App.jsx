import { useState } from 'react';
import CinemaEnvironment from './components/CinemaEnvironment';
import ProjectorScreen from './components/ProjectorScreen';
import FilmMenu from './components/FilmMenu';
import VideoPlayer from './components/VideoPlayer';
import PlaybillModal from './components/PlaybillModal';
import DebugPanel from './components/DebugPanel';
import { useAudio } from './hooks/useAudio';

function App() {
  // State
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, type: null });
  const [debugMode, setDebugMode] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Screen calibration config - matched to white screen area in theater photo
  const [screenConfig, setScreenConfig] = useState({
    top: 33,      // % from top
    left: 32,     // % from left
    width: 36,    // % width
    height: 45,   // % height
    skewX: 0,     // degrees
    skewY: 0,     // degrees
    rotateX: 0,   // degrees (for perspective)
    rotateY: 0,   // degrees (for perspective)
    perspective: 1000, // px
  });

  // Audio hook
  const { playSound } = useAudio(audioEnabled);

  // Handlers
  const handleSelectFilm = (film) => {
    playSound('click');
    setSelectedFilm(film);
  };

  const handleBackToMenu = () => {
    playSound('click');
    setSelectedFilm(null);
  };

  const handleOpenModal = (type) => {
    playSound('open');
    setModal({ isOpen: true, type });
  };

  const handleCloseModal = () => {
    playSound('close');
    setModal({ isOpen: false, type: null });
  };

  // Toggle debug mode with keyboard shortcut
  const handleKeyDown = (e) => {
    if (e.key === 'd' && e.ctrlKey) {
      e.preventDefault();
      setDebugMode(!debugMode);
    }
    if (e.key === 'm' && e.ctrlKey) {
      e.preventDefault();
      setAudioEnabled(!audioEnabled);
    }
  };

  return (
    <div
      className="w-screen h-screen"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <CinemaEnvironment>
        {/* Main Projector Screen */}
        <ProjectorScreen
          debugMode={debugMode}
          screenConfig={{
            top: `${screenConfig.top}%`,
            left: `${screenConfig.left}%`,
            width: `${screenConfig.width}%`,
            height: `${screenConfig.height}%`,
            skewX: screenConfig.skewX,
            skewY: screenConfig.skewY,
            rotateX: screenConfig.rotateX,
            rotateY: screenConfig.rotateY,
            perspective: screenConfig.perspective,
          }}
        >
          {selectedFilm ? (
            <VideoPlayer
              film={selectedFilm}
              onBack={handleBackToMenu}
            />
          ) : (
            <FilmMenu
              onSelectFilm={handleSelectFilm}
            />
          )}
        </ProjectorScreen>


        {/* Playbill Modal */}
        <PlaybillModal
          isOpen={modal.isOpen}
          onClose={handleCloseModal}
          type={modal.type}
          playSound={playSound}
        />

        {/* Debug Panel */}
        {debugMode && (
          <DebugPanel
            config={screenConfig}
            onConfigChange={setScreenConfig}
            onToggleDebug={() => setDebugMode(false)}
          />
        )}

        {/* Keyboard shortcuts hint */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-white/20 text-xs font-mono z-10">
          Ctrl+D: Debug | Ctrl+M: Audio
        </div>
      </CinemaEnvironment>
    </div>
  );
}

export default App;
