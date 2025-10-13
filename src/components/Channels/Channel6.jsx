import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faPause, 
  faForward, 
  faBackward, 
  faVolumeUp, 
  faVolumeMute,
  faRandom,
  faRedoAlt
} from '@fortawesome/free-solid-svg-icons';

const Channel6 = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [focusedButton, setFocusedButton] = useState(0);

  // Playlist - Add your music files to public/audio/
  // NOTE: The app will work even if audio files don't exist - it just won't play sound
  const playlist = [
    {
      id: 1,
      title: "Synthwave Dreams",
      artist: "Retro Wave",
      src: "/audio/track1.mp3",
      cover: "🎵"
    },
    {
      id: 2,
      title: "Neon Nights",
      artist: "Digital Sound",
      src: "/audio/track2.mp3",
      cover: "🎸"
    },
    {
      id: 3,
      title: "Cyber Pulse",
      artist: "Electronic Beats",
      src: "/audio/track3.mp3",
      cover: "🎹"
    },
    {
      id: 4,
      title: "Retro Gaming",
      artist: "8-Bit Orchestra",
      src: "/audio/track4.mp3",
      cover: "🎮"
    }
  ];

  const currentTrack = playlist[currentTrackIndex];

  // Helper functions defined before useEffect with useCallback
  const playNext = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  }, [playlist.length]);

  const playRandomTrack = useCallback(() => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * playlist.length);
    } while (randomIndex === currentTrackIndex && playlist.length > 1);
    setCurrentTrackIndex(randomIndex);
    setIsPlaying(true);
  }, [currentTrackIndex, playlist.length]);

  // Update time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else if (isShuffle) {
        playRandomTrack();
      } else {
        playNext();
      }
    };
    
    const handleError = (e) => {
      console.log('Audio loading issue - files may not exist yet');
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [isRepeat, isShuffle, playNext, playRandomTrack]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      const buttons = ['play', 'prev', 'next', 'volume', 'shuffle', 'repeat'];
      
      switch(e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setFocusedButton(prev => (prev - 1 + buttons.length) % buttons.length);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedButton(prev => (prev + 1) % buttons.length);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleButtonAction(buttons[focusedButton]);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [focusedButton, isPlaying]);

  // Remote control support
  useEffect(() => {
    const handleRemoteNav = (e) => {
      const action = e.detail;
      const buttons = ['play', 'prev', 'next', 'volume', 'shuffle', 'repeat'];
      
      if (action === 'up') {
        setFocusedButton(prev => (prev - 1 + buttons.length) % buttons.length);
      } else if (action === 'down') {
        setFocusedButton(prev => (prev + 1) % buttons.length);
      } else if (action === 'ok') {
        handleButtonAction(buttons[focusedButton]);
      }
    };

    window.addEventListener('remoteNavigation', handleRemoteNav);
    window.addEventListener('remoteDirectionalInput', handleRemoteNav);
    return () => {
      window.removeEventListener('remoteNavigation', handleRemoteNav);
      window.removeEventListener('remoteDirectionalInput', handleRemoteNav);
    };
  }, [focusedButton, isPlaying]);

  const handleButtonAction = (button) => {
    switch(button) {
      case 'play':
        togglePlay();
        break;
      case 'prev':
        playPrevious();
        break;
      case 'next':
        playNext();
        break;
      case 'volume':
        toggleMute();
        break;
      case 'shuffle':
        setIsShuffle(prev => !prev);
        break;
      case 'repeat':
        setIsRepeat(prev => !prev);
        break;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play().catch((error) => {
        console.log('Playback failed - audio file may not exist:', error);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const playPrevious = () => {
    if (currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    }
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audioRef.current.currentTime = percentage * duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Auto-play when track changes
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch((error) => {
        console.log('Auto-play failed:', error);
        setIsPlaying(false);
      });
    }
  }, [currentTrackIndex]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-purple-900 overflow-auto">
      <audio 
        ref={audioRef} 
        src={currentTrack.src}
        preload="metadata"
      />

      <div className="min-h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--crt-green)] mb-2 font-mono">
            🎵 RETRO MUSIC PLAYER 🎵
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Use ↑↓ arrows or remote to navigate • Enter/OK to select
          </p>
        </motion.div>

        {/* Music Player Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-2xl bg-black/50 backdrop-blur-sm border-4 border-[var(--crt-green)] rounded-lg p-6 sm:p-8 shadow-2xl shadow-[var(--crt-green)]/20"
        >
          {/* Album Art / Visualizer */}
          <div className="relative mb-6">
            <motion.div
              animate={{ 
                rotate: isPlaying ? 360 : 0,
                scale: isPlaying ? [1, 1.05, 1] : 1
              }}
              transition={{ 
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
              className="w-48 h-48 sm:w-64 sm:h-64 mx-auto bg-gradient-to-br from-purple-600 via-pink-500 to-[var(--crt-green)] rounded-full flex items-center justify-center text-6xl sm:text-8xl shadow-lg shadow-purple-500/50"
            >
              {currentTrack.cover}
            </motion.div>
            
            {/* Equalizer effect when playing */}
            {isPlaying && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ['20px', '40px', '20px'] }}
                    transition={{ 
                      duration: 0.5 + i * 0.1, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-2 bg-[var(--crt-green)] rounded-full"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Track Info */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--crt-green)] mb-2">
              {currentTrack.title}
            </h2>
            <p className="text-lg sm:text-xl text-purple-400">
              {currentTrack.artist}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Track {currentTrackIndex + 1} of {playlist.length}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div 
              className="relative h-2 bg-gray-700 rounded-full cursor-pointer overflow-hidden group"
              onClick={handleSeek}
            >
              <motion.div
                className="absolute h-full bg-gradient-to-r from-[var(--crt-green)] to-purple-500 shadow-lg shadow-[var(--crt-green)]/50"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              />
              <div className="absolute inset-0 bg-[var(--crt-green)]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-gray-400 mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
            {/* Previous */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={playPrevious}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all ${
                focusedButton === 1 
                  ? 'bg-[var(--crt-green)] text-black ring-4 ring-purple-500' 
                  : 'bg-gray-700 text-[var(--crt-green)] hover:bg-gray-600'
              }`}
            >
              <FontAwesomeIcon icon={faBackward} className="text-xl" />
            </motion.button>

            {/* Play/Pause */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all ${
                focusedButton === 0 
                  ? 'bg-[var(--crt-green)] text-black ring-4 ring-purple-500 shadow-lg shadow-[var(--crt-green)]' 
                  : 'bg-[var(--crt-green)] text-black hover:bg-green-400 shadow-lg shadow-[var(--crt-green)]/50'
              }`}
            >
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="text-2xl sm:text-3xl" />
            </motion.button>

            {/* Next */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={playNext}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all ${
                focusedButton === 2 
                  ? 'bg-[var(--crt-green)] text-black ring-4 ring-purple-500' 
                  : 'bg-gray-700 text-[var(--crt-green)] hover:bg-gray-600'
              }`}
            >
              <FontAwesomeIcon icon={faForward} className="text-xl" />
            </motion.button>
          </div>

          {/* Secondary Controls */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
            {/* Shuffle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsShuffle(!isShuffle)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                focusedButton === 4 
                  ? 'ring-4 ring-purple-500' 
                  : ''
              } ${
                isShuffle 
                  ? 'bg-[var(--crt-green)] text-black' 
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              <FontAwesomeIcon icon={faRandom} />
            </motion.button>

            {/* Volume */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              focusedButton === 3 
                ? 'bg-gray-600 ring-4 ring-purple-500' 
                : 'bg-gray-700'
            }`}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="text-[var(--crt-green)]"
              >
                <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
              </motion.button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 sm:w-24 accent-[var(--crt-green)]"
              />
            </div>

            {/* Repeat */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsRepeat(!isRepeat)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                focusedButton === 5 
                  ? 'ring-4 ring-purple-500' 
                  : ''
              } ${
                isRepeat 
                  ? 'bg-[var(--crt-green)] text-black' 
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              <FontAwesomeIcon icon={faRedoAlt} />
            </motion.button>
          </div>

          {/* Playlist */}
          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-bold text-[var(--crt-green)] mb-3">Playlist</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {playlist.map((track, index) => (
                <motion.button
                  key={track.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setCurrentTrackIndex(index);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left px-4 py-2 rounded transition-all ${
                    index === currentTrackIndex
                      ? 'bg-[var(--crt-green)]/20 border-l-4 border-[var(--crt-green)] text-[var(--crt-green)]'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{track.cover}</span>
                    <div>
                      <p className="font-semibold text-sm">{track.title}</p>
                      <p className="text-xs opacity-70">{track.artist}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6 text-xs sm:text-sm text-gray-500 space-y-1"
        >
          
          <p>🎮 Keyboard: ↑/↓ Navigate • Enter Play/Pause • ←/→ Change Channel</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Channel6;
