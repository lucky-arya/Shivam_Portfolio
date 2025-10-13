import React from 'react';
import { motion } from 'framer-motion';

const CRTFrame = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {/* TV Bezel/Frame */}
      <div className="absolute inset-0 rounded-lg" style={{
        background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        boxShadow: `
          inset 0 0 20px rgba(0,0,0,0.8),
          inset 0 0 40px rgba(0,0,0,0.6),
          0 10px 30px rgba(0,0,0,0.9)
        `
      }}>
        {/* Inner Shadow for Depth */}
        <div className="absolute inset-0 rounded-lg" style={{
          boxShadow: 'inset 0 0 50px rgba(0,0,0,0.9)'
        }} />
        
        {/* Top Frame Edge */}
        <div className="absolute top-0 left-0 right-0 h-8 sm:h-10 md:h-12 rounded-t-lg" style={{
          background: 'linear-gradient(to bottom, #4a4a4a 0%, #2a2a2a 50%, #1a1a1a 100%)',
          boxShadow: `
            inset 0 2px 10px rgba(255,255,255,0.1),
            inset 0 -2px 10px rgba(0,0,0,0.5)
          `
        }}>
          {/* TV Brand Logo */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-gray-600 font-bold text-xs sm:text-sm tracking-wider">
              RETROTRON
            </div>
          </div>
        </div>

        {/* Bottom Frame Edge */}
        <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-10 md:h-12 rounded-b-lg" style={{
          background: 'linear-gradient(to top, #4a4a4a 0%, #2a2a2a 50%, #1a1a1a 100%)',
          boxShadow: `
            inset 0 -2px 10px rgba(255,255,255,0.1),
            inset 0 2px 10px rgba(0,0,0,0.5)
          `
        }}>
          {/* Speaker Grille */}
          <div className="absolute inset-x-8 sm:inset-x-12 md:inset-x-16 top-1/2 transform -translate-y-1/2 flex gap-1 justify-center">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-3 sm:h-4 bg-gray-900 rounded-full"
                style={{
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Left Frame Edge */}
        <div className="absolute top-8 sm:top-10 md:top-12 bottom-8 sm:bottom-10 md:bottom-12 left-0 w-6 sm:w-8 md:w-10" style={{
          background: 'linear-gradient(to right, #3a3a3a 0%, #2a2a2a 50%, #1a1a1a 100%)',
          boxShadow: `
            inset 2px 0 10px rgba(255,255,255,0.05),
            inset -2px 0 10px rgba(0,0,0,0.5)
          `
        }} />

        {/* Right Frame Edge */}
        <div className="absolute top-8 sm:top-10 md:top-12 bottom-8 sm:bottom-10 md:bottom-12 right-0 w-6 sm:w-8 md:w-10" style={{
          background: 'linear-gradient(to left, #3a3a3a 0%, #2a2a2a 50%, #1a1a1a 100%)',
          boxShadow: `
            inset -2px 0 10px rgba(255,255,255,0.05),
            inset 2px 0 10px rgba(0,0,0,0.5)
          `
        }} />

        {/* Corner Screws */}
        {[
          { top: '1rem', left: '1rem' },
          { top: '1rem', right: '1rem' },
          { bottom: '1rem', left: '1rem' },
          { bottom: '1rem', right: '1rem' }
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full"
            style={{
              ...pos,
              background: 'radial-gradient(circle, #555 0%, #222 100%)',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8), 0 1px 2px rgba(255,255,255,0.1)'
            }}
          >
            {/* Screw slot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1/2 h-px bg-black" />
            </div>
          </div>
        ))}

        {/* Screen Glass Reflection Effect */}
        <div className="absolute inset-8 sm:inset-10 md:inset-12 rounded" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Tube Screen Curvature Highlight */}
        <div className="absolute inset-8 sm:inset-10 md:inset-12 rounded" style={{
          background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.03) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Power LED Indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-10 sm:right-12 md:right-14 w-2 h-2 sm:w-3 sm:h-3 rounded-full"
        style={{
          background: 'radial-gradient(circle, #00ff00 0%, #00aa00 100%)',
          boxShadow: '0 0 10px #00ff00, 0 0 20px #00ff00'
        }}
        animate={{
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Ventilation Slots on Top */}
      <div className="absolute top-2 sm:top-3 left-1/4 right-1/4 flex gap-2 justify-center">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-3 sm:h-4 bg-black rounded-sm"
            style={{
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CRTFrame;
