import React, { createContext, useContext, useState, useCallback } from 'react';

const TVContext = createContext(undefined);

export const TVProvider = ({ children }) => {
  const [state, setState] = useState({
    isPoweredOn: false,
    currentChannel: 99, // Start at home screen (channel 99)
    targetChannel: 99, // Channel we're switching to
    isTransitioning: false,
    volume: 0.5,
    isMuted: false,
    lastInteraction: Date.now(),
    screenMode: 'color',
    isFirstBoot: true,
    crtEffectsEnabled: true, // New: CRT effects toggle
    showPowerAnimation: false, // Track if power animation should show
  });

  const switchChannel = useCallback((channelNumber) => {
    if (state.isTransitioning) return;

    setState(prev => ({
      ...prev,
      targetChannel: channelNumber, // Store target channel immediately
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
    setState(prev => {
      const willPowerOn = !prev.isPoweredOn;
      return {
        ...prev,
        isPoweredOn: willPowerOn,
        showPowerAnimation: willPowerOn, // Show animation when powering on
        currentChannel: willPowerOn ? 99 : prev.currentChannel, // Go to home screen when powering on
        lastInteraction: Date.now(),
        isFirstBoot: false, // After first power-on, no longer first boot
      };
    });

    // Hide power animation after it completes
    if (!state.isPoweredOn) {
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          showPowerAnimation: false,
        }));
      }, 2000); // Match PowerAnimation duration
    }
  }, [state.isPoweredOn]);

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

  const toggleCRTEffects = useCallback(() => {
    setState(prev => ({
      ...prev,
      crtEffectsEnabled: !prev.crtEffectsEnabled,
      lastInteraction: Date.now(),
    }));
  }, []);

  const navigateInteractive = useCallback((action) => {
    // Dispatch navigation event for interactive elements (buttons, links, etc.)
    window.dispatchEvent(new CustomEvent('remoteNavigation', { detail: action }));
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
        toggleCRTEffects,
        navigateInteractive,
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

