import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Channel1 = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Handle keyboard scrolling
    const handleKeyPress = (e) => {
      if (!containerRef.current) return;
      
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        containerRef.current.scrollBy({ top: -100, behavior: 'smooth' });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        containerRef.current.scrollBy({ top: 100, behavior: 'smooth' });
      }
    };

    // Handle remote directional input
    const handleRemoteInput = (e) => {
      if (!containerRef.current) return;
      
      const direction = e.detail; // e.detail is the direction string directly
      if (direction === 'up') {
        containerRef.current.scrollBy({ top: -100, behavior: 'smooth' });
      } else if (direction === 'down') {
        containerRef.current.scrollBy({ top: 100, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('remoteDirectionalInput', handleRemoteInput);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('remoteDirectionalInput', handleRemoteInput);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-gradient-to-b from-purple-900 to-black p-4 sm:p-6 md:p-8 overflow-auto scroll-smooth"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Talk Show Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="retro-text text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-3 sm:mb-4 chromatic-aberration leading-tight">
            🎬 LATE NIGHT WITH Shivam Kumar......
          </h1>
          <p className="text-[var(--amber-glow)] text-lg sm:text-xl md:text-2xl font-mono px-2">
            Tonight&apos;s Special Guest... Also Shivam Kumar !
          </p>
        </div>

        {/* Interview Content */}
        <div className="bg-black/50 border-2 sm:border-4 border-[var(--crt-green)] p-4 sm:p-6 md:p-8 rounded-lg mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="text-4xl sm:text-5xl md:text-6xl">👤</div>
            <div>
              <h2 className="text-[var(--crt-green)] text-2xl sm:text-2xl md:text-3xl font-bold mb-2">WHO AM I?</h2>
              <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed">
                Welcome to the show! I&apos;m a passionate full-stack developer who loves creating 
                amazing digital experiences. When I&apos;m not coding, you&apos;ll find me exploring 
                new technologies, contributing to open source, or working on creative side projects.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="text-4xl sm:text-5xl md:text-6xl">💡</div>
            <div>
              <h2 className="text-[var(--crt-green)] text-2xl sm:text-2xl md:text-3xl font-bold mb-2">MY JOURNEY</h2>
              <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed">
                Started my coding journey back in [YEAR]. Since then, I&apos;ve been on an incredible 
                adventure building everything from mobile apps to complex web applications. 
                Every project is a new episode in this never-ending series!
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className="text-4xl sm:text-5xl md:text-6xl">🎯</div>
            <div>
              <h2 className="text-[var(--crt-green)] text-2xl sm:text-2xl md:text-3xl font-bold mb-2">WHAT DRIVES ME</h2>
              <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed">
                I believe in writing clean code, building intuitive user experiences, and constantly 
                learning. My mission? To craft digital products that people actually enjoy using. 
                Plus, I have a soft spot for retro aesthetics (as you can tell)!
              </p>
            </div>
          </div>
        </div>

        {/* Audience Applause Sign */}
        <div className="text-center">
          <div className="inline-block bg-red-600 text-white text-lg sm:text-xl md:text-2xl font-bold px-6 sm:px-8 py-3 sm:py-4 rounded animate-pulse border-2 sm:border-4 border-yellow-400">
            👏 APPLAUSE 👏
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Channel1;

