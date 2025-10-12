import { useEffect } from 'react';
import { useTVContext } from '../context/TVContext';
import { useChannelSwitcher } from './useChannelSwitcher';

export const useKeyboardControls = () => {
  const { togglePower, toggleMute, state } = useTVContext();
  const { handleChannelSwitch, goToChannel } = useChannelSwitcher();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Prevent default for arrow keys to avoid scrolling
      if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
      }

      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          handleChannelSwitch('up');
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          handleChannelSwitch('down');
          break;
        case ' ':
          e.preventDefault();
          togglePower();
          break;
        case 'Escape':
          toggleMute();
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          if (state.isPoweredOn) {
            goToChannel(parseInt(e.key));
          }
          break;
        case '0':
          // Secret channel 0 - mini game
          if (state.isPoweredOn) {
            goToChannel(0);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleChannelSwitch, togglePower, toggleMute, goToChannel, state.isPoweredOn]);
};
