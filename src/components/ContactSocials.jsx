import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const contactLinks = [
  { label: 'EMAIL', url: 'mailto:wolskoluke@gmail.com', top: '6.5%', left: '9%', width: '18%', height: '12%', skewY: -1 },
  { label: 'INSTAGRAM', url: 'https://www.instagram.com/lukewolsko/', top: '20.8%', left: '10.5%', width: '18%', height: '9%', skewY: -1 },
  { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/luke-wolsko/', top: '31%', left: '10%', width: '19%', height: '9%', skewY: -1 },
  { label: 'X', url: 'https://x.com/basilisk256', top: '42%', left: '10.5%', width: '5%', height: '9%', skewY: -9 },
  { label: 'YOUTUBE', url: 'https://www.youtube.com/@lukewolsko', top: '52%', left: '11%', width: '15%', height: '9%', skewY: -8.5 },
  { label: 'IMDB', url: 'https://www.imdb.com/name/nm15865993/', top: '63%', left: '11%', width: '10%', height: '9%', skewY: -8.5 },
  { label: 'LETTERBOXD', url: 'https://letterboxd.com/lukewolsko/', top: '71%', left: '10.5%', width: '20%', height: '9%', skewY: -9 },
  { label: 'BACK TO SITE', path: '/', top: '83%', left: '10%', width: '22%', height: '9%', skewY: -9 },
];

function SignHotspot({ label, url, path, top, left, width, height, skewY = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <div
      className="absolute z-20 cursor-pointer transition-all duration-300"
      style={{
        top,
        left,
        width,
        height,
        transform: skewY ? `skewY(${skewY}deg)` : 'none',
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
        filter: isHovered ? 'blur(12px) brightness(1.3)' : 'none',
        mixBlendMode: 'screen',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );

  // Use Link for internal navigation, <a> for external
  if (path) {
    return <Link to={path}>{content}</Link>;
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}

export default function ContactSocials() {
  // Image aspect ratio: 2816 x 1504
  const aspectRatio = 2816 / 1504;

  return (
    <div className="relative w-full h-screen overflow-auto bg-[#0a0f0a] flex items-center justify-center">
      {/* Aspect ratio container - scales to fill viewport (may overflow) */}
      <div
        className="relative"
        style={{
          width: '100%',
          height: '100%',
          minWidth: `calc(100vh * ${aspectRatio})`,
          minHeight: `calc(100vw / ${aspectRatio})`,
          aspectRatio: '2816 / 1504',
        }}
      >
        {/* Background Image */}
        <img
          src="/assets/contactpagebackground.jpg"
          alt=""
          className="absolute inset-0 w-full h-full"
        />

        {/* Twinkling City Lights - Building windows, slow on/off like real city */}
        <div className="absolute inset-0 pointer-events-none">
          {/* City lights - left of theater, on the horizon/buildings only */}
          {[...Array(30)].map((_, i) => {
            const left = 50 + Math.random() * 6; // 50-56% (past the tree, left of theater)
            const top = 25 + Math.random() * 15;  // 25-40% (horizon line, not sky)
            const size = Math.random() * 2 + 0.5;
            const duration = Math.random() * 6 + 4; // 4-10 seconds per cycle
            const delay = Math.random() * 10;
            const brightness = i % 2 === 0 ? 3 : 2; // variation in brightness

            return (
              <motion.div
                key={`light-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: ['#ffcc66', '#ffffff', '#ff9944', '#ffffaa'][Math.floor(Math.random() * 4)],
                  boxShadow: `0 0 ${size * 4}px ${size * 2}px currentColor`,
                  filter: `blur(${size * 0.8}px) brightness(${brightness})`,
                }}
                animate={{
                  opacity: [1, 1, 1, 0.2, 0.2, 1], // bright, occasionally dim
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: 'easeInOut',
                }}
              />
            );
          })}

          {/* More lights on far right of screen */}
          {[...Array(80)].map((_, i) => {
            const left = 85 + Math.random() * 14; // 85-99% (far right)
            const top = 20 + Math.random() * 25;  // 20-45% (horizon/buildings, not sky)
            const size = Math.random() * 2 + 0.5;
            const duration = Math.random() * 6 + 4; // 4-10 seconds
            const delay = Math.random() * 12;
            const brightness = i % 2 === 0 ? 3 : 2; // variation in brightness

            return (
              <motion.div
                key={`right-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: ['#ffffff', '#ffffcc', '#ffeeaa', '#ffcc66'][Math.floor(Math.random() * 4)],
                  boxShadow: `0 0 ${size * 4}px ${size * 2}px currentColor`,
                  filter: `blur(${size * 0.8}px) brightness(${brightness})`,
                }}
                animate={{
                  opacity: [1, 1, 1, 0.2, 1], // bright, briefly dim
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: 'easeInOut',
                }}
              />
            );
          })}

          {/* City lights - top left near email sign and above tree */}
          {[...Array(40)].map((_, i) => {
            const left = 35 + Math.random() * 10; // 35-45% (city skyline area)
            const top = 15 + Math.random() * 20;  // 15-35% (city skyline area)
            const size = Math.random() * 2 + 0.5;
            const duration = Math.random() * 6 + 4; // 4-10 seconds
            const delay = Math.random() * 10;
            const brightness = i % 2 === 0 ? 3 : 2; // variation in brightness

            return (
              <motion.div
                key={`topleft-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: ['#ffcc66', '#ffffff', '#ff9944', '#ffffaa'][Math.floor(Math.random() * 4)],
                  boxShadow: `0 0 ${size * 4}px ${size * 2}px currentColor`,
                  filter: `blur(${size * 0.8}px) brightness(${brightness})`,
                }}
                animate={{
                  opacity: [1, 1, 1, 0.2, 0.2, 1], // bright, occasionally dim
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: 'easeInOut',
                }}
              />
            );
          })}
        </div>

        {/* Airplane container - clips planes so they don't fly over signs */}
        <div
          className="absolute pointer-events-none overflow-hidden"
          style={{
            top: 0,
            left: '28%',
            right: 0,
            bottom: 0,
          }}
        >
          {/* Airplane crossing sky */}
          <motion.div
            className="absolute"
            style={{
              top: '12%',
            }}
            animate={{
              left: ['100%', '-10%'],
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 20,
            }}
          >
            {/* Plane body */}
            <div
              className="relative"
              style={{
                width: '8px',
                height: '2px',
                backgroundColor: '#888',
                boxShadow: '0 0 3px rgba(255,255,255,0.3)',
              }}
            >
              {/* Blinking lights */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '3px',
                  height: '3px',
                  top: '-1px',
                  left: '0px',
                  backgroundColor: '#ff0000',
                }}
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '2px',
                  height: '2px',
                  top: '-0.5px',
                  right: '0px',
                  backgroundColor: '#00ff00',
                }}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
              {/* White strobe */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '2px',
                  height: '2px',
                  top: '0px',
                  left: '3px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 0 4px #ffffff',
                }}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.1,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                }}
              />
            </div>
          </motion.div>

          {/* Second airplane (different timing) */}
          <motion.div
            className="absolute"
            style={{
              top: '8%',
            }}
            animate={{
              left: ['-5%', '105%'],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: 'linear',
              delay: 30,
              repeatDelay: 40,
            }}
          >
            <div
              className="relative"
              style={{
                width: '6px',
                height: '1.5px',
                backgroundColor: '#666',
                boxShadow: '0 0 2px rgba(255,255,255,0.2)',
              }}
            >
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '2px',
                  height: '2px',
                  top: '-0.5px',
                  left: '2px',
                  backgroundColor: '#ff0000',
                }}
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Clickable Sign Hotspots */}
        {contactLinks.map((link) => (
          <SignHotspot key={link.label} {...link} />
        ))}
      </div>
    </div>
  );
}
