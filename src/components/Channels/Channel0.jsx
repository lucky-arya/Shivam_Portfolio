import React from 'react';
import SnakeGame from '../Games/SnakeGame';
import { motion } from 'framer-motion';

const Channel0 = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-black to-green-950 flex flex-col items-center justify-center p-2 sm:p-4 overflow-auto">
      <div className="w-full h-full flex flex-col max-w-7xl">
        {/* Professional Header */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="text-center mb-3 sm:mb-4"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              textShadow: [
                '0 0 20px #10b981',
                '0 0 40px #10b981, 0 0 60px #10b981',
                '0 0 20px #10b981'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 mb-2 leading-tight"
          >
            🎮 SECRET ARCADE UNLOCKED 🎮
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-yellow-400 font-bold px-2"
          >
            🏆 Channel 0 - Easter Egg Discovered! 🏆
          </motion.p>
        </motion.div>

        {/* Game Container - Takes remaining space */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <SnakeGame />
        </div>

        {/* Compact Footer Info */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-3 sm:mt-4 bg-gradient-to-r from-black/80 via-green-900/30 to-black/80 border-2 border-green-500/50 rounded-lg p-2 sm:p-3 backdrop-blur-sm"
        >
          <div className="text-center text-green-400 text-xs sm:text-sm">
            <span className="font-bold">🕹️ Classic Snake</span>
            <span className="text-gray-400 mx-2">•</span>
            <span>Collect 🍎 to grow</span>
            <span className="text-gray-400 mx-2">•</span>
            <span>Avoid walls & yourself</span>
            <span className="text-gray-400 mx-2">•</span>
            <span className="text-yellow-400 font-bold">Speed increases!</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Channel0;

