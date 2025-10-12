import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Channel2 = () => {
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

  const projects = [
    {
      name: "Amazing Project Alpha",
      tagline: "Revolutionary! Groundbreaking! Must-See!",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      tech: "React, Node.js, MongoDB"
    },
    {
      name: "Incredible App Beta",
      tagline: "But Wait... There's MORE!",
      features: ["Real-time updates", "Beautiful UI", "Lightning fast"],
      tech: "Next.js, TypeScript, PostgreSQL"
    },
    {
      name: "Spectacular Tool Gamma",
      tagline: "Order NOW and get DOUBLE the value!",
      features: ["Easy to use", "Highly scalable", "100% awesome"],
      tech: "Python, FastAPI, Docker"
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 p-4 sm:p-6 md:p-8 overflow-auto scroll-smooth"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        {/* Infomercial Header */}
        <div className="text-center mb-6 sm:mb-8 animate-pulse">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] mb-3 sm:mb-4 leading-tight">
             AMAZING PROJECTS! 
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-yellow-200 font-bold px-2">
            ⭐ AS SEEN ON THE INTERNET! ⭐
          </p>
        </div>

        {/* Projects Showcase */}
        <div className="space-y-4 sm:space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-white border-4 sm:border-8 border-black p-4 sm:p-6 rounded-lg shadow-2xl transform hover:scale-105 transition-transform"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="text-4xl sm:text-5xl md:text-6xl">📦</div>
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black leading-tight">{project.name}</h2>
                  <p className="text-lg sm:text-xl md:text-2xl text-red-600 font-bold italic">{project.tagline}</p>
                </div>
              </div>

              <div className="bg-yellow-300 border-2 sm:border-4 border-black p-3 sm:p-4 mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-black">FEATURES:</h3>
                <ul className="space-y-1">
                  {project.features.map((feature, i) => (
                    <li key={i} className="text-sm sm:text-base md:text-xl font-semibold text-black">✓ {feature}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-black text-white p-2 sm:p-3 text-center">
                <p className="font-mono text-xs sm:text-sm md:text-lg">Tech Stack: {project.tech}</p>
              </div>

              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-black text-base sm:text-xl md:text-2xl py-2 sm:py-3 px-4 sm:px-6 rounded border-2 sm:border-4 border-black transform hover:scale-105 transition-all touch-manipulation">
                  VIEW PROJECT
                </button>
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-black text-base sm:text-xl md:text-2xl py-2 sm:py-3 px-4 sm:px-6 rounded border-2 sm:border-4 border-black transform hover:scale-105 transition-all touch-manipulation">
                  LIVE DEMO
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-6 sm:mt-8 bg-red-600 text-white p-4 sm:p-6 md:p-8 text-center border-4 sm:border-8 border-yellow-400 animate-pulse">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 leading-tight">🔥 LIMITED TIME OFFER! 🔥</p>
          <p className="text-lg sm:text-2xl md:text-3xl font-bold">Contact me NOW for your next project!</p>
          <p className="text-base sm:text-xl md:text-2xl mt-3 sm:mt-4">⏰ Don&apos;t wait! Operators are standing by! ⏰</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Channel2;

