import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Responsive grid size based on screen - optimized for better visibility
const getGridSize = () => {
  if (typeof window === 'undefined') return 25;
  const width = window.innerWidth;
  if (width < 480) return 15; // Mobile
  if (width < 768) return 20; // Tablet
  if (width < 1024) return 22; // Small desktop
  return 25; // Large desktop
};

const getCellSize = () => {
  if (typeof window === 'undefined') return 20;
  const width = window.innerWidth;
  if (width < 480) return 18; // Mobile
  if (width < 768) return 20; // Tablet
  if (width < 1024) return 22; // Small desktop
  return 24; // Large desktop
};

const INITIAL_SNAKE = [{ x: 7, y: 7 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const BASE_SPEED = 150;
const SPEED_INCREMENT = 5; // Speed increases as score goes up
const MAX_SPEED = 80;



const SnakeGame = () => {
  const [gridSize, setGridSize] = useState(getGridSize());
  const [cellSize, setCellSize] = useState(getCellSize());
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 12, y: 12 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [touchStart, setTouchStart] = useState(null);
  const [gameSpeed, setGameSpeed] = useState(BASE_SPEED);
  const [showControls, setShowControls] = useState(true);
  
  const directionRef = useRef(direction);
  const gameLoopRef = useRef(null);

  // Update grid size on resize with debounce
  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setGridSize(getGridSize());
        setCellSize(getCellSize());
      }, 200);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Save high score to localStorage
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);

  // Update game speed based on score
  useEffect(() => {
    const newSpeed = Math.max(MAX_SPEED, BASE_SPEED - Math.floor(score / 50) * SPEED_INCREMENT);
    setGameSpeed(newSpeed);
  }, [score]);

  // Generate random food position
  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  }, [gridSize]);

  // Toggle pause
  const togglePause = useCallback(() => {
    if (!gameOver && isPlaying) {
      setIsPaused(prev => !prev);
    }
  }, [gameOver, isPlaying]);

  // Reset game
  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood(generateFood());
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
    setIsPaused(false);
    setGameSpeed(BASE_SPEED);
    setShowControls(false);
  }, [generateFood]);

  // Handle keyboard input - Enhanced with pause functionality
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Use ENTER to start/restart game
      if (e.key === 'Enter' && (!isPlaying || gameOver)) {
        e.preventDefault();
        resetGame();
        return;
      }

      // Use SPACE to pause/unpause
      if (e.key === ' ' && isPlaying && !gameOver) {
        e.preventDefault();
        togglePause();
        return;
      }

      // Use ESC to pause
      if (e.key === 'Escape' && isPlaying && !gameOver) {
        e.preventDefault();
        togglePause();
        return;
      }

      if (!isPlaying || gameOver || isPaused) return;

      const newDirection = { ...directionRef.current };

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (directionRef.current.y === 0) {
            newDirection.x = 0;
            newDirection.y = -1;
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (directionRef.current.y === 0) {
            newDirection.x = 0;
            newDirection.y = 1;
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (directionRef.current.x === 0) {
            newDirection.x = -1;
            newDirection.y = 0;
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (directionRef.current.x === 0) {
            newDirection.x = 1;
            newDirection.y = 0;
          }
          break;
      }

      directionRef.current = newDirection;
      setDirection(newDirection);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, gameOver, isPaused, resetGame, togglePause]);

  // Handle remote directional input
  useEffect(() => {
    const handleRemoteInput = (e) => {
      const customEvent = e;
      const direction = customEvent.detail;

      if (!isPlaying || gameOver || isPaused) return;

      const newDirection = { ...directionRef.current };

      switch (direction) {
        case 'up':
          if (directionRef.current.y === 0) {
            newDirection.x = 0;
            newDirection.y = -1;
          }
          break;
        case 'down':
          if (directionRef.current.y === 0) {
            newDirection.x = 0;
            newDirection.y = 1;
          }
          break;
        case 'left':
          if (directionRef.current.x === 0) {
            newDirection.x = -1;
            newDirection.y = 0;
          }
          break;
        case 'right':
          if (directionRef.current.x === 0) {
            newDirection.x = 1;
            newDirection.y = 0;
          }
          break;
      }

      directionRef.current = newDirection;
      setDirection(newDirection);
    };

    window.addEventListener('remoteDirectionalInput', handleRemoteInput);
    return () => window.removeEventListener('remoteDirectionalInput', handleRemoteInput);
  }, [isPlaying, gameOver, isPaused]);

  // Handle touch controls for mobile with double-tap to pause
  const [lastTap, setLastTap] = useState(0);
  
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const currentTime = new Date().getTime();
    const tapGap = currentTime - lastTap;
    
    // Double tap to pause
    if (tapGap < 300 && tapGap > 0 && isPlaying && !gameOver) {
      togglePause();
      setLastTap(0);
      return;
    }
    
    setLastTap(currentTime);
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !isPlaying || gameOver || isPaused) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const minSwipeDistance = 30;

    if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
      setTouchStart(null);
      return;
    }

    const newDirection = { ...directionRef.current };

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 0 && directionRef.current.x === 0) {
        // Swipe right
        newDirection.x = 1;
        newDirection.y = 0;
      } else if (deltaX < 0 && directionRef.current.x === 0) {
        // Swipe left
        newDirection.x = -1;
        newDirection.y = 0;
      }
    } else {
      // Vertical swipe
      if (deltaY > 0 && directionRef.current.y === 0) {
        // Swipe down
        newDirection.x = 0;
        newDirection.y = 1;
      } else if (deltaY < 0 && directionRef.current.y === 0) {
        // Swipe up
        newDirection.x = 0;
        newDirection.y = -1;
      }
    }

    directionRef.current = newDirection;
    setDirection(newDirection);
    setTouchStart(null);
  };

  // Game loop with improved performance
  useEffect(() => {
    if (!isPlaying || gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        // Move head
        head.x += directionRef.current.x;
        head.y += directionRef.current.y;

        // Check wall collision
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        // Check self collision
        if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        newSnake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore((prev) => prev + 10);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, gameSpeed);

    gameLoopRef.current = gameLoop;
    return () => clearInterval(gameLoop);
  }, [isPlaying, gameOver, isPaused, food, score, generateFood, gridSize, gameSpeed]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-2 sm:px-4">
      {/* Enhanced Score Dashboard */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl mb-4 sm:mb-6"
      >
        <div className="grid grid-cols-3 gap-2 sm:gap-4 font-mono">
          {/* Current Score */}
          <motion.div 
            className="bg-gradient-to-br from-green-600 to-green-800 border-4 border-green-400 rounded-lg p-2 sm:p-4 text-center shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-xs sm:text-sm text-green-200 font-bold">SCORE</div>
            <motion.div 
              key={score}
              initial={{ scale: 1.5, color: '#fbbf24' }}
              animate={{ scale: 1, color: '#ffffff' }}
              className="text-2xl sm:text-4xl font-black text-white"
            >
              {score}
            </motion.div>
          </motion.div>

          {/* High Score */}
          <motion.div 
            className="bg-gradient-to-br from-yellow-600 to-yellow-800 border-4 border-yellow-400 rounded-lg p-2 sm:p-4 text-center shadow-[0_0_20px_rgba(234,179,8,0.5)]"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-xs sm:text-sm text-yellow-200 font-bold">HIGH SCORE</div>
            <div className="text-2xl sm:text-4xl font-black text-white flex items-center justify-center gap-1">
              👑 {highScore}
            </div>
          </motion.div>

          {/* Snake Length */}
          <motion.div 
            className="bg-gradient-to-br from-blue-600 to-blue-800 border-4 border-blue-400 rounded-lg p-2 sm:p-4 text-center shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-xs sm:text-sm text-blue-200 font-bold">LENGTH</div>
            <div className="text-2xl sm:text-4xl font-black text-white">
              {snake.length}
            </div>
          </motion.div>
        </div>

        {/* Speed Indicator */}
        {isPlaying && !gameOver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 sm:mt-3 bg-purple-900/50 border-2 border-purple-400 rounded-lg p-2 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-purple-200">
              <span className="font-bold">SPEED:</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: i < Math.floor((BASE_SPEED - gameSpeed) / 15) + 1 ? 1 : 0.5,
                      backgroundColor: i < Math.floor((BASE_SPEED - gameSpeed) / 15) + 1 ? '#a855f7' : '#4c1d95'
                    }}
                    className="w-4 h-4 sm:w-6 sm:h-6 rounded"
                  />
                ))}
              </div>
              <span className="font-mono">{Math.round(1000 / gameSpeed * 60)} FPS</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Professional Game Board */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <div
          className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-4 sm:border-8 border-[var(--crt-green)] rounded-lg shadow-[0_0_30px_var(--crt-green),inset_0_0_30px_rgba(0,0,0,0.5)] mx-auto touch-none overflow-hidden"
          style={{
            width: gridSize * cellSize,
            height: gridSize * cellSize,
            maxWidth: '100%',
            aspectRatio: '1/1',
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Grid Background for better visibility */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(gridSize)].map((_, i) => (
              <div key={`row-${i}`} className="flex">
                {[...Array(gridSize)].map((_, j) => (
                  <div
                    key={`cell-${i}-${j}`}
                    className="border border-green-500/20"
                    style={{
                      width: cellSize,
                      height: cellSize,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Snake with gradient effect */}
          <AnimatePresence>
            {snake.map((segment, index) => (
              <motion.div
                key={`${segment.x}-${segment.y}-${index}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute rounded-sm"
                style={{
                  width: cellSize - 2,
                  height: cellSize - 2,
                  left: segment.x * cellSize + 1,
                  top: segment.y * cellSize + 1,
                  background: index === 0 
                    ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                    : `linear-gradient(135deg, #22c55e ${100 - (index / snake.length) * 50}%, #15803d ${100 - (index / snake.length) * 30}%)`,
                  boxShadow: index === 0 
                    ? '0 0 20px rgba(34, 197, 94, 0.8), inset 0 0 10px rgba(255,255,255,0.3)' 
                    : '0 0 10px rgba(34, 197, 94, 0.5)',
                  border: index === 0 ? '2px solid #86efac' : '1px solid #16a34a',
                  zIndex: snake.length - index,
                }}
              >
                {index === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-xs">
                    {directionRef.current.x === 1 && '▶'}
                    {directionRef.current.x === -1 && '◀'}
                    {directionRef.current.y === 1 && '▼'}
                    {directionRef.current.y === -1 && '▲'}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Animated Food */}
          <motion.div
            key={`${food.x}-${food.y}`}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bg-gradient-to-br from-red-400 to-red-600 rounded-full"
            style={{
              width: cellSize - 4,
              height: cellSize - 4,
              left: food.x * cellSize + 2,
              top: food.y * cellSize + 2,
              boxShadow: '0 0 20px #ef4444, inset 0 0 10px rgba(255,255,255,0.5)',
              border: '2px solid #fca5a5',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
              🍎
            </div>
          </motion.div>

          {/* Pause Overlay */}
          <AnimatePresence>
            {isPaused && !gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-yellow-400 text-4xl sm:text-6xl font-black mb-4"
                  >
                    ⏸️ PAUSED
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePause}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-8 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg text-lg"
                  >
                    ▶️ RESUME
                  </motion.button>
                  <div className="text-white text-sm mt-4">
                    Press SPACE or ESC to resume
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game Over Overlay - Enhanced */}
          <AnimatePresence>
            {gameOver && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 bg-gradient-to-br from-red-900/95 to-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              >
                <div className="text-center max-w-md">
                  <motion.div
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    className="text-red-400 text-3xl sm:text-5xl font-black mb-4 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]"
                  >
                    💀 GAME OVER! 💀
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-black/50 border-4 border-yellow-400 rounded-lg p-4 mb-4"
                  >
                    <div className="text-yellow-400 text-xl sm:text-2xl font-bold mb-2">Final Stats</div>
                    <div className="grid grid-cols-2 gap-4 text-white">
                      <div>
                        <div className="text-sm text-gray-400">Score</div>
                        <div className="text-2xl font-black">{score}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Length</div>
                        <div className="text-2xl font-black">{snake.length}</div>
                      </div>
                    </div>
                    {score === highScore && score > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-3 text-yellow-400 text-lg font-bold"
                      >
                        🎉 NEW HIGH SCORE! 🎉
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetGame}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-8 py-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-[0_0_20px_rgba(34,197,94,0.5)] text-xl mb-3 w-full"
                  >
                    🔄 PLAY AGAIN
                  </motion.button>
                  
                  <div className="text-gray-400 text-sm">Press ENTER to restart</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Start Screen - Professional */}
          <AnimatePresence>
            {!isPlaying && !gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-black/95 to-emerald-900/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              >
                <div className="text-center max-w-md">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      textShadow: [
                        '0 0 20px #22c55e',
                        '0 0 40px #22c55e',
                        '0 0 20px #22c55e'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[var(--crt-green)] text-3xl sm:text-5xl font-black mb-6 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]"
                  >
                    🐍 SNAKE GAME 🐍
                  </motion.div>

                  {showControls && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="bg-black/70 border-4 border-cyan-400 rounded-lg p-4 mb-6 text-left"
                    >
                      <div className="text-cyan-400 text-lg font-bold mb-3 text-center">🎮 CONTROLS</div>
                      <div className="space-y-2 text-sm text-white">
                        <div className="flex items-center gap-2">
                          <span className="bg-green-600 px-2 py-1 rounded font-bold">⌨️</span>
                          <span>Arrow Keys / WASD</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-yellow-600 px-2 py-1 rounded font-bold">⏸️</span>
                          <span>SPACE / ESC to Pause</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-600 px-2 py-1 rounded font-bold">📱</span>
                          <span>Swipe to control on mobile</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-purple-600 px-2 py-1 rounded font-bold">👆</span>
                          <span>Double-tap to pause</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetGame}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-10 py-5 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-[0_0_30px_rgba(34,197,94,0.6)] text-2xl mb-3 w-full"
                  >
                    🚀 START GAME
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowControls(!showControls)}
                    className="text-cyan-400 text-sm underline hover:text-cyan-300 transition-colors"
                  >
                    {showControls ? '🔼 Hide Controls' : '🔽 Show Controls'}
                  </motion.button>
                  
                  <div className="text-gray-400 text-sm mt-3">Press ENTER to start</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Game Info Panel */}
      {isPlaying && !gameOver && !isPaused && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-4 w-full max-w-2xl"
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-gray-600 rounded-lg p-3 sm:p-4">
            <div className="flex flex-wrap justify-between items-center gap-3 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold">💡 TIP:</span>
                <span>Speed increases every 50 points!</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePause}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-4 py-2 rounded transition-colors"
              >
                ⏸️ PAUSE
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SnakeGame;

