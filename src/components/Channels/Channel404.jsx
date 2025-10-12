import React from 'react';
import { motion } from 'framer-motion';

const Channel404 = () => {
  return (
    <div className="w-full h-full bg-black flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.8, 1, 0.9, 1] }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl w-full"
      >
        {/* Static Noise Effect */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
          }}
          transition={{ duration: 0.1, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-b from-gray-500 to-gray-700 mix-blend-overlay"
        />

        {/* Error Message */}
        <div className="relative z-10 px-4">
          <motion.div
            animate={{ 
              x: [-2, 2, -2, 0],
              textShadow: [
                '2px 2px 0px #ff0000, -2px -2px 0px #00ffff',
                '-2px -2px 0px #ff0000, 2px 2px 0px #00ffff',
                '2px -2px 0px #ff0000, -2px 2px 0px #00ffff',
                '0px 0px 20px #00ff41'
              ]
            }}
            transition={{ duration: 0.3, repeat: Infinity }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[var(--crt-green)] mb-4 sm:mb-6"
          >
            404
          </motion.div>

          <div className="space-y-3 sm:space-y-4 font-mono">
            <motion.h1
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[var(--crt-green)] font-bold mb-3 sm:mb-4"
            >
              ⚠️ SIGNAL LOST ⚠️
            </motion.h1>

            <div className="text-white text-base sm:text-lg md:text-xl lg:text-2xl space-y-2">
              <p>BROADCAST NOT FOUND</p>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg">ERROR CODE: CH_404</p>
            </div>

            <div className="mt-6 sm:mt-8 p-4 sm:p-6 border-2 sm:border-4 border-[var(--crt-green)] bg-black/50">
              <p className="text-[var(--crt-green)] text-base sm:text-lg mb-3 sm:mb-4">
                TECHNICAL DIFFICULTIES
              </p>
              <p className="text-white text-sm sm:text-base">
                The channel you&apos;re looking for is currently experiencing interference.
              </p>
              <p className="text-white mt-2 text-sm sm:text-base">
                Please adjust your antenna or try another channel.
              </p>
            </div>

            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-6 sm:mt-8 text-gray-400 text-xs sm:text-sm"
            >
              <p>█ PLEASE STAND BY █</p>
              <p className="mt-2">Use arrow keys or numbers 1-5 to change channel</p>
            </motion.div>
          </div>

          {/* Retro TV Bars */}
          <div className="mt-8 sm:mt-12 flex justify-center gap-2 sm:gap-4">
            {['bg-white', 'bg-yellow-400', 'bg-cyan-400', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-blue-500'].map((color, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                className={`w-4 sm:w-6 md:w-8 h-16 sm:h-24 md:h-32 ${color}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Channel404;

