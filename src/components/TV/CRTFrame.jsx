import React from 'react';
import { motion } from 'framer-motion';
import { useTVContext } from '../../context/TVContext';

const CRTFrame = () => {
  const { state } = useTVContext();
  const isPoweredOn = state.isPoweredOn;

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {/* TV Bezel/Frame - Only the edges */}
      
      {/* Top Frame Edge */}
      <div className="absolute top-0 left-0 right-0 h-8 sm:h-10 md:h-12 rounded-t-lg pointer-events-none" style={{
        background: 'linear-gradient(to bottom, #4a4a4a 0%, #2a2a2a 50%, #1a1a1a 100%)',
        boxShadow: `
          inset 0 2px 10px rgba(255,255,255,0.1),
          inset 0 -2px 10px rgba(0,0,0,0.5),
          0 2px 10px rgba(0,0,0,0.8)
        `
      }}>
        {/* TV Brand Logo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-gray-600 font-bold text-xs sm:text-sm tracking-wider">
            PORTFOLIO
          </div>
        </div>
        
        {/* Ventilation Slots */}
        <div className="absolute bottom-1 left-1/4 right-1/4 flex gap-2 justify-center">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-2 sm:h-3 bg-black rounded-sm"
              style={{
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Frame Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-10 md:h-12 rounded-b-lg pointer-events-none" style={{
        background: 'linear-gradient(to top, #4a4a4a 0%, #2a2a2a 50%, #1a1a1a 100%)',
        boxShadow: `
          inset 0 -2px 10px rgba(255,255,255,0.1),
          inset 0 2px 10px rgba(0,0,0,0.5),
          0 -2px 10px rgba(0,0,0,0.8)
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
        
        {/* Power LED Indicator - Changes color based on power state */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 left-10 sm:left-12 md:left-14 w-2 h-2 sm:w-3 sm:h-3 rounded-full"
          style={{
            background: isPoweredOn 
              ? 'radial-gradient(circle, #00ff00 0%, #00aa00 100%)'
              : 'radial-gradient(circle, #ff0000 0%, #aa0000 100%)',
            boxShadow: isPoweredOn 
              ? '0 0 10px #00ff00, 0 0 20px #00ff00'
              : '0 0 10px #ff0000, 0 0 20px #ff0000'
          }}
          animate={{
            opacity: isPoweredOn ? [1, 0.7, 1] : [1, 0.5, 1],
          }}
          transition={{
            duration: isPoweredOn ? 2 : 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Left Frame Edge */}
      <div className="absolute top-8 sm:top-10 md:top-12 bottom-8 sm:bottom-10 md:bottom-12 left-0 w-6 sm:w-8 md:w-10 pointer-events-none" style={{
        background: 'linear-gradient(to right, #3a3a3a 0%, #2a2a2a 50%, #1a1a1a 100%)',
        boxShadow: `
          inset 2px 0 10px rgba(255,255,255,0.05),
          inset -2px 0 10px rgba(0,0,0,0.5),
          2px 0 10px rgba(0,0,0,0.8)
        `
      }} />

      {/* Right Frame Edge */}
      <div className="absolute top-8 sm:top-10 md:top-12 bottom-8 sm:bottom-10 md:bottom-12 right-0 w-6 sm:w-8 md:w-10 pointer-events-none" style={{
        background: 'linear-gradient(to left, #3a3a3a 0%, #2a2a2a 50%, #1a1a1a 100%)',
        boxShadow: `
          inset -2px 0 10px rgba(255,255,255,0.05),
          inset 2px 0 10px rgba(0,0,0,0.5),
          -2px 0 10px rgba(0,0,0,0.8)
        `
      }} />

      {/* Corner Screws */}
      {[
        { top: '0.5rem', left: '0.5rem' },
        { top: '0.5rem', right: '0.5rem' },
        { bottom: '0.5rem', left: '0.5rem' },
        { bottom: '0.5rem', right: '0.5rem' }
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full pointer-events-none"
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
    </div>
  );
};

export default CRTFrame;
