import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DebugPanel({ config, onConfigChange, onToggleDebug }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleChange = (key, value) => {
    onConfigChange({ ...config, [key]: value });
  };

  const sliders = [
    { key: 'top', label: 'Top', min: 0, max: 50, unit: '%' },
    { key: 'left', label: 'Left', min: 0, max: 50, unit: '%' },
    { key: 'width', label: 'Width', min: 20, max: 80, unit: '%' },
    { key: 'height', label: 'Height', min: 20, max: 80, unit: '%' },
    { key: 'skewX', label: 'Skew X', min: -15, max: 15, unit: '°' },
    { key: 'skewY', label: 'Skew Y', min: -15, max: 15, unit: '°' },
    { key: 'rotateX', label: 'Rotate X', min: -20, max: 20, unit: '°' },
    { key: 'rotateY', label: 'Rotate Y', min: -20, max: 20, unit: '°' },
    { key: 'perspective', label: 'Perspective', min: 500, max: 2000, unit: 'px' },
  ];

  const exportConfig = () => {
    const css = Object.entries(config)
      .map(([key, value]) => {
        if (['top', 'left', 'width', 'height'].includes(key)) {
          return `--screen-${key}: ${value}%;`;
        }
        return null;
      })
      .filter(Boolean)
      .join('\n');

    const js = JSON.stringify(config, null, 2);

    console.log('CSS Variables:\n', css);
    console.log('Config Object:\n', js);
    navigator.clipboard?.writeText(js);
    alert('Config copied to clipboard! Check console for CSS variables.');
  };

  return (
    <motion.div
      className="fixed top-4 right-4 z-50 bg-black/90 text-white rounded-lg overflow-hidden
                 font-mono text-xs border border-white/20"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      style={{ width: isExpanded ? '280px' : 'auto' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="tracking-wider">CALIBRATION</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:text-white/70"
          >
            {isExpanded ? '−' : '+'}
          </button>
          <button
            onClick={onToggleDebug}
            className="hover:text-white/70"
          >
            ×
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-3 space-y-3">
          {/* Sliders */}
          {sliders.map(({ key, label, min, max, unit }) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-white/60">
                <span>{label}</span>
                <span>{config[key]}{unit}</span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={key === 'perspective' ? 50 : 0.5}
                value={config[key]}
                onChange={(e) => handleChange(key, parseFloat(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-3
                           [&::-webkit-slider-thumb]:h-3
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:bg-white"
              />
            </div>
          ))}

          {/* Action buttons */}
          <div className="pt-2 border-t border-white/10 flex gap-2">
            <button
              onClick={exportConfig}
              className="flex-1 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors"
            >
              Export Config
            </button>
            <button
              onClick={() => onConfigChange({
                top: 15,
                left: 25,
                width: 50,
                height: 55,
                skewX: 0,
                skewY: 0,
                rotateX: 0,
                rotateY: 0,
                perspective: 1000,
              })}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Instructions */}
          <div className="text-white/40 text-[10px] leading-relaxed pt-2">
            Adjust sliders to align the screen container with your background photo.
            Corner handles show in debug mode. Export saves config to clipboard.
          </div>
        </div>
      )}
    </motion.div>
  );
}
