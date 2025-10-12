import React from 'react';
import { motion } from 'framer-motion';

const Channel3 = () => {
  const skills = {
    "Frontend": ["HTML", "CSS", "JavaScript", "React",  "Tailwind CSS"],
    "Backend": ["Node.js", "Express", "REST APIs"],
    "Database": [ "MongoDB", "MySQL"],
    "DevOps":  ["Git"],
    "Tools": ["VS Code", "Figma", "Postman",  "Vite" , "GitHub"],
    "Other": ["Agile Methodologies", "Unit Testing", "Problem Solving"]
  };

  return (
    <div className="w-full h-full bg-blue-900 p-3 sm:p-4 md:p-6 overflow-auto font-mono">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Teletext Header */}
        <div className="bg-yellow-400 text-black p-2 sm:p-3 mb-2 sm:mb-3">
          <div className="text-lg sm:text-xl md:text-2xl font-bold leading-tight text-center">⚡ TECHNICAL SKILLS  ⚡</div>
          <div className="text-xs sm:text-sm">Page 101 • Last updated: October 2025 • Press 3 to view</div>
        </div>

        {/* Skills Grid - Teletext Style */}
        <div className="space-y-3 sm:space-y-4">
          {Object.entries(skills).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="border-2 border-yellow-400 bg-black/50"
            >
              <div className="bg-cyan-500 text-black px-3 sm:px-4 py-2 text-lg sm:text-xl md:text-2xl font-bold">
                {category.toUpperCase()}
              </div>
              <div className="p-3 sm:p-4 grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {items.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                    className="bg-yellow-400 text-black px-2 sm:px-3 py-1.5 sm:py-2 font-bold text-center text-xs sm:text-sm md:text-base border-2 border-black hover:bg-yellow-300 transition-colors"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency Indicators - Teletext Style */}
        <div className="mt-4 sm:mt-6 border-2 border-yellow-400 bg-black/50 p-3 sm:p-4">
          <div className="text-yellow-400 text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">📊 PROFICIENCY LEVELS:</div>
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
              <span className="text-white w-20 sm:w-24">Expert:</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-green-500 border-2 border-white"></div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
              <span className="text-white w-20 sm:w-24">Advanced:</span>
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-blue-500 border-2 border-white"></div>
                ))}
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gray-700 border-2 border-white"></div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
              <span className="text-white w-20 sm:w-24">Intermediate:</span>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-yellow-500 border-2 border-white"></div>
                ))}
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gray-700 border-2 border-white"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 sm:mt-4 bg-red-600 text-white p-2 sm:p-3 text-center text-xs sm:text-sm">
          ⚠️ USE ARROW KEYS TO NAVIGATE • PRESS 1-5 FOR OTHER CHANNELS ⚠️
        </div>
      </motion.div>
    </div>
  );
};

export default Channel3;

