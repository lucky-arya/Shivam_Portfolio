import React, { createContext, useContext, useState, useCallback } from 'react';

const TVContext = createContext(undefined);

export const TVProvider = ({ children }) => {
  const [state, setState] = useState({
    isPoweredOn: false,
    currentChannel: 1,
    isTransitioning: false,
    volume: 0.5,
    isMuted: false,
    lastInteraction: Date.now(),
    screenMode: 'color',
    isFirstBoot: true,
  });

  const switchChannel = useCallback((channelNumber) => {
    if (state.isTransitioning) return;

    setState(prev => ({
      ...prev,
      isTransitioning: true,
      lastInteraction: Date.now(),
    }));

    // Simulate transition time
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        currentChannel: channelNumber,
        isTransitioning: false,
      }));
    }, 1200); // Match animation duration
  }, [state.isTransitioning]);

  const togglePower = useCallback(() => {
    setState(prev => ({
      ...prev,
      isPoweredOn: !prev.isPoweredOn,
      lastInteraction: Date.now(),
      isFirstBoot: false, // After first power-on, no longer first boot
    }));
  }, []);

  const setVolume = useCallback((volume) => {
    setState(prev => ({
      ...prev,
      volume: Math.max(0, Math.min(1, volume)),
      lastInteraction: Date.now(),
    }));
  }, []);

  const toggleMute = useCallback(() => {
    setState(prev => ({
      ...prev,
      isMuted: !prev.isMuted,
      lastInteraction: Date.now(),
    }));
  }, []);

  const updateLastInteraction = useCallback(() => {
    setState(prev => ({
      ...prev,
      lastInteraction: Date.now(),
    }));
  }, []);

  const toggleScreenMode = useCallback(() => {
    setState(prev => ({
      ...prev,
      screenMode: prev.screenMode === 'color' ? 'blackAndWhite' : 'color',
      lastInteraction: Date.now(),
    }));
  }, []);

  const sendDirectionalInput = useCallback((direction) => {
    // Dispatch custom event for games to listen to
    window.dispatchEvent(new CustomEvent('remoteDirectionalInput', { detail: direction }));
    setState(prev => ({
      ...prev,
      lastInteraction: Date.now(),
    }));
  }, []);

  return (
    <TVContext.Provider
      value={{
        state,
        switchChannel,
        togglePower,
        setVolume,
        toggleMute,
        updateLastInteraction,
        toggleScreenMode,
        sendDirectionalInput,
      }}
    >
      {children}
    </TVContext.Provider>
  );
};

export const useTVContext = () => {
  const context = useContext(TVContext);
  if (!context) {
    throw new Error('useTVContext must be used within a TVProvider');
  }
  return context;
};

