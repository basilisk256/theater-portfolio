import { AnimatePresence } from 'framer-motion';

export default function ProjectorScreen({
  children,
  debugMode = false,
  screenConfig = {},
}) {
  const config = {
    top: screenConfig.top ?? 'var(--screen-top)',
    left: screenConfig.left ?? 'var(--screen-left)',
    width: screenConfig.width ?? 'var(--screen-width)',
    height: screenConfig.height ?? 'var(--screen-height)',
    skewX: screenConfig.skewX ?? 0,
    skewY: screenConfig.skewY ?? 0,
    rotateX: screenConfig.rotateX ?? 0,
    rotateY: screenConfig.rotateY ?? 0,
    perspective: screenConfig.perspective ?? 1000,
  };

  return (
    <div
      className="absolute"
      style={{
        top: config.top,
        left: config.left,
        width: config.width,
        height: config.height,
        perspective: `${config.perspective}px`,
        zIndex: 10,
      }}
    >
      {/* Clean black frame bezel */}
      <div
        className="absolute inset-0"
        style={{
          background: '#0a0a0a',
          padding: '8px',
          boxShadow: `
            0 2px 8px rgba(0, 0, 0, 0.8),
            0 4px 20px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
        }}
      >
        {/* Screen content area */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)',
            transform: `
              rotateX(${config.rotateX}deg)
              rotateY(${config.rotateY}deg)
              skewX(${config.skewX}deg)
              skewY(${config.skewY}deg)
            `,
            transformStyle: 'preserve-3d',
          }}
        >
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </div>
      </div>

      {/* Debug handles */}
      {debugMode && (
        <>
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full z-50" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full z-50" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-500 rounded-full z-50" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-yellow-500 rounded-full z-50" />
        </>
      )}
    </div>
  );
}
