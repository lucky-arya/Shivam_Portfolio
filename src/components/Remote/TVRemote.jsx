import React, { useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useTVContext } from '../../context/TVContext';
import { useChannelSwitcher } from '../../hooks/useChannelSwitcher';

const TVRemote = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [size, setSize] = useState('small'); // small, medium, large
  const { state, togglePower, setVolume, toggleMute, toggleScreenMode, sendDirectionalInput } = useTVContext();
  const { handleChannelSwitch, goToChannel } = useChannelSwitcher();
  const dragControls = useDragControls();

  const channels = [1, 2, 3, 4, 5];

  // Size configurations
  const sizeClasses = {
    small: {
      container: 'w-32 sm:w-36',
      padding: 'p-2',
      spacing: 'space-y-1.5',
      text: 'text-[6px] sm:text-[7px]',
      button: 'text-xs py-1 px-2',
      gap: 'gap-0.5',
    },
    medium: {
      container: 'w-44 sm:w-52',
      padding: 'p-2.5 sm:p-3',
      spacing: 'space-y-2 sm:space-y-2.5',
      text: 'text-[7px] sm:text-[8px]',
      button: 'text-sm py-1.5 px-3',
      gap: 'gap-1 sm:gap-1.5',
    },
    large: {
      container: 'w-56 sm:w-64',
      padding: 'p-3 sm:p-4',
      spacing: 'space-y-2.5 sm:space-y-3',
      text: 'text-[8px] sm:text-[9px]',
      button: 'text-base py-2 px-4',
      gap: 'gap-1.5 sm:gap-2',
    },
  };

  const currentSize = sizeClasses[size];

  const cycleSize = () => {
    const sizes = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(size);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setSize(sizes[nextIndex]);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          drag
          dragControls={dragControls}
          dragMomentum={false}
          dragElastic={0.2}
          dragConstraints={{
            top: -400,
            bottom: 400,
            left: -600,
            right: 600,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 cursor-move touch-none"
          whileHover={{ scale: 1.02 }}
          whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
        >
          {/* Remote Control */}
          <div className={`bg-gradient-to-b from-gray-800 via-gray-700 to-gray-900 border-2 sm:border-4 border-gray-600 rounded-2xl sm:rounded-3xl shadow-2xl select-none touch-manipulation ${currentSize.container} ${currentSize.padding} ${currentSize.spacing}`}>
            
            {/* Size Toggle Button */}
            <button
              onClick={cycleSize}
              className="absolute -top-2 sm:-top-3 right-2 bg-purple-600 hover:bg-purple-500 text-white px-2 py-1 rounded-full text-[8px] sm:text-[9px] font-bold shadow-lg touch-manipulation z-10"
              title="Change Size"
            >
              {size.toUpperCase()[0]}
            </button>

            {/* Remote Header - Drag Handle */}
            <div 
              className="text-center mb-2 sm:mb-3 cursor-grab active:cursor-grabbing py-1.5 sm:py-2 -mx-2 px-2 hover:bg-gray-600/30 rounded-xl transition-colors"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="text-gray-500 text-xs mb-0.5 sm:mb-1">⋮⋮</div>
              <div className={`text-gray-400 font-bold ${currentSize.text}`}>RETRO TV</div>
              <div className={`text-gray-500 ${currentSize.text}`}>MODEL: CRT-2025</div>
            </div>

            {/* Hide/Show Toggle */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute -left-4 sm:-left-6 md:-left-8 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white px-1 sm:px-1.5 py-2 sm:py-3 rounded-l-lg text-[10px] sm:text-xs touch-manipulation"
              title="Hide Remote"
            >
              ◀
            </button>

            {/* Power Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={togglePower}
              className={`w-full mb-2 sm:mb-3 rounded-full font-bold touch-manipulation ${currentSize.button} ${
                state.isPoweredOn 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
              } transition-colors shadow-lg`}
            >
              ⏻ {state.isPoweredOn ? 'POWER OFF' : 'POWER ON'}
            </motion.button>

            {/* Screen Mode Toggle (Color / B&W) */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleScreenMode}
              disabled={!state.isPoweredOn}
              className={`w-full mb-2 sm:mb-3 py-1 sm:py-1.5 md:py-2 rounded font-bold text-[10px] sm:text-xs md:text-sm touch-manipulation transition-colors shadow-md ${
                state.isPoweredOn
                  ? state.screenMode === 'color'
                    ? 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-white hover:opacity-90'
                    : 'bg-gray-500 hover:bg-gray-400 text-white'
                  : 'bg-gray-600 text-gray-400'
              } disabled:opacity-30 disabled:cursor-not-allowed`}
              title={state.screenMode === 'color' ? 'Switch to B&W' : 'Switch to Color'}
            >
              {state.screenMode === 'color' ? '🎨 COLOR' : '⚫ B&W'}
            </motion.button>

            {/* Directional Pad (D-Pad) for Games */}
            <div className="mb-2 sm:mb-3 bg-gray-800 rounded-lg p-1.5 sm:p-2 md:p-3">
              <div className="text-[8px] sm:text-[10px] text-gray-400 text-center mb-1 sm:mb-1.5 font-bold">
                D-PAD (GAMES)
              </div>
              <div className="grid grid-cols-3 gap-0.5 sm:gap-1">
                {/* Top Row - UP */}
                <div></div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => sendDirectionalInput('up')}
                  disabled={!state.isPoweredOn}
                  className="aspect-square rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm sm:text-base md:text-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md touch-manipulation flex items-center justify-center"
                  title="Up"
                >
                  ▲
                </motion.button>
                <div></div>

                {/* Middle Row - LEFT and RIGHT */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => sendDirectionalInput('left')}
                  disabled={!state.isPoweredOn}
                  className="aspect-square rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm sm:text-base md:text-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md touch-manipulation flex items-center justify-center"
                  title="Left"
                >
                  ◀
                </motion.button>
                <div className="aspect-square rounded bg-gray-700 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-indigo-400"></div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => sendDirectionalInput('right')}
                  disabled={!state.isPoweredOn}
                  className="aspect-square rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm sm:text-base md:text-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md touch-manipulation flex items-center justify-center"
                  title="Right"
                >
                  ▶
                </motion.button>

                {/* Bottom Row - DOWN */}
                <div></div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => sendDirectionalInput('down')}
                  disabled={!state.isPoweredOn}
                  className="aspect-square rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm sm:text-base md:text-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md touch-manipulation flex items-center justify-center"
                  title="Down"
                >
                  ▼
                </motion.button>
                <div></div>
              </div>
            </div>

            {/* Channel Number Buttons */}
            <div className="grid grid-cols-3 gap-1 sm:gap-1.5 md:gap-2 mb-2 sm:mb-3">
              {channels.map((ch) => (
                <motion.button
                  key={ch}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToChannel(ch)}
                  disabled={!state.isPoweredOn}
                  className={`aspect-square rounded-lg font-bold text-sm sm:text-base md:text-lg touch-manipulation ${
                    state.currentChannel === ch && state.isPoweredOn
                      ? 'bg-[var(--crt-green)] text-black'
                      : 'bg-gray-600 hover:bg-gray-500 text-white'
                  } disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md`}
                >
                  {ch}
                </motion.button>
              ))}
              
              {/* Channel 0 (Secret) */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => goToChannel(0)}
                disabled={!state.isPoweredOn}
                className="aspect-square rounded-lg font-bold text-sm sm:text-base md:text-lg bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md touch-manipulation"
                title="Secret Channel"
              >
                0
              </motion.button>
            </div>

            {/* Channel Up/Down */}
            <div className="flex gap-1 sm:gap-1.5 md:gap-2 mb-2 sm:mb-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChannelSwitch('up')}
                disabled={!state.isPoweredOn}
                className="flex-1 py-1 sm:py-1.5 md:py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] sm:text-xs md:text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md touch-manipulation"
              >
                CH ▲
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChannelSwitch('down')}
                disabled={!state.isPoweredOn}
                className="flex-1 py-1 sm:py-1.5 md:py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] sm:text-xs md:text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md touch-manipulation"
              >
                CH ▼
              </motion.button>
            </div>

            {/* Volume Controls */}
            <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
              <div className="flex gap-1 sm:gap-1.5 md:gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVolume(state.volume + 0.1)}
                  disabled={!state.isPoweredOn}
                  className="flex-1 py-1 sm:py-1.5 md:py-2 rounded bg-green-600 hover:bg-green-700 text-white font-bold text-[10px] sm:text-xs md:text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md touch-manipulation"
                >
                  VOL +
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVolume(state.volume - 0.1)}
                  disabled={!state.isPoweredOn}
                  className="flex-1 py-1 sm:py-1.5 md:py-2 rounded bg-green-600 hover:bg-green-700 text-white font-bold text-[10px] sm:text-xs md:text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md touch-manipulation"
                >
                  VOL -
                </motion.button>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleMute}
                disabled={!state.isPoweredOn}
                className={`w-full py-1 sm:py-1.5 md:py-2 rounded font-bold text-[10px] sm:text-xs md:text-sm touch-manipulation ${
                  state.isMuted 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-yellow-600 hover:bg-yellow-700'
                } text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md`}
              >
                {state.isMuted ? '🔇 UNMUTE' : '🔊 MUTE'}
              </motion.button>
            </div>

            {/* Remote Footer */}
            <div className="mt-2 sm:mt-3 md:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-gray-600 hidden md:block">
              <div className="text-[9px] md:text-[10px] text-gray-400 text-center leading-tight">
                Keyboard Shortcuts:<br/>
                Space: Power | ↑↓: Channels<br/>
                1-5: Direct | Esc: Mute
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Show Remote Button (when hidden) */}
      {!isVisible && (
        <motion.button
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          onClick={() => setIsVisible(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white px-1.5 sm:px-2 md:px-3 py-3 sm:py-4 md:py-6 rounded-l-lg text-[10px] sm:text-xs md:text-sm font-bold shadow-xl z-50 touch-manipulation"
          title="Show Remote"
        >
          <div className="transform -rotate-90 whitespace-nowrap">REMOTE</div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default TVRemote;

