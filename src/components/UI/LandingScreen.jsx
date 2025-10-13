import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';



const LandingScreen = ({ isFirstBoot, isPoweredOn }) => {
  const [showOffMessage, setShowOffMessage] = useState(false);

  // Configuration - Update these with your details
  const config = {
    name: "SHIVAM",
    fullName: "Shivam Kumar",
    profilePic: "/images/profile.jpg", // Add your profile image to public/images/
    tagline: "Full Stack Developer & Creative Technologist",
    welcomeMessage: "Welcome to my retro portfolio experience",
    poweringOnMessage: "POWERING ON...",
    poweringOffMessage: "SHUTTING DOWN...",
  };

  // Show "Press SPACE" message after shutdown animation completes
  useEffect(() => {
    if (!isFirstBoot && !isPoweredOn) {
      const timer = setTimeout(() => {
        setShowOffMessage(true);
      }, 700); // Show after shutdown animation (0.6s + small delay)
      
      return () => clearTimeout(timer);
    } else {
      setShowOffMessage(false);
    }
  }, [isFirstBoot, isPoweredOn]);

  if (!isFirstBoot && !isPoweredOn) {
    // Power Off Screen with CRT shutdown effect
    return (
      <>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 bg-black"
        >
          {/* CRT Shutdown Effect - Horizontal collapse */}
          <motion.div
            initial={{ scaleY: 1, opacity: 1 }}
            animate={{ 
              scaleY: [1, 0.01],
              opacity: [1, 0.8, 0]
            }}
            transition={{ 
              duration: 0.6,
              times: [0, 0.9, 1],
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-black"
            style={{ transformOrigin: 'center' }}
          >
            {/* Shutting Down Text */}
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ 
                scale: [1, 1.1, 0],
                opacity: [1, 1, 0]
              }}
              transition={{ 
                duration: 0.5,
                ease: "easeIn"
              }}
              className="text-[var(--crt-green)] font-mono text-center"
            >
              <div className="text-2xl sm:text-4xl md:text-5xl font-black mb-4">
                {config.poweringOffMessage}
              </div>
              <div className="text-sm sm:text-base md:text-lg text-gray-400">
                Thanks for visiting!
              </div>
            </motion.div>
          </motion.div>
          
          {/* Final Flash - White dot in center (classic CRT shutdown) */}
          <motion.div
            initial={{ scale: 1, opacity: 0 }}
            animate={{ 
              scale: [1, 0.5, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              delay: 0.4,
              duration: 0.3,
              ease: "easeOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full blur-xl"
          />
        </motion.div>
        
        {/* Press SPACE message - Shows after shutdown animation */}
        {showOffMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-black z-[51]"
          >
            <div className="text-gray-600 text-center px-4 space-y-3">
              <p className="text-sm sm:text-base md:text-lg font-mono animate-pulse">
                Press <span className="text-[var(--crt-green)] font-bold">SPACE</span> or click <span className="text-[var(--crt-green)] font-bold">POWER</span> to turn on
              </p>
              <div className="text-xs sm:text-sm text-gray-700">
                ⚡ Power Button | 🎮 Remote Control
              </div>
            </div>
          </motion.div>
        )}
      </>
    );
  }

  if (isFirstBoot && !isPoweredOn) {
    // Landing Screen - First Boot
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black z-50 overflow-y-auto overflow-x-hidden"
      >
        <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 px-4 py-4 sm:py-6 md:py-8 max-w-2xl mx-auto my-auto">
          {/* Profile Picture */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1 }}
            className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--crt-green)] to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-full h-full rounded-full border-4 sm:border-8 border-[var(--crt-green)] overflow-hidden shadow-2xl shadow-[var(--crt-green)]/50">
              {/* Fallback: Initials if no image */}
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl font-black text-[var(--crt-green)]">
                {config.name.substring(0, 2).toUpperCase()}
              </div>
              {/* Profile Image - Uncomment when you add your image */}
              {/* <img 
                src={config.profilePic} 
                alt={config.fullName}
                className="w-full h-full object-cover"
              /> */}
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-[var(--crt-green)] mb-2 font-mono tracking-wider">
              {config.fullName.toUpperCase()}
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-purple-400 font-semibold">
              {config.tagline}
            </p>
          </motion.div>

          {/* Welcome Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-2 sm:space-y-3"
          >
            <p className="text-xs sm:text-sm md:text-lg text-gray-300 max-w-md mx-auto px-4">
              {config.welcomeMessage}
            </p>
            
            {/* Retro TV ASCII Art */}
            {/* <div className="text-[var(--crt-green)] text-xs sm:text-sm font-mono leading-tight opacity-70">
              <pre className="inline-block">
{`  _______________
   |  ___________  |
   | |           | |
   | |  > CH1    | |
   | |___________| |
   |_______________|
      |  POWER  |
      -----------`}
              </pre>
            </div> */}
          </motion.div>

          {/* Power On Button */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // This will be triggered by parent component
              window.dispatchEvent(new CustomEvent('landingPowerOn'));
            }}
            className="group relative px-6 sm:px-8 md:px-12 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-[var(--crt-green)] to-green-600 text-black font-bold text-sm sm:text-base md:text-xl rounded-full hover:from-green-400 hover:to-[var(--crt-green)] transition-all duration-300 shadow-lg shadow-[var(--crt-green)]/50 hover:shadow-[var(--crt-green)] touch-manipulation"
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-3">
              <span className="text-base sm:text-xl md:text-2xl">⚡</span>
              POWER ON
              <span className="text-base sm:text-xl md:text-2xl">⚡</span>
            </span>
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </motion.button>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs sm:text-sm text-gray-500 space-y-1 pt-2 sm:pt-3 md:pt-4"
          >
            <p>💡 Pro Tip: Use SPACEBAR to power on/off</p>
            <p>🎮 Use arrow keys or remote to navigate channels</p>
            <p>🔓 Press "0" to unlock the secret game channel</p>
            <p>Channel : 1 - Late Night with Shivam Kumar</p>
            <p>Channel : 2 - Amazing Projects</p>
            <p>Channel : 3 - Technical Skills</p>
            <p>Channel : 4 - About Me</p>
            <p>Channel : 5 - Contact Me</p>
            <p>Channel : 6 - Retro Music Player 🎵</p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // No longer showing powering on animation here - PowerAnimation component handles it
  return null;
};

export default LandingScreen;

