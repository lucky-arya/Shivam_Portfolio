import React from 'react';
import { motion } from 'framer-motion';

const ChannelSwitchingAnimation = ({ currentChannel }) => {
  return (
    <div className="absolute inset-0 z-[1003] bg-black flex items-center justify-center">
      {/* Static Noise Background */}
      <div className="static-noise static-active opacity-30" />
      
      {/* Channel Switching Text */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: -10 }}
        animate={{ 
          scale: [0, 1.2, 1, 1, 0],
          opacity: [0, 1, 1, 1, 0],
          rotate: [10, 0, 0, 0, -10]
        }}
        transition={{ 
          duration: 1.2,
          times: [0, 0.2, 0.4, 0.8, 1],
          ease: "easeInOut"
        }}
        className="relative z-10 text-center space-y-4"
      >
        {/* Channel Number Display */}
        <motion.div
          animate={{ 
            textShadow: [
              '0 0 10px #00ff00, 0 0 20px #00ff00',
              '0 0 20px #00ff00, 0 0 30px #00ff00',
              '0 0 10px #00ff00, 0 0 20px #00ff00'
            ]
          }}
          transition={{ 
            duration: 0.3,
            repeat: 3,
            ease: "easeInOut"
          }}
          className="text-8xl sm:text-9xl md:text-[12rem] font-black text-[var(--crt-green)] font-mono"
          style={{
            textShadow: '0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00'
          }}
        >
          {currentChannel === 99 ? 'MENU' : currentChannel === 404 ? '404' : `CH:${currentChannel}`}
        </motion.div>

        {/* Scanning Lines Effect */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{ 
            duration: 1.2,
            times: [0, 0.3, 0.7, 1],
            ease: "linear"
          }}
          className="h-1 bg-[var(--crt-green)] shadow-lg shadow-[var(--crt-green)]"
        />

        {/* Switching Text */}
        <motion.p
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ 
            duration: 1.2,
            times: [0, 0.2, 0.8, 1]
          }}
          className="text-xl sm:text-2xl md:text-3xl text-[var(--crt-green)] font-mono tracking-widest"
        >
          SWITCHING...
        </motion.p>
      </motion.div>

      {/* Horizontal scan line effect */}
      <motion.div
        initial={{ top: '50%' }}
        animate={{ 
          top: ['0%', '100%', '0%']
        }}
        transition={{ 
          duration: 1.2,
          ease: "linear"
        }}
        className="absolute left-0 right-0 h-1 bg-gradient-to-b from-transparent via-[var(--crt-green)] to-transparent opacity-50"
        style={{
          boxShadow: '0 0 20px #00ff00'
        }}
      />
    </div>
  );
};

export default ChannelSwitchingAnimation;
