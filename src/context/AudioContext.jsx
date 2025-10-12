import React, { createContext, useContext, useRef, useCallback, useEffect } from 'react';
import { Howl } from 'howler';

const AudioContext = createContext(undefined);

export const AudioProvider = ({ children }) => {
  const soundsRef = useRef(new Map());
  const globalVolumeRef = useRef(0.5);
  const isMutedRef = useRef(false);

  // Initialize sounds
  useEffect(() => {
    const sounds = {
      'tv-static': new Howl({ src: ['/audio/tv-static.mp3'], loop: false }),
      'tv-click': new Howl({ src: ['/audio/tv-click.mp3'], loop: false }),
      'channel-flip': new Howl({ src: ['/audio/channel-flip.mp3'], loop: false }),
      'power-on': new Howl({ src: ['/audio/power-on.mp3'], loop: false }),
      'power-off': new Howl({ src: ['/audio/power-off.mp3'], loop: false }),
      'ambient-hum': new Howl({ src: ['/audio/ambient-hum.mp3'], loop: true, volume: 0.2 }),
    };

    Object.entries(sounds).forEach(([name, howl]) => {
      soundsRef.current.set(name, howl);
    });

    return () => {
      soundsRef.current.forEach(sound => sound.unload());
    };
  }, []);

  const playSound = useCallback((soundName, options) => {
    const sound = soundsRef.current.get(soundName);
    if (sound && !isMutedRef.current) {
      const volume = options?.volume ?? globalVolumeRef.current;
      sound.volume(volume);
      if (options?.loop !== undefined) {
        sound.loop(options.loop);
      }
      sound.play();
    }
  }, []);

  const stopSound = useCallback((soundName) => {
    const sound = soundsRef.current.get(soundName);
    if (sound) {
      sound.stop();
    }
  }, []);

  const setGlobalVolume = useCallback((volume) => {
    globalVolumeRef.current = Math.max(0, Math.min(1, volume));
    soundsRef.current.forEach(sound => {
      sound.volume(globalVolumeRef.current);
    });
  }, []);

  const setMuted = useCallback((muted) => {
    isMutedRef.current = muted;
    soundsRef.current.forEach(sound => {
      sound.mute(muted);
    });
  }, []);

  return (
    <AudioContext.Provider value={{ playSound, stopSound, setGlobalVolume, setMuted }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
};
