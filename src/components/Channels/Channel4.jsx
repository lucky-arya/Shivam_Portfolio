import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Channel4 = () => {
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

  const experiences = [
    {
      role: "Web Developer Intern",
      company: "Cyber Secured India",
      period: "April 2025 - October 2025",
      achievements: [
        "Led team of 5 developers on major product launch",
        "Improved application performance by 40%",
        "Implemented CI/CD pipeline reducing deployment time by 60%"
      ]
    },
    {
      role: "Web Developer ",
      company: "Booster Creative Hub",
      period: "2025 - 2025",
      achievements: [
        "Built 10+ production applications",
        "Mentored junior developers",
        "Introduced modern testing practices"
      ]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Computer Science",
      school: "MGMCOET, NOIDA",
      year: "2023-2027",
      honors: "Graduated with Honours"
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-gradient-to-b from-red-900 via-gray-900 to-black p-4 sm:p-6 md:p-8 overflow-auto scroll-smooth"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        {/* News Header */}
        <div className="bg-red-600 text-white p-3 sm:p-4 mb-4 sm:mb-6 border-b-2 sm:border-b-4 border-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">📰 BREAKING NEWS</h1>
              <p className="text-sm sm:text-base md:text-xl mt-1">DEVELOPER PROFILE • LIVE FROM THE RESUME CENTER</p>
            </div>
            <div className="text-right text-sm sm:text-base">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold">🔴 LIVE</div>
              <div className="text-xs sm:text-sm">{new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        {/* News Ticker */}
        <div className="bg-yellow-400 text-black p-1.5 sm:p-2 mb-4 sm:mb-6 overflow-hidden">
          <motion.div
            animate={{ x: [1000, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap text-sm sm:text-base md:text-xl font-bold"
          >
            ⚡ BREAKING: Local developer creates amazing portfolio using retro TV concept • 
            Skills include React, TypeScript, Node.js and more • 
            Available for hire • Contact now for collaboration opportunities ⚡
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Experience Section */}
          <div>
            <div className="bg-white text-black p-3 sm:p-4 mb-3 sm:mb-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black border-b-2 sm:border-b-4 border-black pb-2 mb-3 sm:mb-4">
                💼 WORK EXPERIENCE
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="border-l-2 sm:border-l-4 border-red-600 pl-3 sm:pl-4"
                  >
                    <h3 className="text-base sm:text-lg md:text-xl font-bold">{exp.role}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-red-600 font-semibold">{exp.company}</p>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">{exp.period}</p>
                    <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <div className="bg-white text-black p-3 sm:p-4 mb-3 sm:mb-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black border-b-2 sm:border-b-4 border-black pb-2 mb-3 sm:mb-4">
                🎓 EDUCATION
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="border-l-2 sm:border-l-4 border-blue-600 pl-3 sm:pl-4"
                  >
                    <h3 className="text-base sm:text-lg md:text-xl font-bold">{edu.degree}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-blue-600 font-semibold">{edu.school}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{edu.year}</p>
                    <p className="text-xs sm:text-sm font-semibold mt-1">{edu.honors}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-green-500 text-white p-3 sm:p-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black mb-2 sm:mb-3">🏆 CERTIFICATIONS</h2>
              <ul className="space-y-1.5 sm:space-y-2 font-semibold text-sm sm:text-base">
                <li>
                  <a 
                    href="/Resume/AWS-Certified-Developer.pdf" 
                    download="AWS-Certified-Developer.pdf"
                    className="hover:underline hover:text-yellow-300 transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    ✓ AWS Certified Developer <span className="text-xs">📄</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/Resume/React-Advanced-Certification.pdf" 
                    download="React-Advanced-Certification.pdf"
                    className="hover:underline hover:text-yellow-300 transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    ✓ React Advanced Certification <span className="text-xs">📄</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/Resume/Full-Stack-Web-Development.pdf" 
                    download="Full-Stack-Web-Development.pdf"
                    className="hover:underline hover:text-yellow-300 transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    ✓ Full-Stack Web Development <span className="text-xs">📄</span>
                  </a>
                </li>
              </ul>
              <p className="text-xs mt-2 opacity-80">💡 Click to download certificate PDFs</p>
            </div>
          </div>
        </div>

        {/* Download Resume CTA */}
        <div className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 text-center rounded-lg border-2 sm:border-4 border-white">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 sm:mb-4">📄 DOWNLOAD FULL RESUME</h3>
          <a 
            href="/Resume/resume shivam.pdf" 
            download="Shivam_Kumar_Resume.pdf"
            className="inline-block bg-white text-black font-black text-base sm:text-lg md:text-xl px-6 sm:px-8 py-2 sm:py-3 rounded hover:bg-yellow-400 transition-colors transform hover:scale-105 touch-manipulation cursor-pointer"
          >
            📥 DOWNLOAD PDF
          </a>
          <p className="text-sm sm:text-base mt-3 opacity-90">
            Click to download my complete resume in PDF format
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Channel4;

