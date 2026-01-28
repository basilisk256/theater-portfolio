import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';

const navItems = [
  {
    label: 'BIOGRAPHY',
    path: '/biography',
    top: '27.5%',
    left: '10%',
    width: '10.5%',
    height: '6%',
    skewY: 14,
  },
  {
    label: 'POSTERS',
    path: '/posters',
    top: '28.5%',
    right: '11.5%',
    width: '9.5%',
    height: '5%',
    skewY: -10,
  },
  {
    label: 'COMMERCIAL',
    path: '/commercial',
    top: '73%',
    left: '15%',
    width: '10%',
    height: '4%',
    skewY: -2,
    hidden: true, // Hidden for now - position preserved for future use
  },
  {
    label: 'CONTACT',
    path: '/contact',
    top: '72%',
    right: '16%',
    width: '9%',
    height: '5%',
    skewY: 2,
  },
];

// Mobile menu hotspots - positioned over the marquee image buttons
const mobileMenuHotspots = [
  { label: 'MOVIES', path: '/now-showing', top: '33%', height: '9%' },
  { label: 'POSTERS', path: '/posters', top: '43%', height: '9%' },
  { label: 'BIOGRAPHY', path: '/biography', top: '55%', height: '9%' },
  { label: 'CONTACT', path: '/contact', top: '64%', height: '9%' },
];

function SignHotspot({ label, path, top, left, right, width, height, skewY }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={path}
      className="absolute z-20 cursor-pointer transition-all duration-300"
      style={{
        top,
        width,
        height,
        ...(left ? { left } : { right }),
        transform: `skewY(${skewY}deg)`,
        backgroundColor: isHovered ? 'rgb(0, 120, 255)' : 'transparent',
        filter: isHovered ? 'blur(20px) brightness(1.5) saturate(1.5)' : 'none',
        mixBlendMode: 'screen',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
}

export default function CinemaEnvironment({ children }) {
  const isMobile = useIsMobile();

  // Image aspect ratio: 5504 x 3072
  const aspectRatio = 5504 / 3072;

  // Mobile layout - Theater Marquee Style with background image
  if (isMobile) {
    return (
      <div className="h-screen w-screen relative overflow-hidden bg-black">
        {/* Background marquee image */}
        <img
          src="/assets/phonebg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Invisible hotspots over the marquee buttons */}
        {mobileMenuHotspots.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="absolute left-[10%] right-[10%] z-20 active:bg-white/10"
            style={{
              top: item.top,
              height: item.height,
            }}
          />
        ))}
      </div>
    );
  }

  // Desktop layout (unchanged)
  return (
    <div className="relative w-full h-full overflow-auto bg-[#0a0806] flex items-center justify-center">
      {/* Aspect ratio container - scales to fill viewport (may overflow) */}
      <div
        className="relative"
        style={{
          width: '100%',
          height: '100%',
          minWidth: `calc(100vh * ${aspectRatio})`,
          minHeight: `calc(100vw / ${aspectRatio})`,
          aspectRatio: '5504 / 3072',
        }}
      >
        {/* Background Theater Image */}
        <img
          src="/assets/theatermainbackground.jpg"
          alt=""
          className="absolute inset-0 w-full h-full"
        />

        {/* Navigation Sign Hotspots */}
        {navItems.filter((item) => !item.hidden).map((item) => (
          <SignHotspot key={item.label} {...item} />
        ))}

        {/* Content Layer - children are positioned within this */}
        <div className="absolute inset-0 z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
