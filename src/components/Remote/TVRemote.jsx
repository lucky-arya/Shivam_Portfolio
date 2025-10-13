import React, { useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useTVContext } from '../../context/TVContext';
import { useChannelSwitcher } from '../../hooks/useChannelSwitcher';

const TVRemote = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [size, setSize] = useState('small'); // small, medium, large
  const { state, togglePower, setVolume, toggleMute, toggleScreenMode, sendDirectionalInput, toggleCRTEffects, navigateInteractive } = useTVContext();
  const { handleChannelSwitch, goToChannel } = useChannelSwitcher();
  const dragControls = useDragControls();

  const channels = [1, 2, 3, 4, 5, 6];

  // Check if current channel is a game channel (Channel 0 - Snake Game)
  const isGameChannel = state.currentChannel === 0;

  // Unified D-Pad handler - smart switching between game and navigation
  const handleDPadAction = (direction) => {
    if (isGameChannel) {
      // Send to game
      sendDirectionalInput(direction);
    } else {
      // Send directional input for scrolling and navigation
      sendDirectionalInput(direction);
    }
  };

  // Size configurations - Made smaller
  const sizeClasses = {
    small: {
      container: 'w-28 sm:w-32',
      padding: 'p-1.5',
      spacing: 'space-y-1',
      text: 'text-[6px]',
      button: 'text-[9px] py-0.5 px-1.5',
      gap: 'gap-0.5',
      dpad: 'text-[10px]',
    },
    medium: {
      container: 'w-36 sm:w-40',
      padding: 'p-2',
      spacing: 'space-y-1.5',
      text: 'text-[7px]',
      button: 'text-[10px] py-1 px-2',
      gap: 'gap-1',
      dpad: 'text-xs',
    },
    large: {
      container: 'w-44 sm:w-48',
      padding: 'p-2.5',
      spacing: 'space-y-2',
      text: 'text-[8px]',
      button: 'text-xs py-1.5 px-2.5',
      gap: 'gap-1.5',
      dpad: 'text-sm',
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
          className="fixed right-2 sm:right-4 bottom-4 sm:bottom-8 md:bottom-12 z-50 cursor-move touch-none"
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
              className="text-center mb-1.5 cursor-grab active:cursor-grabbing py-1 -mx-2 px-2 hover:bg-gray-600/30 rounded-xl transition-colors"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="text-gray-500 text-[10px] mb-0.5">⋮⋮</div>
              <div className={`text-gray-400 font-bold ${currentSize.text}`}>RETRO TV</div>
            </div>

            {/* Hide/Show Toggle */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute -left-4 sm:-left-6 md:-left-8 bottom-1/3 bg-gray-700 hover:bg-gray-600 text-white px-1 sm:px-1.5 py-2 sm:py-3 rounded-l-lg text-[10px] sm:text-xs touch-manipulation"
              title="Hide Remote"
            >
              ▶
            </button>

            {/* Power Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={togglePower}
              className={`w-full mb-1.5 rounded-full font-bold touch-manipulation ${currentSize.button} ${
                state.isPoweredOn 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
              } transition-colors shadow-lg`}
            >
              ⏻ {state.isPoweredOn ? 'OFF' : 'ON'}
            </motion.button>

            {/* CRT Effects Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleCRTEffects}
              disabled={!state.isPoweredOn}
              className={`w-full mb-1.5 rounded font-bold touch-manipulation ${currentSize.button} ${
                state.crtEffectsEnabled
                  ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                  : 'bg-gray-600 hover:bg-gray-500 text-white'
              } disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md`}
              title="Toggle CRT Effects"
            >
              📺 {state.crtEffectsEnabled ? 'CRT OFF' : 'CRT ON'}
            </motion.button>

            {/* Home Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => goToChannel(99)}
              disabled={!state.isPoweredOn}
              className={`w-full mb-1.5 rounded font-bold touch-manipulation ${currentSize.button} ${
                state.currentChannel === 99
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                  : 'bg-orange-600 hover:bg-orange-700 text-white'
              } disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md`}
              title="Home Screen"
            >
              🏠 HOME
            </motion.button>

            {/* Screen Mode Toggle (Color / B&W) */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleScreenMode}
              disabled={!state.isPoweredOn}
              className={`w-full mb-1.5 rounded font-bold touch-manipulation ${currentSize.button} transition-colors shadow-md ${
                state.isPoweredOn
                  ? state.screenMode === 'color'
                    ? 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-white hover:opacity-90'
                    : 'bg-gray-500 hover:bg-gray-400 text-white'
                  : 'bg-gray-600 text-gray-400'
              } disabled:opacity-30 disabled:cursor-not-allowed`}
              title={state.screenMode === 'color' ? 'Switch to B&W' : 'Switch to Color'}
            >
              {state.screenMode === 'color' ? 'B&W' : 'Color'}
            </motion.button>

            {/* Universal D-Pad - Smart switching between Game and Navigation */}
            <div className="mb-1.5 bg-gray-800 rounded-lg p-1.5">
              <div className={`${currentSize.text} text-center mb-1 font-bold ${
                isGameChannel ? 'text-purple-400' : 'text-cyan-400'
              }`}>
                {isGameChannel ? '🎮 GAME PAD' : '🧭 NAVIGATE'}
              </div>
              <div className="grid grid-cols-3 gap-0.5">
                {/* Top Row - UP */}
                <div></div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDPadAction('up')}
                  disabled={!state.isPoweredOn}
                  className={`aspect-square rounded font-bold ${currentSize.dpad} disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md touch-manipulation flex items-center justify-center ${
                    isGameChannel 
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white' 
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                  }`}
                  title="Up"
                >
                  ▲
                </motion.button>
                <div></div>

                {/* Middle Row - LEFT, OK/CENTER, RIGHT */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDPadAction('left')}
                  disabled={!state.isPoweredOn}
                  className={`aspect-square rounded font-bold ${currentSize.dpad} disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md touch-manipulation flex items-center justify-center ${
                    isGameChannel 
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white' 
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                  }`}
                  title="Left"
                >
                  ◀
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => isGameChannel ? null : navigateInteractive('ok')}
                  disabled={!state.isPoweredOn || isGameChannel}
                  className={`aspect-square rounded font-bold ${currentSize.text} transition-all shadow-lg touch-manipulation flex items-center justify-center ${
                    isGameChannel 
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-500 text-white'
                  } disabled:opacity-30`}
                  title={isGameChannel ? 'Not used in game' : 'OK / Select'}
                >
                  {isGameChannel ? '●' : 'OK'}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDPadAction('right')}
                  disabled={!state.isPoweredOn}
                  className={`aspect-square rounded font-bold ${currentSize.dpad} disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md touch-manipulation flex items-center justify-center ${
                    isGameChannel 
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white' 
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                  }`}
                  title="Right"
                >
                  ▶
                </motion.button>

                {/* Bottom Row - DOWN */}
                <div></div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDPadAction('down')}
                  disabled={!state.isPoweredOn}
                  className={`aspect-square rounded font-bold ${currentSize.dpad} disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md touch-manipulation flex items-center justify-center ${
                    isGameChannel 
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white' 
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                  }`}
                  title="Down"
                >
                  ▼
                </motion.button>
                <div></div>
              </div>
              <div className={`${currentSize.text} text-center mt-1 text-gray-400`}>
                {isGameChannel ? 'Snake Controls' : 'UI Navigation'}
              </div>
            </div>

            {/* Channel Number Buttons */}
            <div className="grid grid-cols-3 gap-1 mb-1.5">
              {channels.map((ch) => (
                <motion.button
                  key={ch}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToChannel(ch)}
                  disabled={!state.isPoweredOn}
                  className={`aspect-square rounded-lg font-bold ${currentSize.dpad} touch-manipulation ${
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
                className={`aspect-square rounded-lg font-bold ${currentSize.dpad} bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md touch-manipulation`}
                title="Secret Channel"
              >
                0
              </motion.button>
            </div>

            {/* Channel Up/Down */}
            <div className="flex gap-1 mb-1.5">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChannelSwitch('up')}
                disabled={!state.isPoweredOn}
                className={`flex-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold ${currentSize.button} disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md touch-manipulation`}
              >
                CH ▲
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChannelSwitch('down')}
                disabled={!state.isPoweredOn}
                className={`flex-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold ${currentSize.button} disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md touch-manipulation`}
              >
                CH ▼
              </motion.button>
            </div>

            {/* Volume Controls */}
            <div className="space-y-1">
              <div className="flex gap-1">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVolume(state.volume + 0.1)}
                  disabled={!state.isPoweredOn}
                  className={`flex-1 rounded bg-green-600 hover:bg-green-700 text-white font-bold ${currentSize.button} disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md touch-manipulation`}
                >
                  VOL +
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVolume(state.volume - 0.1)}
                  disabled={!state.isPoweredOn}
                  className={`flex-1 rounded bg-green-600 hover:bg-green-700 text-white font-bold ${currentSize.button} disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md touch-manipulation`}
                >
                  VOL -
                </motion.button>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleMute}
                disabled={!state.isPoweredOn}
                className={`w-full rounded font-bold ${currentSize.button} touch-manipulation ${
                  state.isMuted 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-yellow-600 hover:bg-yellow-700'
                } text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md`}
              >
                {state.isMuted ? '🔇' : '🔊'}
              </motion.button>
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
          className="fixed right-0 bottom-8 sm:bottom-12 md:bottom-16 bg-gray-700 hover:bg-gray-600 text-white px-1.5 sm:px-2 md:px-3 py-3 sm:py-4 md:py-6 rounded-l-lg text-[10px] sm:text-xs md:text-sm font-bold shadow-xl z-50 touch-manipulation"
          title="Show Remote"
        >
          <div className="transform -rotate-90 whitespace-nowrap">REMOTE</div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default TVRemote;

