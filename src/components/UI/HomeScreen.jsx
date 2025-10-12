import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTVContext } from '../../context/TVContext';
import { channels } from '../../data/channels';

const HomeScreen = ({ onChannelSelect }) => {
  const { state, switchChannel } = useTVContext();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [time, setTime] = useState(new Date());
  const [focusMode, setFocusMode] = useState('channels'); // 'channels' or 'social'
  const [selectedSocialIndex, setSelectedSocialIndex] = useState(0);
  const channelRefs = useRef([]);
  const socialRefs = useRef([]);
  const containerRef = useRef(null);

  // Filter out error channel 404 and reorder to show Channel 0 at the end
  const availableChannels = channels
    .filter(ch => ch.id !== 404)
    .sort((a, b) => {
      // Channel 0 goes to the end
      if (a.id === 0) return 1;
      if (b.id === 0) return -1;
      // Other channels in normal order
      return a.id - b.id;
    });

  // Social media links
  const socialLinks = [
    { name: 'LinkedIn', icon: 'fa-linkedin', url: 'https://www.linkedin.com/in/your-profile', color: '#0077B5' },
    { name: 'GitHub', icon: 'fa-github', url: 'https://github.com/your-username', color: '#333' },
    { name: 'X (Twitter)', icon: 'fa-x-twitter', url: 'https://twitter.com/your-handle', color: '#1DA1F2' },
    { name: 'Email', icon: 'fa-envelope', url: 'mailto:your.email@example.com', color: '#EA4335' }
  ];

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll to selected element - only when user navigates
  useEffect(() => {
    // Small delay to ensure DOM is ready and animations complete
    const scrollTimer = setTimeout(() => {
      if (focusMode === 'channels' && channelRefs.current[selectedIndex]) {
        const element = channelRefs.current[selectedIndex];
        const container = element.closest('.overflow-y-auto');
        
        if (container && element) {
          const containerRect = container.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          
          // Only scroll if element is not fully visible
          const isVisible = 
            elementRect.top >= containerRect.top &&
            elementRect.bottom <= containerRect.bottom;
          
          if (!isVisible) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
          }
        }
      } else if (focusMode === 'social' && socialRefs.current[selectedSocialIndex]) {
        const element = socialRefs.current[selectedSocialIndex];
        element?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }
    }, 100);

    return () => clearTimeout(scrollTimer);
  }, [selectedIndex, selectedSocialIndex, focusMode]);

  // Handle navigation with remote
  useEffect(() => {
    const handleNavigation = (e) => {
      const action = e.detail;
      
      if (focusMode === 'channels') {
        if (action === 'up') {
          setSelectedIndex(prev => Math.max(0, prev - 1));
        } else if (action === 'down') {
          if (selectedIndex === availableChannels.length - 1) {
            // Move to social links
            setFocusMode('social');
            setSelectedSocialIndex(0);
          } else {
            setSelectedIndex(prev => prev + 1);
          }
        } else if (action === 'ok') {
          handleSelect();
        }
      } else if (focusMode === 'social') {
        if (action === 'up') {
          if (selectedSocialIndex === 0) {
            // Move back to channels
            setFocusMode('channels');
            setSelectedIndex(availableChannels.length - 1);
          } else {
            setSelectedSocialIndex(prev => prev - 1);
          }
        } else if (action === 'down') {
          setSelectedSocialIndex(prev => Math.min(socialLinks.length - 1, prev + 1));
        } else if (action === 'left') {
          setSelectedSocialIndex(prev => Math.max(0, prev - 1));
        } else if (action === 'right') {
          setSelectedSocialIndex(prev => Math.min(socialLinks.length - 1, prev + 1));
        } else if (action === 'ok') {
          handleSocialClick(socialLinks[selectedSocialIndex].url);
        }
      }
    };

    // Listen to both remoteNavigation and remoteDirectionalInput events
    window.addEventListener('remoteNavigation', handleNavigation);
    window.addEventListener('remoteDirectionalInput', handleNavigation);
    return () => {
      window.removeEventListener('remoteNavigation', handleNavigation);
      window.removeEventListener('remoteDirectionalInput', handleNavigation);
    };
  }, [selectedIndex, selectedSocialIndex, focusMode, availableChannels.length, socialLinks.length]);

  // Handle keyboard navigation - with higher priority
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only handle if we're on the home screen (channel 99)
      if (state.currentChannel !== 99) return;

      // Arrow Up/Down for navigation within screen
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (focusMode === 'channels') {
          setSelectedIndex(prev => Math.max(0, prev - 1));
        } else if (focusMode === 'social') {
          if (selectedSocialIndex === 0) {
            setFocusMode('channels');
            setSelectedIndex(availableChannels.length - 1);
          } else {
            setSelectedSocialIndex(prev => prev - 1);
          }
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (focusMode === 'channels') {
          if (selectedIndex === availableChannels.length - 1) {
            setFocusMode('social');
            setSelectedSocialIndex(0);
          } else {
            setSelectedIndex(prev => prev + 1);
          }
        } else if (focusMode === 'social') {
          setSelectedSocialIndex(prev => Math.min(socialLinks.length - 1, prev + 1));
        }
      } 
      // Arrow Left/Right for channel switching
      else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        // Switch to previous channel (handle it locally or let global handler do it)
        if (focusMode === 'social') {
          // In social mode, left/right navigates social icons
          setSelectedSocialIndex(prev => Math.max(0, prev - 1));
        } else {
          // In channels mode, switch to previous channel
          if (state.currentChannel > 0) {
            switchChannel(state.currentChannel - 1);
          }
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (focusMode === 'social') {
          // In social mode, left/right navigates social icons
          setSelectedSocialIndex(prev => Math.min(socialLinks.length - 1, prev + 1));
        } else {
          // In channels mode, switch to next channel
          if (state.currentChannel < 5) {
            switchChannel(state.currentChannel + 1);
          }
        }
      } 
      // Enter to select
      else if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (focusMode === 'channels') {
          handleSelect();
        } else if (focusMode === 'social') {
          handleSocialClick(socialLinks[selectedSocialIndex].url);
        }
      }
    };

    // Use capture phase to handle events before other listeners
    window.addEventListener('keydown', handleKeyPress, true);
    return () => window.removeEventListener('keydown', handleKeyPress, true);
  }, [selectedIndex, selectedSocialIndex, focusMode, availableChannels.length, socialLinks.length, state.currentChannel, switchChannel]);

  const handleSelect = () => {
    const selected = availableChannels[selectedIndex];
    if (selected && onChannelSelect) {
      onChannelSelect(selected.id);
    }
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const formatTime = () => {
    return time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = () => {
    return time.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-y-auto overflow-x-hidden scroll-smooth"
    >
      <div className="min-h-full flex flex-col justify-start p-2 sm:p-3 md:p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-5xl mx-auto"
        >
          {/* Header - Compact */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-3 sm:mb-4"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--crt-green)] mb-1 sm:mb-2 drop-shadow-[0_0_20px_rgba(0,255,65,0.8)] leading-tight">
              📺 CHANNEL GUIDE 📺
            </h1>
            <div className="text-sm sm:text-base text-yellow-400 font-bold mb-1">
              Select Your Channel
            </div>
            <div className="text-xs sm:text-sm text-gray-300">
              {formatTime()} • {formatDate()}
            </div>
          </motion.div>

          {/* Channel List - No internal scroll */}
          <div className="bg-black/40 border-2 sm:border-3 border-[var(--crt-green)] rounded-lg p-2 sm:p-3 md:p-4 backdrop-blur-sm shadow-[0_0_30px_rgba(0,255,65,0.3)]">
            <div className="space-y-2 sm:space-y-3">
              {availableChannels.map((channel, index) => (
              <motion.div
                key={channel.id}
                ref={el => channelRefs.current[index] = el}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05 * index }}
                onClick={() => {
                  setSelectedIndex(index);
                  handleSelect();
                }}
                onMouseEnter={() => {
                  setFocusMode('channels');
                  setSelectedIndex(index);
                }}
                className={`relative cursor-pointer transition-all duration-200 ${
                  selectedIndex === index && focusMode === 'channels'
                    ? 'scale-105'
                    : 'scale-100 opacity-70 hover:opacity-100'
                }`}
              >
                <div className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border-2 transition-all ${
                  selectedIndex === index && focusMode === 'channels'
                    ? 'bg-[var(--crt-green)] border-yellow-400 text-black shadow-[0_0_20px_rgba(0,255,65,0.8)]'
                    : 'bg-gray-800/50 border-gray-600 text-white hover:border-gray-400'
                }`}>
                  {/* Channel Number */}
                  <div className={`flex-shrink-0 w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 flex items-center justify-center rounded-lg font-black text-xl sm:text-2xl md:text-3xl ${
                    selectedIndex === index && focusMode === 'channels'
                      ? 'bg-black text-[var(--crt-green)]'
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {channel.id}
                  </div>

                  {/* Channel Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-black text-sm sm:text-base md:text-lg mb-0.5 truncate ${
                      selectedIndex === index && focusMode === 'channels' ? 'text-black' : 'text-white'
                    }`}>
                      {channel.title}
                    </h3>
                    <p className={`text-xs sm:text-sm truncate ${
                      selectedIndex === index && focusMode === 'channels' ? 'text-gray-800' : 'text-gray-400'
                    }`}>
                      {channel.subtitle}
                    </p>
                  </div>

                  {/* Selection Indicator */}
                  {selectedIndex === index && focusMode === 'channels' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex-shrink-0"
                    >
                      <div className="bg-black text-yellow-400 px-2 py-1 sm:px-3 sm:py-1 rounded-full font-bold text-xs sm:text-sm animate-pulse">
                        ▶ SELECT
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Channel Description - Shows on selection */}
                <AnimatePresence>
                  {selectedIndex === index && focusMode === 'channels' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-gray-900/80 border-2 border-yellow-400 rounded-b-lg p-2 sm:p-3 -mt-1 ml-2 sm:ml-3">
                        <p className="text-xs sm:text-sm text-gray-300">
                          {channel.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              ))}
            </div>
          </div>

          {/* Social Media Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 sm:mt-6"
          >
            <div className="bg-black/40 border-2 border-purple-500 rounded-lg p-3 sm:p-4 backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-purple-400 mb-3 text-center drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
                🌐 CONNECT WITH ME
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={social.name}
                    ref={el => socialRefs.current[index] = el}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                    onClick={() => handleSocialClick(social.url)}
                    onMouseEnter={() => {
                      setFocusMode('social');
                      setSelectedSocialIndex(index);
                    }}
                    className={`relative p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      focusMode === 'social' && selectedSocialIndex === index
                        ? 'bg-purple-500 border-yellow-400 scale-110 shadow-[0_0_20px_rgba(168,85,247,0.8)]'
                        : 'bg-gray-800/50 border-gray-600 hover:border-purple-400 hover:scale-105'
                    }`}
                  >
                    {/* Icon */}
                    <div className={`text-3xl sm:text-4xl mb-2 ${
                      focusMode === 'social' && selectedSocialIndex === index
                        ? 'text-black'
                        : 'text-white'
                    }`}>
                      <i className={`fa-brands ${social.icon}`} style={{ 
                        color: focusMode === 'social' && selectedSocialIndex === index ? 'black' : social.color 
                      }}></i>
                    </div>
                    
                    {/* Name */}
                    <div className={`font-bold text-xs sm:text-sm ${
                      focusMode === 'social' && selectedSocialIndex === index
                        ? 'text-black'
                        : 'text-white'
                    }`}>
                      {social.name}
                    </div>

                    {/* Selection indicator */}
                    {focusMode === 'social' && selectedSocialIndex === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-yellow-400 text-black w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs animate-pulse"
                      >
                        ✓
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Controls Help */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 sm:mt-6 text-center"
          >
            <div className="bg-yellow-400 text-black inline-block px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm border-2 border-black shadow-lg">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                <span>🎮 ↑↓ Scroll</span>
                <span>•</span>
                <span>←→ Change Ch</span>
                <span>•</span>
                <span>⏎ Select</span>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-3 sm:mt-4 mb-2 text-center text-xs sm:text-sm text-gray-400"
          >
            <p>Retro CRT TV Portfolio 📺✨</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};export default HomeScreen;
