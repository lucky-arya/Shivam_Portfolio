import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PowerAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000); // Extended to 2 seconds for better effect

    return () => clearTimeout(timer);
  }, []);

  if (!showAnimation) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ 
        duration: 2,
        times: [0, 0.1, 0.8, 1],
        ease: "easeInOut"
      }}
      className="absolute inset-0 z-[1002] bg-black flex items-center justify-center"
    >
      {/* CRT Power-On Effect - Reduced intensity */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ 
          scaleY: [0, 1, 1],
          opacity: [0, 0.3, 0]
        }}
        transition={{ 
          duration: 2,
          times: [0, 0.3, 1],
          ease: "easeOut"
        }}
        className="absolute inset-0 bg-[var(--crt-green)]"
        style={{ transformOrigin: 'center' }}
      />
      
      {/* Power-On Text */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: [0.5, 1.2, 1],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 2,
          times: [0, 0.5, 1],
          ease: "easeOut"
        }}
        className="relative z-10 text-white font-mono"
      >
        <div className="text-3xl sm:text-4xl md:text-5xl font-black text-center">
          ⚡ POWERING ON ⚡
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-1 bg-white mt-4 rounded-full shadow-lg shadow-white/50"
        />
      </motion.div>
      
      {/* Horizontal line sweep effect (classic CRT power-on) - Reduced opacity */}
      <motion.div
        initial={{ height: "0%" }}
        animate={{ height: "100%" }}
        transition={{ 
          duration: 0.8,
          delay: 0.2,
          ease: "easeOut"
        }}
        className="absolute inset-x-0 top-0 bg-gradient-to-b from-white via-gray-400 to-transparent opacity-10"
        style={{ transformOrigin: 'top' }}
      />
    </motion.div>
  );
};

export default PowerAnimation;

