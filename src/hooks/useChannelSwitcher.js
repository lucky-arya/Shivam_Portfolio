import { useCallback } from 'react';
import { useTVContext } from '../context/TVContext';
import { useAudioContext } from '../context/AudioContext';

export const useChannelSwitcher = () => {
  const { state, switchChannel } = useTVContext();
  const { playSound } = useAudioContext();

  const handleChannelSwitch = useCallback((direction) => {
    if (state.isTransitioning || !state.isPoweredOn) return;

    playSound('channel-flip');

    const totalChannels = 5;
    let newChannel = state.currentChannel;

    if (direction === 'up') {
      newChannel = (state.currentChannel % totalChannels) + 1;
    } else {
      newChannel = state.currentChannel - 1 || totalChannels;
    }

    // Easter egg: 5% chance to hit Channel 404
    if (Math.random() < 0.05 && newChannel !== 404) {
      newChannel = 404;
    }

    switchChannel(newChannel);
  }, [state.currentChannel, state.isTransitioning, state.isPoweredOn, playSound, switchChannel]);

  const goToChannel = useCallback((channelNumber) => {
    if (state.isTransitioning || !state.isPoweredOn) return;
    
    playSound('tv-click');
    switchChannel(channelNumber);
  }, [state.isTransitioning, state.isPoweredOn, playSound, switchChannel]);

  return { handleChannelSwitch, goToChannel };
};
