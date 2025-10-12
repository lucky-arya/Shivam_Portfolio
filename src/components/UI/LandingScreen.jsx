import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';



const LandingScreen = ({ isFirstBoot, isPoweredOn }) => {
  const [showPoweringOn, setShowPoweringOn] = useState(false);

  // Show powering on animation when TV is powered on
  useEffect(() => {
    if (isPoweredOn && !isFirstBoot) {
      setShowPoweringOn(true);
      const timer = setTimeout(() => {
        setShowPoweringOn(false);
      }, 2000); // Hide after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [isPoweredOn, isFirstBoot]);

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

  if (!isFirstBoot && !isPoweredOn) {
    // Power Off Screen
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 flex items-center justify-center bg-black z-50"
      >
        <div className="text-center space-y-4 px-4">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[var(--crt-green)] font-mono"
          >
            <div className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 animate-pulse">
              {config.poweringOffMessage}
            </div>
            <div className="text-sm sm:text-base md:text-lg text-gray-500">
              Thanks for visiting, {config.name}
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (isFirstBoot && !isPoweredOn) {
    // Landing Screen - First Boot
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black z-50 overflow-auto"
      >
        <div className="text-center space-y-6 sm:space-y-8 px-4 py-8 max-w-2xl mx-auto">
          {/* Profile Picture */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1 }}
            className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
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
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[var(--crt-green)] mb-2 sm:mb-3 font-mono tracking-wider">
              {config.fullName.toUpperCase()}
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-purple-400 font-semibold">
              {config.tagline}
            </p>
          </motion.div>

          {/* Welcome Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-3 sm:space-y-4"
          >
            <p className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-md mx-auto px-4">
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
            className="group relative px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-[var(--crt-green)] to-green-600 text-black font-bold text-base sm:text-xl md:text-2xl rounded-full hover:from-green-400 hover:to-[var(--crt-green)] transition-all duration-300 shadow-lg shadow-[var(--crt-green)]/50 hover:shadow-[var(--crt-green)] touch-manipulation"
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl">⚡</span>
              POWER ON
              <span className="text-xl sm:text-2xl">⚡</span>
            </span>
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </motion.button>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs sm:text-sm text-gray-500 space-y-1 pt-4"
          >
            <p>💡 Pro Tip: Use SPACEBAR to power on/off</p>
            <p> Use arrow keys or remote to navigate channels</p>
            <p> Press "0" to unlock the secret game channel</p>
            <p>Channel : 1 - Late Night with Shivam Kumar</p>
            <p>Channel : 2 - Amazing Projects</p>
            <p>Channel : 3 - Technical Skills</p>
            <p>Channel : 4 - About Me</p>
            <p>Channel : 5 - Contact Me</p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (isPoweredOn && showPoweringOn) {
    // Powering On Animation - Shows for 2 seconds then disappears
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center bg-black z-40 pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <div className="text-[var(--crt-green)] font-mono">
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-3xl sm:text-5xl md:text-6xl font-black mb-4"
              >
                {config.poweringOnMessage}
              </motion.div>
              
              {/* Loading Bar */}
              <div className="w-48 sm:w-64 md:w-80 h-3 sm:h-4 bg-gray-800 rounded-full overflow-hidden mx-auto border-2 border-[var(--crt-green)]">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-[var(--crt-green)] to-green-600 shadow-lg shadow-[var(--crt-green)]/50"
                />
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs sm:text-sm text-gray-400 mt-4"
              >
                Initializing CRT display... Welcome back!
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return null;
};

export default LandingScreen;

